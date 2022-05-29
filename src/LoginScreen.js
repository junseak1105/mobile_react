import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = props => {

  const [returnMsg, setreturnMsg] = useState([]);
  const [userid, setUserid] = useState("");
  const [password, setPasswd] = useState("");


  //db접속
  const Login = async () => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/Login.php?userid='+userid+'&password=&'+password
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setreturnMsg(json_table.results); //3 const배열에다가 저장
      if(returnMsg[0].returnMsg == "success"){
        alert("로그인 성공");

        // 유저 닉네임 저장
        // AsyncStorage.setItem('token',returnMsg[0].token, () => {
        //   console.log('유저 닉네임 저장 완료')
        // });
        
        props.navigation.navigate('MainScreen');
      }else{
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //db접속끝

  return (
    <View style={styles.screen}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="UserID"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={val => setUserid(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={val => setPasswd(val)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
