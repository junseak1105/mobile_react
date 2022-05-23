import React, {Component, useState, useEffect} from 'react';
import {title} from 'process';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  StatusBar,
  Button,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import ScheduleModal from './components/ScheduleModal';
import theme from './colors';
import Schedule from './components/Schedule';
import {
  Table,
  TableWrapper,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
//  <TouchableOpacity activeOpacity={0}> 눌렀을 때 투명도 0

export default function App() {
  //db접속
  const gettimetable = async () => {
    try {
      const response_table = await fetch('http://localhost/gettimetable.php'); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setGettable(json_table.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //db접속끝

  const getmyinfo = async () => {
    try {
      const response_table = await fetch('http://localhost/mypage.php'); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setGetinfo(json_table.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gettimetable(); //받아오는 함수 실행
    getmyinfo();
  }, []);

  const [schedule, setSchedule] = useState(true); // 스케줄, 마이페이지 선택 working
  const [classname, setClassname] = useState(''); // 수업 명 입력 text
  const [timetable, setTimetable] = useState({}); // toDos
  const [classtitle, setClasstitle] = useState(true);
  const mypage = () => setSchedule(false); // travel
  const upload = () => setSchedule(true); // work
  const onChangeText = payload => setClassname(payload);

  const [gettable, setGettable] = useState([]);
  const [getinfo, setGetinfo] = useState([]);

  const elementButton = value => (
    <TouchableOpacity onPress={() => _alertIndex(value)}>
      <View style={styles.btn}>
        <Text style={styles.btnText2}>공강</Text>
      </View>
    </TouchableOpacity>
  );

  let myState = {
    tableTitle: [
      '1교시',
      '2교시',
      '3교시',
      '4교시',
      '5교시',
      '6교시',
      '7교시',
      '8교시',
      '9교시',
    ],
    tableData: [
      [
        'Mon',
        elementButton('Mon1'),
        elementButton('Mon2'),
        elementButton('Mon3'),
        elementButton('Mon4'),
        elementButton('Mon5'),
        elementButton('Mon6'),
        elementButton('Mon7'),
        elementButton('Mon8'),
        elementButton('Mon9'),
      ],
      [
        'Tue',
        elementButton('Tue1'),
        elementButton('Tue2'),
        elementButton('Tue3'),
        elementButton('Tue4'),
        elementButton('Tue5'),
        elementButton('Tue6'),
        elementButton('Tue7'),
        elementButton('Tue8'),
        elementButton('Tue9'),
      ],
      [
        'Wed',
        elementButton('Wed1'),
        elementButton('Wed2'),
        elementButton('Wed3'),
        elementButton('Wed4'),
        elementButton('Wed5'),
        elementButton('Wed6'),
        elementButton('Wed7'),
        elementButton('Wed8'),
        elementButton('Wed9'),
      ],
      [
        'Thus',
        elementButton('Thus1'),
        elementButton('Thus2'),
        elementButton('Thus3'),
        elementButton('Thus4'),
        elementButton('Thus5'),
        elementButton('Thus6'),
        elementButton('Thus7'),
        elementButton('Thus8'),
        elementButton('Thus9'),
      ],
      [
        'Fri',
        elementButton('Fri1'),
        elementButton('Fri2'),
        elementButton('Fri3'),
        elementButton('Fri4'),
        elementButton('Fri5'),
        elementButton('Fri6'),
        elementButton('Fri7'),
        elementButton('Fri8'),
        elementButton('Fri9'),
      ],
    ],
  };

  const [on, setOn] = useState(false);
  const update = () => setOn(true);
  const _alertIndex = value => {
    Alert.alert(`${value}가 선택되었습니다.`);
    return update;
  };

  const [state, setState] = useState(myState);

  const addSchedule = () => {
    if (classname === '') {
      return alert('등록되었습니다.');
    }
    // 수업명 저장
    // const newTimetable = Object.assign({}, timetable, {
    //   [Date.now()]: {classname, upload: schedule},
    // });
    const newTimetable = {
      ...timetable,
      [Date.now()]: {classname, upload: schedule},
    };
    setTimetable(newTimetable);
    setClassname('');
    alert('등록되었습니다.');
  };
  console.log(timetable);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={upload}>
          <Text
            style={{
              ...styles.btnText,
              color: schedule ? 'white' : '#3A3D4D',
            }}>
            Upload Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={mypage}>
          <Text
            style={{
              ...styles.btnText,
              color: !schedule ? 'white' : '#3A3D4D',
            }}>
            My Page
          </Text>
        </TouchableOpacity>
      </View>
      {schedule ? (
        /* <View style={styles.inputplace}>
        <TextInput
          style={styles.input2}
          value={starttime}
          placeholder={'수업 시작 시간'}
          keyboardType="number-pad"
          maxLength={4}
        />
        <TextInput
          style={styles.input2}
          value={finishtime}
          placeholder={'수업 종료 시간'}
          keyboardType="number-pad"
          maxLength={4}
        />
      </View> */
        <View style={{marginTop: 50}}>
          <Text style={{color: 'white'}}>MY SCHEDULE</Text>
          <View style={{backgroundColor: 'white'}}>
            <View>
              <Table
                style={{flexDirection: 'row', padding: '3%'}}
                borderStyle={{borderWidth: 1}}>
                {/* Left Wrapper tableTitle = 1교시 ~ 9교시 타이틀 */}
                <TableWrapper style={{width: 80}}>
                  <Cell data="" style={styles.singleHead} />
                  <TableWrapper style={{flexDirection: 'row'}}>
                    <Col
                      data={state.tableTitle}
                      style={styles.title}
                      heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]}
                      textStyle={styles.titleText}></Col>
                  </TableWrapper>
                </TableWrapper>
                ;{/* Right Wrapper tabledata = mon1 ~ mon8*/}
                {gettable.map(data => {
                  <TableWrapper style={{flex: 1}}>
                    <Cols
                      //data={data.Mon.class}
                      data={state.tableData}
                      heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]}
                      textStyle={styles.text}
                    />
                  </TableWrapper>;
                })}
              </Table>
            </View>
          </View>
          <View>
            {classtitle ? (
              <TextInput
                onSubmitEditing={addSchedule}
                multiline={false}
                style={styles.input}
                value={classname}
                onChangeText={onChangeText}
                returnKeyType="done"
                placeholderTextColor="#3A3D4D"
                placeholder={'수업 명을 입력하세요.'}
              />
            ) : null}
            <ScrollView>
              {Object.keys(timetable).map(key => (
                <View styles={styles.timetable} key={key}>
                  <Text style={styles.timetableText}>
                    {timetable[key].text}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      ) : (
        <View>
          <Text style={{color: 'white'}}>Name</Text>
          <Text style={{color: 'white'}}>ID</Text>
          <Text style={{color: 'white'}}>PW</Text>
          <Text style={{color: 'white'}}>School</Text>
          <Text style={{color: 'white'}}>Gender</Text>

          <View styles={styles.btnlayout}>
            <Button title="edit" />
            <Button title="delete" />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 50,
  },
  box1: {
    backgroundcolor: 'white',
  },
  // inputplace: {
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  // },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    fontSize: 15,
  },
  // input2: {
  //   backgroundColor: 'white',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 30,
  //   marginTop: 15,
  //   fontSize: 15,
  //   width: 150,
  // },
  timetable: {
    backgroundcolor: '#3A3D4D',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  timetableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  singleHead: {
    width: 80,
    height: 40,
    backgroundColor: '#c8e1ff',
    color: 'white',
  },
  head: {flex: 1, backgroundColor: '#c8e1ff'},
  title: {flex: 2, backgroundColor: '#f6f8fa'},
  titleText: {marginRight: 6, textAlign: 'right'},
  text: {textAlign: 'center'},
  btn: {
    width: 40,
    height: 18,
    marginLeft: 8,
    backgroundColor: '#c8e1ff',
    borderRadius: 2,
  },
  btnText2: {textAlign: 'center'},
  btnlayout: {
    flex: 1,
    flexDirection: 'column',
  },
});
