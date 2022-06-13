import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {DataTable, TextInput, Card, List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import gender1 from './images/gender1.png';
import id from './images/id.png';
import id1 from './images/id1.png';
import university from './images/university.png';

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

  //매칭된 두 아이디 식별용, 매칭 리스트 뽑기
  const [user1_id, setuser1_id] = useState();
  const [user2_id, setuser2_id] = useState();
  const [match_select_list, setmatch_select_list] = useState();

  //팝업창 수업 넣기
  const [modalclassVisible, setModalclassVisible] = useState(false);
  const [classname, setclassname] = useState();

  //수업 등록 여부 저장
  const [class_result, setclassresult] = useState([]);
  //로그인 버튼 상태
  const [loginout, setloginout] = useState(false);

  //시간표 & 마이페이지
  const [mypageing, setMypageing] = useState(false);
  const timetable = () => setMypageing(false);
  const mypage = () => setMypageing(true);
  const mytitle = ['아이디', '비밀번호', '이름', '학년', '학교', '성별'];
  const [mydata, setMydata] = useState([]);
  let list = ['userID', 'userPW', 'userName', 'school_code', 'sex'];

  //페이지 로딩 함수
  useEffect(() => {
    //localstorage userid getdata
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
      result != null ? setloginout(true) : setloginout(false);
      gettimetable(result);
      getmypage(result);
      mypage(); // 빠른 이동 위함
      timetable(); // 빠른 이동 위함
      console.log(token);
    }); //받아오는 함수 실행
  }, [isFocused]);

  //타임테이블 가져오기
  const gettimetable = async userid => {
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

  // 마이페이지
  const getmypage = async userid => {
    try {
      const response_mydata = await fetch(
        'http://jhk.n-e.kr:80/mypage.php?userID=' + userid,
      ); //1 CURL로 연결(php)
      const json_mydata = await response_mydata.json(); //2 json 받아온거 저장
      setMydata(json_mydata.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const getobject = () => {
    for (var key in mydata) {
      console.log('key: ' + key + ' / ' + mydata[key]);
    }
  };

  //로그아웃 기능: 로그아웃 시 타임테이블 재생성
  const logout = () => {
    AsyncStorage.setItem('token', '', () => {
      console.log('로그아웃');
      setloginout(false);
    });
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
    });
    gettimetable('');
  };

  //기본 팝업창 open 기능
  const setModal = (hour, status, day) => {
    setmodalhour(hour);
    setmodalstatus(status);
    setmodalday(day);
    if (status == 0) setmodaltext('매칭 신청 or 수업 입력');
    if (status == 1) setmodaltext('매칭 대기 중');
    if (status == 2) setmodaltext('매칭 수락 대기중');
    if (status == 3) setmodaltext('매칭 신청이 도착');
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
  const insert_class_db = async text => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/insert_class.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday +
          '&classname=' +
          text,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      setModalclassVisible(!modalclassVisible);
      gettimetable(token);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };
  //수업 입력 기능
  const delete_class = async () => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/delete_class.php?userID=' +
          token +
          '&selected_hour=' +
          modalhour +
          '&selected_day=' +
          modalday,
      ); //1 CURL로 연결(php)
      const json_match = await response_table.json(); //2 json 받아온거 저장
      setclassresult(json_match.results); //3 const배열에다가 저장
      setModalVisible(!modalVisible);
      gettimetable(token);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  //====================수업  기능 끝=========================

  // 마이페이지 로그아웃 시 정보 없어지기
  const getmypagelogout = async userid => {
    try {
      const response_mydata = await fetch(
        'http://jhk.n-e.kr:80/mypage.php?userID=' + userid,
      ); //1 CURL로 연결(php)
      const json_mydata = await response_mydata.json(); //2 json 받아온거 저장
      setMydata(json_mydata.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

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
            onPress={() => [
              props.navigation.navigate('MatchScreen', {
                param_hour: modalhour,
                param_day: modalday,
                param_status: modalstatus,
              }),
              setModalVisible(!modalVisible),
            ]}>
            <Text style={styles.textStyle}>매칭 신청</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => insert_class()}>
            <Text style={styles.textStyle}>수업 등록</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => delete_class()}>
            <Text style={styles.textStyle}>수업 삭제</Text>
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
            style={[styles.button, styles.buttonOpen]}
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
      get_matchID();
      //매칭 수락 대기 중(피신청자)
      return (
        <View style={styles.modalms}>
          <Text style={[styles.textStyleblack]}>{modaltext}하였습니다!</Text>
          {/* <Text>{user1_id}</Text> */}
          {/* <Text>{user2_id}</Text> */}
          <Text style={[styles.textStyleblack, styles.mt7, styles.mb15]}>
            수락하시겠습니까?
          </Text>

          <View style={styles.minibox}>
            <View style={styles.boxtext}>
              <Text style={styles.boxtexttop}>매칭 상대 정보 {'\n'}</Text>
              <Text style={[styles.boxtext]}>
                매칭 상대는 {user1_id}입니다 {'\n'}
              </Text>
              <Text style={[styles.boxtext]}>상대의 체크 문항은</Text>
              <View
                style={{
                  flexWrap: 'wrap',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginLeft: 15,
                  marginRight: 15,
                }}>
                <Text style={styles.boxtext}>{match_select_list}</Text>
              </View>
              <Text style={[styles.boxtext]}>입니다</Text>
            </View>
          </View>

          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => after_match('match_accept')}>
            <Text style={styles.textStyle}>수락</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
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
            onPress={() => [
              props.navigation.navigate('ChatScreen', {
                param_hour: modalhour,
                param_day: modalday,
                user1_id: user1_id,
                user2_id: user2_id,
                token: token,
              }),
              setModalVisible(!modalVisible),
            ]}>
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
  const Modal_view_class = () => {
    const [temp, settemp] = useState('');
    return (
      <View style={styles.modalbig}>
        <Text style={styles.textTopbuttom}>{classname}</Text>
        <SafeAreaView>
          <TextInput
            style={styles.classinput}
            placeholder={'수업명 입력'}
            defaultValue={temp}
            autoCapitalize="none"
            placeholderTextColor="black"
            onChangeText={text => settemp(text)}
          />
        </SafeAreaView>
        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.buttonClosemrsmall]}
            onPress={() => insert_class_db(temp)}>
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
  //datacell title
  const Datacell_title = props => {
    return (
      <DataTable.Title
        style={{
          justifyContent: 'center',
          textAlign: 'center',
          ...styles.textStyleblack,
        }}>
        <Text styele={styles.textStyleblack}>{props.text}</Text>
      </DataTable.Title>
    );
  };
  //datacell 내용
  const Datacell_content = props => {
    return (
      <DataTable.Cell
        style={{
          flexDirection: 'row',
          backgroundColor:
            props.text_param == '공강'
              ? '#FAFFFC'
              : props.text_param == '완료'
              ? '#B31A09'
              : props.text_param == '매칭 대기'
              ? '#ffb224'
              : props.text_param == '수락 대기'
              ? '#09C542'
              : props.text_param == '매칭 확인'
              ? '#1F6E3A'
              : 'black',
          borderRadius: 2,
          margin: 2,
          width: '20%',
          flex: 1,
          flexWrap: 'wrap',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Pressable
          hitSlop={{top: 28, bottom: 28, left: 10, right: 10}}
          onPress={() => setModal(props.hour, props.status, props.day)}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              width: 60,
              fontSize: 12,
              color: props.text_param == '공강' ? 'black' : '#FAFFFC',
              // flexShrink: 1,
              // flexWrap: 'wrap',
              textAlign: 'center',
            }}>
            {/* (numberOfLines=={1}) ?(' */}
            {props.text_param}
            {/* '):() */}
          </Text>
        </Pressable>
      </DataTable.Cell>
    );
  };

  // 마이페이지
  const Datacell_mypage = props => {
    return (
      <>
        <DataTable.Cell
          style={{
            margin: 2,
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.mypagetext}>{props.content2}</Text>
        </DataTable.Cell>
      </>
    );
  };

  //로그인,아웃
  const Loginout = () => {
    if (!loginout) {
      return (
        <Button
          onPress={() => props.navigation.navigate('LoginScreen')}
          title="로그인"
          color="black"
        />
      );
    } else {
      return (
        <Button onPress={() => [logout()]} title="로그아웃" color="black" />
      );
    }
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
      gettimetable(token);
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
      setmatch_select_list(json_match.results[0].select_favor);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  //=======================매칭 기능 끝========================

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20} onPress={timetable}>
          <Text
            style={{
              ...styles.title,
              color: mypageing ? '#E6F5FF' : '#FAFFFC',
              opacity: mypageing ? 2 : 100,
            }}>
            My Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={20} onPress={mypage}>
          <Text
            style={{
              ...styles.title,
              color: mypageing ? '#FAFFFC' : '#E6F5FF',
              opacity: mypageing ? 100 : 2,
            }}>
            My Page
          </Text>
        </TouchableOpacity>
      </View>

      {!mypageing ? (
        <>
          {loginout ? (
            <>
              <DataTable style={[{width: '100%', height: '80%'}]}>
                {/* 76 */}
                <DataTable.Header style={[{height: 45}]}>
                  <View style={[{width: '5%'}]}>
                    <Datacell_title text="" />
                  </View>
                  <View style={[{width: '19%'}]}>
                    <Datacell_title text="Mon" />
                  </View>
                  <View style={[{width: '19%'}]}>
                    <Datacell_title text="Tue" />
                  </View>
                  <View style={[{width: '19%'}]}>
                    <Datacell_title text="Wed" />
                  </View>
                  <View style={[{width: '19%'}]}>
                    <Datacell_title text="Thu" />
                  </View>
                  <View style={[{width: '19%'}]}>
                    <Datacell_title text="Fri" />
                  </View>
                </DataTable.Header>
                {Timetable.map(data => {
                  return (
                    <DataTable.Row
                      key={data.key}
                      style={{height: '12%', flexDirection: 'row'}}>
                      <View style={{width: '5%'}}>
                        <DataTable.Cell
                          style={{
                            alignContent: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}>
                          {data.hour}
                        </DataTable.Cell>
                      </View>
                      <Datacell_content
                        hour={data.hour}
                        status={data.Mon.status}
                        day="Mon"
                        text_param={data.Mon.class}
                      />
                      <Datacell_content
                        hour={data.hour}
                        status={data.Tue.status}
                        day="Tue"
                        text_param={data.Tue.class}
                      />
                      <Datacell_content
                        hour={data.hour}
                        status={data.Wed.status}
                        day="Wed"
                        text_param={data.Wed.class}
                      />
                      <Datacell_content
                        hour={data.hour}
                        status={data.Thu.status}
                        day="Thu"
                        text_param={data.Thu.class}
                      />
                      <Datacell_content
                        hour={data.hour}
                        status={data.Fri.status}
                        day="Fri"
                        text_param={data.Fri.class}
                      />
                    </DataTable.Row>
                  );
                })}
              </DataTable>
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
            </>
          ) : (
            <View style={{...styles.centeredViewmypageno}}></View>
          )}
        </>
      ) : (
        <>
          {loginout ? (
            <View style={{...styles.centeredViewmypage}}>
              <DataTable
                headerLabelStyle={{color: 'white'}}
                style={{...styles.mypageoutline}}>
                {/* 76 */}
                {mydata.map(data => {
                  return (
                    <>
                      <View style={{alignContent: 'center'}}>
                        <DataTable.Row key={data.key} style={styles.mypagerow}>
                          <Image style={{...styles.selectedimg}} source={id} />
                          <Datacell_mypage
                            content2={data.userID}></Datacell_mypage>
                        </DataTable.Row>
                      </View>

                      <DataTable.Row key={data.key} style={styles.mypagerow}>
                        <Image style={{...styles.selectedimg}} source={id1} />
                        <Datacell_mypage
                          content1="이름"
                          content2={data.userName}></Datacell_mypage>
                      </DataTable.Row>

                      <DataTable.Row key={data.key} style={styles.mypagerow}>
                        <Image
                          style={{...styles.selectedimg}}
                          source={university}
                        />
                        <Datacell_mypage
                          content1="대학교"
                          content2={data.school_code}></Datacell_mypage>
                      </DataTable.Row>

                      <DataTable.Row key={data.key} style={styles.mypagerow}>
                        <Image
                          style={{...styles.selectedimg}}
                          source={gender1}
                        />
                        {data.sex == 'Female' ? (
                          <Datacell_mypage
                            content1="성별"
                            content2="여성"></Datacell_mypage>
                        ) : (
                          <Datacell_mypage
                            content1="성별"
                            content2="남성"></Datacell_mypage>
                        )}
                      </DataTable.Row>
                    </>
                  );
                })}
              </DataTable>
            </View>
          ) : (
            <View style={{...styles.centeredViewmypageno}}></View>
          )}
          <View
            style={{
              ...styles.buttonClosemrsmall,
              ...styles.mr15,
            }}>
            <Loginout />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#97C9F7',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FAFFFC',
    // fontStyle: 'italic',
  },
  header: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 8,
    height: '5%',
  },

  //modal css start
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredViewmypage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    margin: 20,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 10,
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    //borderRadius: 20,
  },
  centeredViewmypageno: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    margin: 20,
    alignItems: 'center',
    // borderColor: 'white',
    // borderWidth: 10,
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    //borderRadius: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FAFFFC',
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
  textTop: {
    marginTop: 20,
    width: 100,
  },
  textnomargin: {
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
    width: '70%',
  },
  buttonOpenTop: {
    backgroundColor: 'black',
    marginTop: 20,
    width: '70%',
  },
  buttonClose: {
    backgroundColor: 'black',
    marginTop: 30,
    alignSelf: 'flex-end',
    width: '30%',
  },
  buttonClosemrsmall: {
    backgroundColor: 'black',
    // marginTop: 20,
    alignSelf: 'flex-end',
    width: '30%',
    margin: 10,
  },
  buttonClosemt: {
    backgroundColor: 'black',
    marginTop: 10,
    alignSelf: 'flex-end',
    width: '30%',
    marginBottom: 10,
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
    width: 180,
    height: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    marginBottom: 10,
  },

  rowcenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  mr: {
    marginRight: 5,
  },
  mr15: {
    marginRight: 15,
  },
  alignend: {
    alignSelf: 'flex-end',
    marginRight: 18,
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
    marginTop: 32,
  },
  mb: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },

  modal: {
    backgroundColor: '#FAFFFC',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    width: '58%', // 250
    alignItems: 'center',
    height: 10,
    borderWidth: 3,
  },

  modalsmall: {
    backgroundColor: '#FAFFFC',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    width: '50%',
    height: '58%',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 2,
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalms: {
    backgroundColor: '#FAFFFC',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 10,
    width: '75%',
    height: '83%',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 2,
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalmedium: {
    backgroundColor: '#FAFFFC',
    marginTop: 55,
    marginBottom: 50,
    marginLeft: 10,
    width: '55%',
    height: '55%',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 3,
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  modalbig: {
    backgroundColor: '#FAFFFC',
    marginTop: 60,
    marginBottom: 50,
    marginLeft: 10,
    width: '60%',
    height: '60%',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    flexWrap: 'wrap',
    borderWidth: 3,
    alignContent: 'center',
    justifyContent: 'center',
  },

  mypageoutline: {
    width: '100%',
    height: '70%',
    alignContent: 'center',
    justifyContent: 'center',
  },

  mypagerow: {
    margin: 20,
    borderBottomWidth: 6,
    borderBottomColor: 'white',
  },

  textStyle: {
    textAlign: 'center',
    color: '#FAFFFC',
  },
  textStyleblack: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontFamily: '',
    // fontWeight: 20,
  },
  textStyleblack2: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
    fontFamily: '',
    // fontWeight: 20,
    flexShrink: 1,
  },
  textStyleblackbig: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontFamily: '',
    // fontWeight: 20,
  },
  mypagetextbig: {
    width: 60,
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  mypagetext: {
    width: 60,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },

  weektitle: {
    fontSize: 2,
    textAlign: 'center',
  },
  smalltitle: {textAlign: 'center', fontsize: 20, color: 'black'},
  minibox: {
    width: '90%',
    height: '40%',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 8,
    borderStyle: 'dashed',
    flexWrap: 'wrap',
    alignContent: 'center',
    textAlign: 'center',
  },
  boxtexttop: {
    color: 'black',
    fontSize: 14,
    // fontFamily: '',
    // fontWeight: 100,
    marginTop: 5,
    // marginBottom: 15,
    width: '100%',
    textAlign: 'center',
  },
  boxtext: {
    color: 'black',
    fontSize: 14,
    // fontFamily: '',
    // fontWeight: 100,
    // margin: 10,
    width: '100%',
    textAlign: 'center',
  },
  selectedimg: {
    width: 40,
    height: 40,
    // tintColor: '#e6e6e6',/
  },
});

export default MainScreen;
