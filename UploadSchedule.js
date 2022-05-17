import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import Modal from 'react-native-modal';
import {
  Table,
  TableWrapper,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
// import styled from 'styled-components/native'; 스타일 경로 지정해서 input

export default class ExampleFive extends Component {
  constructor(props) {
    super(props);
    const elementButton = value => (
      <TouchableOpacity onPress={() => this._alertIndex(value)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>공강</Text>
        </View>
      </TouchableOpacity>
    );
    function Schedule() {
      for (let i = 1; i < 10; i++) {
        elementButton('Mon' + i);
      }
    }
    this.state = {
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
  }

  _alertIndex(value) {
    Alert.alert(`${value}의 수업명을 입력하세요`);
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text>MY SCHEDULE</Text>
        <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
          {/* Left Wrapper */}
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

          {/* Right Wrapper */}
          <TableWrapper style={{flex: 1}}>
            <Cols
              data={state.tableData}
              heightArr={[40, 30, 30, 30, 30, 30, 30, 30, 30, 30]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
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
