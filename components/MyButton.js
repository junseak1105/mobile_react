import React from 'react';
import {View, Pressable, Text} from 'react-native';

const MyButton = props => {
  return (
    <Pressable
      style={{
        backgroundColor: props.Color,
        width: '100%',
        height: '100%',
      }}
      onPress={() => setModal(props.hour, props.status, props.day)}>
      <Text
        numberOfLines={5}
        ellipsizeMode="tail"
        style={{
          fontSize: 10,
          color: '#FAFFFC',
        }}>
        {props.text_param}
      </Text>
    </Pressable>
  );
};

export default MyButton;
