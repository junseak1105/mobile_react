import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Modal,Pressable} from 'react-native';
import {DataTable} from 'react-native-paper';

//import AsyncStorage from '@react-native-community/async-storage';

const MainScreen = props => {
  // 유저 닉네임 불러오기
  // AsyncStorage.getItem('token', (err, result) => {
  //   alert(result); // User1 출력
  // });

  //timetable 저장 state
  const [Timetable, SetTimetable] = useState([]);

  //팝업창
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltext,setmodaltext] = useState();
  const [modalhour,setmodalhour] = useState();
  const [modalstatus,setmodalstatus] = useState();
  const [modalday,setmodalday] = useState();

  //팝업창 open 기능
  const setModal = (hour,status,day) =>{
    setmodalhour(hour);
    setmodalstatus(status);
    setmodalday(day);
    if(status==0) setmodaltext('매칭 신청 or 수업 입력');
    if(status==1) setmodaltext('매칭 상태 확인');
    setModalVisible(!modalVisible);
  }

  const Modal_view = props => {
    if(modalstatus==0){
      return (
        <View style={{backgroundColor:"grey"}}>
        <Text>{modaltext}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
        <Text>매칭 신청</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => to_match()}
        >
        <Text>수업 입력</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
        <Text style={styles.textStyle}>취소</Text>
        </Pressable>
        </View>
      );
    }else if(modalstatus==1){
      return (
        <View style={{backgroundColor:"grey"}}>
        <Text>{modaltext}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>취소</Text>
        </Pressable>
        </View>
      );
    }
  };

  const to_match = ({navigation}) =>{
    navigation.navigate('MatchScreen',{param_hour:modalhour,param_day:modalday,param_status:modalstatus})
  }

  //db접속
  const gettimetable = async () => {
    try {
      const response_table = await fetch('http://jhk.n-e.kr:80/get_timetable.php'); //1 CURL로 연결(php)
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
                  onPress={() => setModal(data.Mon.hour,data.Mon.status,'Mon')}
                  title={data.Mon.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.Mon.hour,data.Mon.status,'Tue')}
                  title={data.Tue.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.Mon.hour,data.Mon.status,'Wed')}
                  title={data.Wed.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.Mon.hour,data.Mon.status,'Thu')}
                  title={data.Thu.class}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.Mon.hour,data.Mon.status,'Fri')}
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
            <Modal_view
            
            />
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  //modal css end
});

export default MainScreen;
