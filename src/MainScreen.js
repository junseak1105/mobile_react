import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';

const MainScreen = props => {
  // const [Timetable, SetTimetable] = useState([
  //   {
  //     hour: '9',
  //     Mon: {
  //       time: 'Mon1',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue1',
  //       class: 'test',
  //     },
  //     Wed: {
  //       time: 'Wed1',
  //       class: 'test',
  //     },
  //     Thu: {
  //       time: 'Thu1',
  //       class: '',
  //     },
  //     Fri: {
  //       time: 'Fri1',
  //       class: '',
  //     },
  //   },
  //   {
  //     hour: '10',
  //     Mon: {
  //       time: 'Mon2',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue2',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed2',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu2',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri2',
  //       class: 'test',
  //     },
  //   },
  //   {
  //     hour: '11',
  //     Mon: {
  //       time: 'Mon3',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue3',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed3',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu3',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri3',
  //       class: 'test',
  //     },
  //   },
  //   {
  //     hour: '12',
  //     Mon: {
  //       time: 'Mon4',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue4',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed4',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu4',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri4',
  //       class: 'test',
  //     },
  //   },
  //   {
  //     hour: '1',
  //     Mon: {
  //       time: 'Mon5',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue5',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed5',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu5',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri5',
  //       class: 'test',
  //     },
  //   },
  //   {
  //     hour: '2',
  //     Mon: {
  //       time: 'Mon6',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue6',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed6',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu6',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri6',
  //       class: 'test',
  //     },
  //   },
  //   {
  //     hour: '3',
  //     Mon: {
  //       time: 'Mon7',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue7',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed7',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu7',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri7',
  //       class: 'test',
  //     },
  //   },
  //   {
  //     hour: '4',
  //     Mon: {
  //       time: 'Mon8',
  //       class: '',
  //     },
  //     Tue: {
  //       time: 'Tue8',
  //       class: '',
  //     },
  //     Wed: {
  //       time: 'Wed8',
  //       class: '',
  //     },
  //     Thu: {
  //       time: 'Thu8',
  //       class: 'test',
  //     },
  //     Fri: {
  //       time: 'Fri8',
  //       class: 'test',
  //     },
  //   },
  // ]);
//db접속
// const gettimetable = async () => {
//   try {
//     const response_table = await fetch(
//       'http://jhk.n-e.kr:80/get_timetable.php?userID=test2',
//     ); //1 CURL로 연결(php)
//     const json_table = await response_table.json(); //2 json 받아온거 저장
//     SetTimetable(json_table.results); //3 const배열에다가 저장
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// };
// //db접속끝

// useEffect(() => {
//   gettimetable(); //받아오는 함수 실행
// }, []);

  return (
    
    <View style={styles.screen}>
    <Text>Screen 1</Text>
    <Button
      onPress={() => props.navigation.navigate('match')}
      title="Go to match"
    />
    </View>

    // <View style={styles.container}>
    //   {/* <DataTable>
    //     <DataTable.Header>
    //       <DataTable.Title></DataTable.Title>
    //       <DataTable.Title>Mon</DataTable.Title>
    //       <DataTable.Title>Tue</DataTable.Title>
    //       <DataTable.Title>Wed</DataTable.Title>
    //       <DataTable.Title>Thu</DataTable.Title>
    //       <DataTable.Title>Fri</DataTable.Title>
    //     </DataTable.Header>
    //     {Timetable.map(data => {
    //       return (
    //         <DataTable.Row>
    //           <DataTable.Cell>{data.hour}</DataTable.Cell>
    //           <DataTable.Cell>
    //             <Button
    //               onPress={() => Alert.alert("clicked!")}
    //               title = {data.Mon.class}
    //             />
    //           </DataTable.Cell>
    //           <DataTable.Cell>
    //           <Button
    //               onPress={() => Alert.alert("clicked!")}
    //               title = {data.Tue.class}
    //             />
    //           </DataTable.Cell>
    //           <DataTable.Cell>
    //             <Button
    //               onPress={() => Alert.alert("clicked!")}
    //               title = {data.Wed.class}
    //             />
    //           </DataTable.Cell>
    //           <DataTable.Cell>
    //             <Button
    //               onPress={() => Alert.alert("clicked!")}
    //               title = {data.Thu.class}
    //             />
    //           </DataTable.Cell>
    //           <DataTable.Cell>
    //             <Button
    //               onPress={() => Alert.alert("clicked!")}
    //               title = {data.Fri.class}
    //             />
    //           </DataTable.Cell>
    //         </DataTable.Row>
    //       );
    //     })}
    //   </DataTable> */}


    // </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
