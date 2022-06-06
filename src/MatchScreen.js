import React, {useState, useEffect} from 'react';
import {
  Button,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  isSelectedBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
  Image,
  // CheckBox,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import MyButton from '../components/MyButton';
import CheckboxList from 'rn-checkbox-list';
import {get} from 'express/lib/response';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

// 이미지
import girl from './images/girl.png';
import boy from './images/boy.png';
import match from './images/friend2.png';

const MatchScreen = ({route, navigation}) => {
  //새로고침 함수
  const isFocused = useIsFocused();
  //navigation data
  const param_hour = route.params.param_hour;
  const param_day = route.params.param_day;
  const param_status = route.params.param_status;
  //userid token
  const [token, settoken] = useState();
  //팝업창
  const [modalVisible, setModalVisible] = useState(false);
  const [modaltext, setmodaltext] = useState();
  const [modalinfo, setmodalinfo] = useState();
  //match 성공 여부 저장
  const [match_result, setmatchresult] = useState([]);
  //카테고리 받아오기 시작
  //선택된 값 저장
  const [selectedFood, setselectedFood] = useState([]);
  const [selectedHobby, setselectedHobby] = useState([]);
  // const [selectedSex, setselectedSex] = useState([]);
  const [selectedSex, setselectedSex] = useState('Female');
  const [selectedman, setselectedman] = useState(true);
  const [selectedwoman, setselectedwoman] = useState(false);
  //카테고리 받아온 값 저장
  const [isLoading, setLoading] = useState(true);
  const [fa_hobby, sethobbyData] = useState([]);
  const [fa_food, setfoodData] = useState([]);
  const [fa_sex, setsexData] = useState([]);

  //페이지 로딩 함수
  useEffect(() => {
    //localstorage userid getdata
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
    });
    getcategory(); //받아오는 함수 실행
  }, [isFocused]);

  //카테고리 가져오기
  const getcategory = async () => {
    try {
      const response_food = await fetch(
        'http://jhk.n-e.kr:80/get_category.php?table=favor_ca&co_code=fa_food',
      ); //1 CURL로 연결(php)
      const response_hobby = await fetch(
        'http://jhk.n-e.kr:80/get_category.php?table=favor_ca&co_code=fa_hobby',
      );
      const response_sex = await fetch(
        'http://jhk.n-e.kr:80/get_category.php?table=favor_ca&co_code=fa_sex',
      );
      const json_food = await response_food.json(); //2 json 받아온거 저장
      const json_hobby = await response_hobby.json();
      const json_sex = await response_sex.json();
      sethobbyData(json_hobby.results); //3 const배열에다가 저장
      setfoodData(json_food.results);
      setsexData(json_sex.results);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  //=========================컴포넌트 모음 시작===============================
  //팝업창 컴포넌트
  const Modal_view = () => {
    if (match_result.count == 0) {
      setmodaltext('현재 매칭 가능한\n대상이 없습니다.\n\n 대기하실래요?');
      return (
        <View style={styles.modalmedium}>
          <Text style={[styles.textStyleblack, styles.textTop2]}>
            {modaltext}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonOpenTop]}
            onPress={() => setmatch('nomatch')}>
            <Text style={styles.textStyle}>매칭 동의</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => cancelmatch()}>
            <Text style={styles.textStyle}>취소</Text>
          </Pressable>
        </View>
      );
    } else {
      setmodaltext('매칭 성공! \n\n상대와 즐거운 공강 시간을\n보내실래요?\n');
      setmodalinfo(
        '매칭 상대 정보\n\n매칭 상대는 ' +
          match_result.userID +
          ' 입니다' +
          '\n\n상대의 체크 문항은 \n' +
          match_result.select_favor_list +
          '\n입니다',
      );
      return (
        <View style={styles.modalbig}>
          <Text style={[styles.textStyleblack, styles.textToplong]}>
            {modaltext}
          </Text>
          <View style={styles.minibox}>
            <Text style={styles.boxtext}>{modalinfo}</Text>
          </View>
          <Pressable
            style={[styles.button, styles.buttonOpenTop2]}
            onPress={() => setmatch('matched')}>
            <Text style={styles.textStyle}>매칭 동의</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonClose2]}
            onPress={() => cancelmatch()}>
            <Text style={styles.textStyle}>취소</Text>
          </Pressable>
        </View>
      );
    }
  };
  //=========================컴포넌트 모음 끝===============================

  //매칭 버튼 클릭 시 검색
  const find_match = async () => {
    let selected_sex = selectedSex.toString();
    let selected_food = selectedFood.toString();
    let selected_hobby = selectedHobby.toString();

    try {
      const response_match = await fetch(
        'http://jhk.n-e.kr:80/find_match.php?userID=' +
          token +
          '&selected_hour=' +
          param_hour +
          '&selected_day=' +
          param_day +
          '&selected_status=' +
          param_status +
          '&selected_sex=' +
          selected_sex +
          '&selected_food=' +
          selected_food +
          '&selected_hobby=' +
          selected_hobby,
      ); //1 CURL로 연결(phselected_foodp)
      const json_match = await response_match.json(); //2 json 받아온거 저장
      setmatchresult(json_match.results); //3 const배열에다가 저장
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  //매칭 설정, 대상없을 시 matched = nomatch, 있을 시 matched= matched
  const setmatch = async param => {
    try {
      const response_match = await fetch(
        'http://jhk.n-e.kr:80/set_match.php?userID=' +
          token +
          '&selected_hour=' +
          param_hour +
          '&selected_day=' +
          param_day +
          '&matched=' +
          param +
          '&match_userid=' +
          match_result.userID,
      ); //1 CURL로 연결(phselected_foodp)
      const json_match = await response_match.json(); //2 json 받아온거 저장
      setmatchresult(json_match.results); //3 const배열에다가 저장
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
    setModalVisible(!modalVisible);
  };

  //매칭 클릭 이후 취소 시 매칭 데이터 삭제
  const cancelmatch = async () => {
    try {
      const response_match = await fetch(
        'http://jhk.n-e.kr:80/cancel_match.php?userID=' +
          token +
          '&selected_hour=' +
          param_hour +
          '&selected_day=' +
          param_day,
      ); //1 CURL로 연결(phselected_foodp)
      const json_match = await response_match.json(); //2 json 받아온거 저장
      setmatchresult(json_match.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
    setModalVisible(!modalVisible);
  };
  const value = sex => {
    console.log(sex);
    if (sex == 'Male' && sex != selectedSex) {
      setselectedman(!selectedman);
      setselectedwoman(!selectedwoman);
    } else if (sex == 'Female' && sex != selectedSex) {
      setselectedwoman(!selectedwoman);
      setselectedman(!selectedman);
    }
    setselectedSex(sex);
    // selectedwoman ? [setselectedSex('Female')] : '';
    // selectedman ? [setselectedSex('Male')] : '';
    // console.log('선택값:' + selectedSex);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.container_sex}>
          <Pressable onPress={() => [value('Male')]}>
            {selectedman ? (
              <Image style={styles.selectedimg} source={boy} />
            ) : (
              <Image style={styles.img} source={boy} />
            )}
          </Pressable>
          <Pressable onPress={() => [value('Female')]}>
            {selectedwoman ? (
              <Image style={styles.selectedimg} source={girl} />
            ) : (
              <Image style={styles.img} source={girl} />
            )}
          </Pressable>
          {/* <CheckboxList
            headerName="전체"
            headerStyle={styles.headertext}
            style={styles.chkbox_sex}
            listItems={fa_sex} // 리스트 array
            selectedListItems={selectedSex}
            listItemStyle={{
              // 선 스타일
              borderBottomColor: 'black',
              borderBottomWidth: 0,
              flexDirection: 'row',
            }}
            theme="black"
            onChange={({ids, items}) => setselectedSex(ids)}
          /> */}
        </View>
        <View style={styles.selector_hobby_food}>
          <SafeAreaView style={styles.container_hobby}>
            <CheckboxList
              headerName="모두 선택"
              // headerStyle={styles.headertext}
              listItems={fa_hobby}
              selectedListItems={selectedHobby}
              listItemStyle={{
                marginTop: 8,
                // borderWidth: 5,
                // borderColor: '#97C9F7',
              }}
              onChange={({ids, items}) => setselectedHobby(ids)}
              theme="black"
            />
          </SafeAreaView>
          <SafeAreaView style={styles.container_food}>
            <CheckboxList
              headerName="모두 선택"
              // headerStyle={styles.headertext}
              listItems={fa_food}
              selectedListItems={selectedFood}
              listItemStyle={{
                marginTop: 8,
                // borderWidth: 5,
                // borderColor: '#97C9F7',
              }}
              onChange={({ids, items}) => setselectedFood(ids)}
              theme="black"
            />
          </SafeAreaView>
        </View>
        <View style={styles.find_match}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              padding: 16,
              margin: 5,
              borderRadius: 8,
            }}
            onPress={() => find_match()}>
            <Text style={styles.textStyle}>신청</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 팝업창 */}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFFFC',
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
    borderWidth: 3,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttoncl: {
    borderRadius: 0,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'black',
    marginTop: 10,
    width: 100,
  },
  buttonClose: {
    backgroundColor: 'black',
    marginTop: 10,
    marginRight: 15,
    alignSelf: 'flex-end',
    width: 50,
  },
  buttonClose2: {
    backgroundColor: 'black',
    marginTop: 0,
    marginRight: 15,
    alignSelf: 'flex-end',
    width: 50,
  },
  buttonOpenTop: {
    backgroundColor: 'black',
    marginTop: 30,
    width: 100,
  },
  buttonOpenTop2: {
    backgroundColor: 'black',
    width: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  //modal css end

  // 추가
  screen: {
    flex: 1,
    backgroundColor: 'white',
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
    width: 240,
    height: 250,
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
    width: 300,
    height: 420,
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 18,
    borderWidth: 3,
  },
  minibox: {
    // marginLeft: 10,
    width: 250,
    height: 180,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    marginBottom: 17,
    borderStyle: 'dashed',
  },
  boxtext: {
    // textAlign: 'center',
    color: 'black',
    fontSize: 14,
    // fontFamily: '',
    // fontWeight: 100,
    margin: 10,
  },

  container_sex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 60,
    marginRight: 60,
    marginTop: 30,
    marginBottom: 20,
  },
  container_food: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  container_hobby: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },

  chkbox_sex: {},

  selector_hobby_food: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 6,
    marginRight: 20,
    marginLeft: 20,
  },

  find_match: {
    width: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 290,
  },

  // headertext: {
  //   backgroundColor: '#97C9F7',
  //   text: {
  //     color: 'white',
  //   },
  // },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    // resizeMode: 'contain',
  },
  textTop: {
    marginTop: 20,
    width: 100,
  },
  textTop2: {
    marginTop: 20,
    width: 150,
  },
  textToplong: {
    marginTop: 20,
    width: 180,
  },
  textStyleblack: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    // fontFamily: '',
    // fontWeight: 100,
  },

  img: {
    width: 100,
    height: 100,
    // resizeMode: 'contain',
    // flex: 1,
    // tintColor: '#e6e6e6',
  },
  selectedimg: {
    width: 100,
    height: 100,
    tintColor: '#e6e6e6',
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default MatchScreen;
