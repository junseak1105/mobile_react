import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Modal, Pressable,Alert} from 'react-native';
import {DataTable, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = props => {
  //userid token
  const [token, settoken] = useState("");

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

  //localstorage userid getdata
  AsyncStorage.getItem('token', (err,result)=>{
    settoken(result);
  });

  //팝업창 open 기능
  const setModal = (hour, status, day) => {
    setmodalhour(hour);
    setmodalstatus(status);
    setmodalday(day);
    if (status == 0) setmodaltext('매칭 신청 or 수업 입력');
    if (status == 1) setmodaltext('매칭 상태 확인');
    setModalVisible(!modalVisible);
  };

  const Modal_view = props => {
    if (modalstatus == 0) {
      return (
        <View style={{backgroundColor: 'grey'}}>
          {/* <Text>{modaltext}</Text> */}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
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
            <Text style={styles.textStyle}>취소</Text>
          </Pressable>
        </View>
      );
    } else if (modalstatus == 1) {
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

  const Modal_view_class = props => {
    return(
      <View>
        <Text>수업명</Text>
        <TextInput
        style={styles.classinput}
        placeholder="수업명 입력"
        autoCapitalize="none"
        placeholderTextColor="black"
        onChangeText={val => setclassname(val)}
        />
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
    )
  }
  //수업입력창 열기
  const insert_class = () => {
    setModalVisible(!modalVisible);
    setModalclassVisible(!modalclassVisible);
  };
  //수업 입력
  const insert_class_db = async () =>{
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/insert_class.php?userID='+
        token+
        '&selected_hour='+
        modalhour+
        '&selected_day='+
        modalday+
        '&classname='+
        classname,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      alert('http://jhk.n-e.kr:80/insert_class.php?userID='+
      token+
      '&selected_hour='+
      modalhour+
      '&selected_day='+
      modalday+
      '&classname='+
      classname);
      setModalclassVisible(!modalclassVisible);
      gettimetable();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const to_match = ({navigation}) => {
    navigation.navigate('MatchScreen', {
      param_hour: modalhour,
      param_day: modalday,
      param_status: modalstatus,
    });
  };

  //db접속
  const gettimetable = async () => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/get_timetable.php',
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

  useEffect(() => {
    gettimetable(); //받아오는 함수 실행
  }, []);

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
                  onPress={() =>
                    setModal(data.hour, data.Mon.status, 'Mon')
                  }
                  title={data.Mon.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() =>
                    setModal(data.hour, data.Tue.status, 'Tue')
                  }
                  title={data.Tue.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() =>
                    setModal(data.hour, data.Thu.status, 'Wed')
                  }
                  title={data.Wed.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() =>
                    setModal(data.hour, data.Fri.status, 'Thu')
                  }
                  title={data.Thu.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() =>
                    setModal(data.hour, data.Mon.status, 'Fri')
                  }
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
  classinput:{
    width: 200,
    height: 200,
  },
  //modal css end
});

export default MainScreen;
