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

//  <TouchableOpacity activeOpacity={0}> 눌렀을 때 투명도 0

export default function App() {
  const [scheduling, setSchedule] = useState(true); // 스케줄, 마이페이지 선택 working
  const [classname, setClassname] = useState(''); // 수업 명 입력 text
  const [starttime, setStarttime] = useState('');
  const [finishtime, setFinishtime] = useState('');
  const [timetable, setTimetable] = useState({}); // toDos
  const mypage = () => setSchedule(false); // travel
  const upload = () => setSchedule(true); // work
  const onChangeText = payload => setClassname(payload);
  const onChangeText2 = payload => setStarttime(payload);
  const onChangeText3 = payload => setFinishtime(payload);
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
      [Date.now()]: {classname, starttime, finishtime, upload: scheduling},
    };
    const newStarttime = {
      ...timetable,
      [Date.now()]: {starttime},
    };
    const newFinishtime = {
      ...timetable,
      [Date.now()]: {finishtime},
    };
    setTimetable(newTimetable);
    setStarttime(newStarttime);
    setFinishtime(newFinishtime);
    setClassname('');
    setStarttime('');
    setFinishtime('');
    alert('등록되었습니다.');
  };
  const addStartTime = () => {
    if (starttime === '') {
      return alert('시작 시간을 입력하세요');
    }
    // 수업명 저장
    // const newTimetable = Object.assign({}, timetable, {
    //   [Date.now()]: {classname, upload: scheduling},
    // });
    const newStarttime = {
      ...timetable,
      [Date.now()]: {starttime},
    };
    setStarttime(newStarttime);
    setClassname('');
    alert('등록되었습니다.');
  };
  const addFinishTime = () => {
    if (classname === '') {
      return alert('마치는 시간을 입력하세요');
    }
    // 수업명 저장
    // const newTimetable = Object.assign({}, timetable, {
    //   [Date.now()]: {classname, upload: scheduling},
    // });
    const newFinishtime = {
      ...timetable,
      [Date.now()]: {finishtime},
    };
    setFinishtime(newFinishtime);
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
        <View>
          <View style={styles.inputplace}>
            <TextInput
              onSubmitEditing={addSchedule}
              style={styles.input2}
              value={starttime}
              onChangeText={onChangeText2}
              placeholderTextColor="#3A3D4D"
              placeholder={'수업 시작 시간'}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              onSubmitEditing={addSchedule}
              style={styles.input2}
              value={finishtime}
              onChangeText={onChangeText3}
              placeholderTextColor="#3A3D4D"
              placeholder={'수업 종료 시간'}
              keyboardType="number-pad"
              maxLength={4}
            />
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
  inputplace: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
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
  input2: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
    fontSize: 15,
    width: 150,
  },
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
