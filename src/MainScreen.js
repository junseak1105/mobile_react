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
  //새로고침 함수
  const isFocused = useIsFocused();
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

  //매칭된 두 아이디 식별용
  const [user1_id,setuser1_id] =useState();
  const [user2_id,setuser2_id] =useState();
  
  //팝업창 수업 넣기
  const [modalclassVisible, setModalclassVisible] = useState(false);
  const [classname, setclassname] = useState();
  //수업 등록 여부 저장
  const [class_result, setclassresult] = useState([]);

  //페이지 로딩 함수
  useEffect(() => {
    //localstorage userid getdata
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
      gettimetable(result); 
    });//받아오는 함수 실행
  }, [isFocused]);

  //타임테이블 가져오기
  const gettimetable = async (userid) => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/get_timetable.php?userid=' + userid,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      SetTimetable(json_table.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //로그아웃 기능: 로그아웃 시 타임테이블 재생성
  const logout = () => {
    AsyncStorage.setItem('token', '', () => {
      console.log('로그아웃');
    });
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
    });
    gettimetable();
  };

  //기본 팝업창 open 기능
  const setModal = (hour, status, day) => {
    setmodalhour(hour);
    setmodalstatus(status);
    setmodalday(day);
    if (status == 0) setmodaltext('매칭 신청 or 수업 입력');
    if (status == 1) setmodaltext('매칭 대기 중');
    if (status == 2) setmodaltext('매칭 수락 대기중');
    if (status == 3) setmodaltext('매칭 신청 도착');
    if (status == 4) setmodaltext('매칭 성공');
    setModalVisible(!modalVisible);
  };
  //====================수업  기능 시작=================
  //수업입력창 open(수업입력 선택 시)
  const insert_class = () => {
    setModalVisible(!modalVisible);
    setModalclassVisible(!modalclassVisible);
  };
  //수업 입력 기능
  const insert_class_db = async () => {
    try {
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
  //====================수업  기능 끝=========================

  //=====================컴포넌트 모음 시작======================

  /*
  modalstatus에 따라 분기
  0: 빈칸
  1: 매칭대기(대상없음)
  2: 매칭 신청자 신청 보냄 상태
  3: 매칭 피신청자 신청 받음 상태
  4: 매칭완료(상호표기)
  */
  const Modal_view = () => {
    if (modalstatus == 0) {
      //빈칸 상태
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
      //매칭 대기
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => after_match('match_cancel_nomatch')}>
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
      //매칭 수락 대기중(신청자)
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => after_match('match_cancel')}>
            <Text style={styles.textStyle}>매칭 취소</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>닫기</Text>
          </Pressable>
        </View>
      );
    } else if (modalstatus == 3) {
      //매칭 수락 대기 중(피신청자)
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => after_match('match_accept')}>
            <Text style={styles.textStyle}>수락</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => after_match('match_refuse')}>
            <Text style={styles.textStyle}>거절</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>닫기</Text>
          </Pressable>
        </View>
      );
    } else if (modalstatus == 4) {
      get_matchID();
      //매칭 성공 상태(서로 상대방 표시)
      return (
        <View style={{backgroundColor: 'grey'}}>
          <Text>{modaltext}</Text>
          <Text>{user1_id}</Text>
          <Text>{user2_id}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() =>
              props.navigation.navigate('ChatScreen', {
                param_hour: modalhour,
                param_day: modalday,
                user1_id: user1_id,
                user2_id: user2_id,
                token : token,
              })
            }>
            <Text>채팅하기</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>닫기</Text>
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
  //=======================컴포넌트 모음 끝======================

  //=======================매칭 기능 시작========================

  //매칭 취소(매칭전)
  const after_match = async param => {
    setModalVisible(false);
    setModalclassVisible(false);
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/after_match.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday +
          '&match_param=' +
          param,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      gettimetable();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //매칭 대상자 가져오기
  const get_matchID = async () => {
    
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/get_matchID.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setuser1_id(json_match.results[0].user1_id);
      setuser2_id(json_match.results[0].user2_id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //=======================매칭 기능 끝========================

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
            //Alert.alert('Modal has been closed.');
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
            //Alert.alert('Modal has been closed.');
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
