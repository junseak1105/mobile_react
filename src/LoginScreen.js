import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import schedule from './images/schedule.png';

const LoginScreen = props => {
  const isFocused = useIsFocused();
  useEffect(() => {
    //localstorage userid getdata
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
    });
  }, [isFocused]);

  //userid token
  const [token, settoken] = useState('');

  //const [returnMsg, setreturnMsg] = useState();
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
      //setreturnMsg(json_table.results); //3 const배열에다가 저장
      {
        json_table.results.map(data => {
          if (data.returnMsg == 'success') {
            AsyncStorage.setItem('token', userid, () => {
              console.log('닉네임 저장');
            });
            AsyncStorage.getItem('token', (err, result) => {
              settoken(result);
              //alert(token);
            });
            alert('안녕하세요');
            props.navigation.navigate('MainScreen');
          } else {
            alert('아이디 혹은 비밀번호를 확인해주세요');
          }
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };
  //db접속끝

  return (
    <View style={styles.screen}>
      {/* <Text style={styles.textStyleblack}>로그인</Text> */}
      <Image style={styles.selectedimg} source={schedule} />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        autoCapitalize="none"
        placeholderTextColor="#FAFFFC"
        onChangeText={val => setUserid(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="#FAFFFC"
        onChangeText={val => setPasswd(val)}
      />
      <View style={styles.alignend}>
        <Button title="로그인" onPress={() => Login()} color="black" />
      </View>
      <View style={styles.mt15}></View>
      <View style={styles.aligncenter}>
        <Text style={styles.textStyleblackend}>
          저희와 함께 의미있는 공강 시간을 보내실래요?
        </Text>

        <Button
          onPress={() => props.navigation.navigate('RegisterScreen')}
          color="black"
          title="회원가입"
        />
      </View>
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
    width: 300,
    height: 55,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#97C9F7',
    margin: 10,
    padding: 8,
    color: '#FAFFFC',
    borderRadius: 0,
    fontSize: 18,
    // fontWeight: '500',
  },
  textStyleblack: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: '',
    // fontWeight: 20,
  },
  textStyleblackend: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    fontFamily: '',
    // fontWeight: 20,
    textAlign: 'center',
    marginBottom: 3,
  },
  ml: {
    marginLeft: 5,
  },
  mt5: {
    marginTop: 5,
  },
  mt7: {
    marginTop: 7,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mb: {
    marginBottom: 5,
  },
  aligncenter: {
    alignSelf: 'center',
    // marginRight: 35,
    marginTop: 33,
  },
  alignend: {
    alignSelf: 'flex-end',
    marginRight: 58,
    marginTop: 10,
  },
  selectedimg: {
    width: 110,
    height: 110,
  },
});

export default LoginScreen;
