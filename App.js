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
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

//  <TouchableOpacity activeOpacity={0}> 눌렀을 때 투명도 0

export default function App() {
  const [schedule, setSchedule] = useState(true); // 스케줄, 마이페이지 선택 working
  const [classname, setClassname] = useState(''); // 수업 명 입력 text
  const [timetable, setTimetable] = useState({}); // toDos
  const [classtitle, setClasstitle] = useState(true);
  const mypage = () => setSchedule(false); // travel
  const upload = () => setSchedule(true); // work
  const onChangeText = payload => setClassname(payload);

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
            <Schedule />
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
});
