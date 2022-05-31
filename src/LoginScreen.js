import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {

  //userid token
  const [token, settoken] = useState('');

  const [returnMsg, setreturnMsg] = useState([]);
  const [userid, setUserid] = useState('');
  const [password, setPasswd] = useState('');


  //db접속
  const Login = async () => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/Login.php?userid=' +
          userid +
          '&password=' +
          password,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setreturnMsg(json_table.results); //3 const배열에다가 저장
      if (returnMsg[0].returnMsg == 'success') {
        AsyncStorage.setItem('token',userid, () =>{
          console.log("닉네임 저장");
        });
        AsyncStorage.getItem('token', (err,result)=>{
          settoken(result);
        });
        alert('로그인 성공');
        props.navigation.navigate('MainScreen');
      } else {
        alert('로그인 실패');
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
      <Button title="Login" onPress={() => Login()} />
      <Text>Register</Text>
      <Button
        onPress={() => props.navigation.navigate('RegisterScreen')}
        title="Go to RegisterScreen"
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
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default LoginScreen;
