import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

const ScheduleModal = ({isVisible, hide, add}) => {
  let content = '';
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hide}
      avoidKeyboard
      style={styles.modal}>
      <View>
        <TextInput
          onChangeTest={text => {
            content = text;
          }}
          onEndEditing={() => add(content)}
          placeholder="수업 명을 입력하세요"></TextInput>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 8,
  },
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default ScheduleModal;
// onBackdropPress 백그라운드 눌렀을 때
// 글자 입력하면 text가 content 변수에 담기고
// onEndEditing 은 다쓰고 엔터키 쳤을 때 add 함수로 content(=text) 던지는 거임
// 그럼 App.js에서 state-class라는 배열에 데이터 추가됨
