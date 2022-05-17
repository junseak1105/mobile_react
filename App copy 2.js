import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  StatusBar,
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
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

//  <TouchableOpacity activeOpacity={0}> 눌렀을 때 투명도 0

export default function App() {
  const [scheduling, setSchedule] = useState(true); // 스케줄, 마이페이지 선택 working
  const [classname, setClassname] = useState(''); // 수업 명 입력 text
  const [timetable, setTimetable] = useState({}); // toDos
  const mypage = () => setSchedule(false); // travel
  const upload = () => setSchedule(true); // work
  const onChangeText = payload => setClassname(payload);
  const elementButton = value => (
    <TouchableOpacity onPress={() => _alertIndex(value)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>공강</Text>
      </View>
    </TouchableOpacity>
  );
  const [tableTitle] = useState([
    '1교시',
    '2교시',
    '3교시',
    '4교시',
    '5교시',
    '6교시',
    '7교시',
    '8교시',
    '9교시',
  ]);
  const [tableData] = useState(
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
  );
  const addSchedule = () => {
    if (classname === '') {
      return alert('등록되었습니다.');
    }
    // 수업명 저장
    // const newTimetable = Object.assign({}, timetable, {
    //   [Date.now()]: {classname, upload: scheduling},
    // });
    const newTimetable = {
      ...timetable,
      [Date.now()]: {classname, upload: scheduling},
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
              color: scheduling ? 'white' : '#3A3D4D',
            }}>
            Upload Schedule
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={mypage}>
          <Text
            style={{
              ...styles.btnText,
              color: !scheduling ? 'white' : '#3A3D4D',
            }}>
            My Page
          </Text>
        </TouchableOpacity>
      </View>
      {scheduling ? (
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
        <View>
          <View style={styles.container2}>
            <Text>MY SCHEDULE</Text>
            <Table
              style={{flexDirection: 'row'}}
              borderStyle={{borderWidth: 1}}>
              {/* Left Wrapper */}
              <TableWrapper style={{width: 80}}>
                <Row data="" style={styles.singleHead} />
                <TableWrapper style={{flexDirection: 'row'}}>
                  <Col
                    data={tableTitle}
                    style={styles.title}
                    heightArr={[30, 30, 30, 30, 30, 30, 30, 30, 30]}
                    textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>

              {/* Right Wrapper */}
              <TableWrapper style={{flex: 1}}>
                <Col
                  data={tableData}
                  heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
          <View>
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
      ) : null}
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
  // inputplace: {
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  // },
  btnText: {
    fontSize: 23,
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
  container2: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  singleHead: {width: 80, height: 40, backgroundColor: '#c8e1ff'},
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
  btnText: {textAlign: 'center'},
});
