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
// import {useTailwind, tailwind} from 'tailwind-rn';
import {style as tw} from 'tailwind-react-native-classnames';

const MainScreen = props => {
  // const tailwind = useTailwind(); 안됨
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
  const [user1_id, setuser1_id] = useState();
  const [user2_id, setuser2_id] = useState();

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
      // setLoading(false);
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
      // setLoading(false);
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
        <View style={styles.modalsmall}>
          {/* <Text>{modaltext}</Text> */}
          <Pressable
            style={[styles.button, styles.buttonOpenTop]}
            onPress={() =>
              props.navigation.navigate('MatchScreen', {
                param_hour: modalhour,
                param_day: modalday,
                param_status: modalstatus,
              })
            }>
            <Text style={styles.textStyle}>매칭 신청</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => insert_class()}>
            <Text style={styles.textStyle}>수업 등록</Text>
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
        <View style={styles.modalsmall}>
          <Text style={[styles.textStyleblack, styles.textTop]}>
            {modaltext}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => after_match('match_cancel_nomatch')}>
            <Text style={styles.textStyle}>매칭 취소</Text>
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
        <View style={styles.modalsmall}>
          <Text style={[styles.textStyleblack, styles.textTop]}>
            {modaltext}
          </Text>
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
        <View style={styles.modalsmall}>
          <Text style={[styles.textStyleblack, styles.textTop]}>
            {modaltext}
          </Text>
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
        <View style={styles.modalmedium}>
          <Text style={[styles.textStyleblack, styles.textTop]}>
            {user2_id}님과
          </Text>
          <Text style={[styles.textStyleblack]}>{modaltext}하였습니다!</Text>
          {/* <Text>{user1_id}</Text> */}
          {/* <Text>{user2_id}</Text> */}
          <Text style={[styles.textStyleblack, styles.mt7, styles.mb]}>
            상대방과 채팅 하실래요?
          </Text>
          <Pressable
            style={[styles.buttonOpen, styles.button]}
            onPress={() =>
              props.navigation.navigate('ChatScreen', {
                param_hour: modalhour,
                param_day: modalday,
                user1_id: user1_id,
                user2_id: user2_id,
                token: token,
              })
            }>
            <Text style={styles.textStyle}>채팅 시작</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClosemt]}
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
      <View style={styles.modalbig}>
        <Text style={styles.textTopbuttom}>{classname}</Text>
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
        <View style={styles.rowend}>
          <Pressable
            style={[styles.button, styles.buttonClosemrsmall]}
            onPress={() => insert_class_db()}>
            <Text style={styles.textStyle}>등록</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClosemrsmall]}
            onPress={() => setModalclassVisible(!modalclassVisible)}>
            <Text style={styles.textStyle}>취소</Text>
          </Pressable>
        </View>
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
      // setLoading(false);
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
      // setLoading(false);
    }
  };

  //=======================매칭 기능 끝========================

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>My Schedule</Text>
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
                  title={
                    data.Mon.class == 'comp'
                      ? '완료'
                      : data.Mon.class == 'Wait'
                      ? '대기'
                      : data.Mon.class
                  }
                  color={
                    data.Mon.class == ''
                      ? '#052F66'
                      : data.Mon.class == 'comp'
                      ? '#B31A09'
                      : data.Mon.class == 'Wait'
                      ? '#ffb224'
                      : 'black'
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Tue.status, 'Tue')}
                  title={
                    data.Tue.class == 'comp'
                      ? '완료'
                      : data.Tue.class == 'Wait'
                      ? '대기'
                      : data.Tue.class
                  }
                  color={
                    data.Tue.class == ''
                      ? '#052F66'
                      : data.Tue.class == 'comp'
                      ? '#B31A09'
                      : data.Tue.class == 'Wait'
                      ? '#ffb224'
                      : 'black'
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Wed.status, 'Wed')}
                  title={
                    data.Wed.class == 'comp'
                      ? '완료'
                      : data.Wed.class == 'Wait'
                      ? '대기'
                      : data.Wed.class
                  }
                  color={
                    data.Wed.class == ''
                      ? '#052F66'
                      : data.Wed.class == 'comp'
                      ? '#B31A09'
                      : data.Wed.class == 'Wait'
                      ? '#ffb224'
                      : 'black'
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Thu.status, 'Thu')}
                  title={
                    data.Thu.class == 'comp'
                      ? '완료'
                      : data.Thu.class == 'Wait'
                      ? '대기'
                      : data.Thu.class
                  }
                  color={
                    data.Thu.class == ''
                      ? '#052F66'
                      : data.Thu.class == 'comp'
                      ? '#B31A09'
                      : data.Thu.class == 'Wait'
                      ? '#ffb224'
                      : 'black'
                  }
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Button
                  onPress={() => setModal(data.hour, data.Fri.status, 'Fri')}
                  title={
                    data.Fri.class == 'comp'
                      ? '완료'
                      : data.Fri.class == 'Wait'
                      ? '대기'
                      : data.Fri.class
                  }
                  color={
                    data.Fri.class == ''
                      ? '#052F66'
                      : data.Fri.class == 'comp'
                      ? '#B31A09'
                      : data.Fri.class == 'Wait'
                      ? '#ffb224'
                      : 'black'
                  }
                />
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <View style={[styles.ml, styles.mt15, styles.alignend]}>
        {token == '' ? (
          <Button
            onPress={() => props.navigation.navigate('LoginScreen')}
            title="로그인"
            color="black"
          />
        ) : (
          <Button onPress={() => [logout()]} title="로그아웃" color="black" />
        )}
      </View>
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
    backgroundColor: '#97C9F7',
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

  // button
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  longbutton: {
    borderRadius: 20,
    padding: 40,
    elevation: 0,
    width: 500,
  },
  buttonOpenTop: {
    backgroundColor: 'black',
    marginTop: 20,
    width: 100,
  },
  textTop: {
    marginTop: 20,
    width: 100,
  },
  textTop: {
    marginTop: 20,
    marginBottom: 20,
    width: 100,
  },
  textTopbuttom: {
    marginTop: 5,
    marginBottom: 5,
  },

  buttonOpen: {
    backgroundColor: 'black',
    marginTop: 10,
    width: 100,
  },
  buttonClose: {
    backgroundColor: 'black',
    marginTop: 30,
    marginRight: 15,
    alignSelf: 'flex-end',
    width: 50,
  },
  buttonClosemrsmall: {
    backgroundColor: 'black',
    marginTop: 20,
    marginRight: 5,
    alignSelf: 'flex-end',
    width: 50,
  },
  buttonClosemt: {
    backgroundColor: 'black',
    marginTop: 5,
    marginRight: 15,
    alignSelf: 'flex-end',
    width: 50,
  },
  buttonCloselong: {
    backgroundColor: 'black',
    marginTop: 30,
    marginRight: 15,
    alignSelf: 'flex-end',
    width: 80,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  classinput: {
    width: 200,
    height: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  // 추가
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    marginBottom: 10,
  },

  rowend: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 100,
  },
  mr: {
    marginRight: 5,
  },
  alignend: {
    alignSelf: 'flex-end',
    marginRight: 35,
  },
  ml: {
    marginLeft: 5,
  },
  mt5: {
    marginTop: 5,
  },
  mt7: {
    marginTop: 7,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mb: {
    marginBottom: 5,
  },

  modal: {
    backgroundColor: 'white',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    width: 250,
    alignItems: 'center',
    height: 10,
    borderWidth: 3,
  },

  modalsmall: {
    backgroundColor: 'white',
    marginTop: 65,
    marginBottom: 50,
    marginLeft: 10,
    width: 200,
    height: 200,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 3,
  },
  modalmedium: {
    backgroundColor: 'white',
    marginTop: 60,
    marginBottom: 50,
    marginLeft: 10,
    width: 230,
    height: 220,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 3,
  },
  modalbig: {
    backgroundColor: 'white',
    marginTop: 60,
    marginBottom: 50,
    marginLeft: 10,
    width: 250,
    height: 160,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 3,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
  textStyleblack: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontFamily: '',
    // fontWeight: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FAFFFC',
    fontStyle: 'italic',
  },

  weektitle: {
    fontSize: 2,
    textAlign: 'center',
  },
  smalltitle: {textAlign: 'center', fontsize: 20, color: 'black'},
});

export default MainScreen;
