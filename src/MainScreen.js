import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {DataTable, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const MainScreen = props => {
  //userid token
  const [token, settoken] = useState('');
  //timetable 저장 state
  const [Timetable, SetTimetable] = useState([]);

  //팝업창 기본
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltext, setmodaltext] = useState();
  const [modalhour, setmodalhour] = useState();
  const [modalstatus, setmodalstatus] = useState();
  const [modalday, setmodalday] = useState();

  //팝업창 수업 넣기
  const [modalclassVisible, setModalclassVisible] = useState(false);
  const [classname, setclassname] = useState();
  //수업 등록 여부 저장
  const [class_result, setclassresult] = useState([]);

  //팝업창 open 기능
  const setModal = (hour, status, day) => {
    setmodalhour(hour);
    setmodalstatus(status);
    setmodalday(day);
    if (status == 0) setmodaltext('매칭 신청 or 수업 입력');
    if (status == 1) setmodaltext('매칭 대기 중');
    if (status == 2) setmodaltext('매칭 수락, 신청대기');
    if (status == 3) setmodaltext('매칭 성공');
    setModalVisible(!modalVisible);
  };

  const Modal_view = () => {
    if (modalstatus == 0) {
      //기본 상태
      return (
        <View style={{backgroundColor: 'grey'}}>
          {/* <Text>{modaltext}</Text> */}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() =>
              props.navigation.navigate('MatchScreen', {
                param_hour: modalhour,
                param_day: modalday,
                param_status: modalstatus,
              })
            }>
            <Text>매칭 신청</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => insert_class()}>
            <Text>수업 입력</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>닫기</Text>
          </Pressable>
        </View>
      );
    } else if (modalstatus == 1) {
      //매칭 대기 상태
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => cancel_findmatch()}>
            <Text>매칭 취소</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>닫기</Text>
          </Pressable>
        </View>
      );
    } else if (modalstatus == 2) {
      //매칭 수락,신청 대기상태
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => cancel_match()}>
            <Text style={styles.textStyle}>거절</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>닫기</Text>
          </Pressable>
        </View>
      );
    } else if (modalstatus == 2) {
      //매칭 성공 상태(서로 상대방 표시)
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>취소</Text>
          </Pressable>
        </View>
      );
    }
  };
  //수업 입력 창
  const Modal_view_class = props => {
    return (
      <View>
        <Text>{classname}</Text>
        <SafeAreaView>
          <TextInput
            style={styles.classinput}
            placeholder={'수업명 입력'}
            defaultValue={classname}
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={val => setclassname(val)}
          />
        </SafeAreaView>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => insert_class_db()}>
          <Text style={styles.textStyle}>수업입력</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalclassVisible(!modalclassVisible)}>
          <Text style={styles.textStyle}>취소</Text>
        </Pressable>
      </View>
    );
  };
  //수업입력창 열기
  const insert_class = () => {
    setModalVisible(!modalVisible);
    setModalclassVisible(!modalclassVisible);
  };
  //수업 입력
  const insert_class_db = async () => {
    try {
      // alert('http://jhk.n-e.kr:80/insert_class.php?userID='+
      // token+
      // '&selected_hour='+
      // modalhour+
      // '&selected_day='+
      // modalday+
      // '&classname='+
      // classname);
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/insert_class.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday +
          '&classname=' +
          classname,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      setModalclassVisible(!modalclassVisible);
      gettimetable();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //매칭 취소(매칭전)
  const cancel_findmatch = async () => {
    try {
      // alert('http://jhk.n-e.kr:80/insert_class.php?userID='+
      // token+
      // '&selected_hour='+
      // modalhour+
      // '&selected_day='+
      // modalday+
      // '&classname='+
      // classname);
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/cancle_match.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      setModalclassVisible(!modalclassVisible);
      gettimetable();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //매칭 취소(매칭전)
  const cancel_match = async () => {
    try {
      // alert('http://jhk.n-e.kr:80/insert_class.php?userID='+
      // token+
      // '&selected_hour='+
      // modalhour+
      // '&selected_day='+
      // modalday+
      // '&classname='+
      // classname);
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/cancle_match.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      setModalclassVisible(!modalclassVisible);
      gettimetable();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //db접속
  const gettimetable = async () => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/get_timetable.php?userid=' + token,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      SetTimetable(json_table.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //db접속끝
  const logout = () => {
    AsyncStorage.setItem('token', '', () => {
      console.log('로그아웃');
    });
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
    });
    gettimetable();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    //localstorage userid getdata
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
      //alert(token);
    });
    gettimetable(); //받아오는 함수 실행
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title></DataTable.Title>
          <DataTable.Title>Mon</DataTable.Title>
          <DataTable.Title>Tue</DataTable.Title>
          <DataTable.Title>Wed</DataTable.Title>
          <DataTable.Title>Thu</DataTable.Title>
          <DataTable.Title>Fri</DataTable.Title>
        </DataTable.Header>
        {Timetable.map(data => {
          return (
            <DataTable.Row>
              <DataTable.Cell>{data.hour}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Mon.status, 'Mon')}
                  title={data.Mon.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Tue.status, 'Tue')}
                  title={data.Tue.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Wed.status, 'Wed')}
                  title={data.Wed.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Thu.status, 'Thu')}
                  title={data.Thu.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Fri.status, 'Fri')}
                  title={data.Fri.class}
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <Text>Screen 1</Text>
      <Button
        onPress={() => props.navigation.navigate('MatchScreen')}
        title="Go to match"
      />
      <Button
        onPress={() => props.navigation.navigate('LoginScreen')}
        title="Go to Login"
      />
      <Button onPress={() => logout()} title="Logout" />
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <Modal_view />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalclassVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalclassVisible(!modalclassVisible);
          }}>
          <View style={styles.centeredView}>
            <Modal_view_class />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //modal css start
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  classinput: {
    width: 200,
    height: 200,
  },
  //modal css end
});

export default MainScreen;
