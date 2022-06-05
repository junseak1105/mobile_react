import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { executeNativeBackPress } from 'react-native-screens';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const RegisterScreen = props => {
  const [returnMsg, setreturnMsg] = useState([]);
  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPasswd] = useState("");
  const [school, setSchool] = useState("");
  const [sex, setSex] = useState("");

  //성별 드롭다운
  const [open_sex, setOpensex] = useState(false);
  const [items_sex, setItemssex] = useState([
    {label: '남자', value: 'Male'},
    {label: '여자', value: 'Female'},
  ]);
  const [open_school, setOpenschool] = useState(false);
  const [items_school, setItemsschool] = useState([]);

  const getschool = async () => {
    try {
      const response_school = await fetch(
        'http://jhk.n-e.kr:80/get_school.php',
      );
      const json_school = await response_school.json();
      setItemsschool(json_school.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //db접속끝
  
  const isFocused = useIsFocused();
  useEffect(() => {
    getschool(); //받아오는 함수 실행
  }, [isFocused]);
  //카테고리 받아오기 끝


  //db접속
  const Register = async () => {
    if(userid==""){
      alert("아이디를 입력하세요")
      return;
    }else if(username==""){
      alert("비밀번호를 입력하세요");
      return;
    }else if(school==""){
      alert("학교를 선택하세요");
      return;
    }else if(sex==""){
      alert("성별을 선택하세요");
      return;
    }
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/register.php?userid='+userid+'&username='+username+'&password='+password+'&school='+school+'&sex='+sex,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setreturnMsg(json_table.results); //3 const배열에다가 저장
      if(returnMsg[0].returnMsg == "success"){
        alert("가입 완료");
        props.navigation.navigate('LoginScreen');
      }else{
        alert("중복된 아이디입니다");
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
      <TextInput
        style={styles.input}
        placeholder="UserID"
        autoCapitalize="none"
        defaultValue={userid} 
        placeholderTextColor="white"
        onChangeText={val => setUserid(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        defaultValue={username} 
        placeholderTextColor="white"
        onChangeText={val => setUsername(val)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        defaultValue={password} 
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={val => setPasswd(val)}
      />
      <DropDownPicker
        style={styles.input}
        placeholder='성별선택'
        placeholderStyle={{
          color: "white",
          fontWeight: "bold"
        }}
        open={open_sex}
        value={sex}
        items={items_sex}
        setOpen={setOpensex}
        setValue={setSex}
        setItems={setItemssex}
      />
      <DropDownPicker
        style={styles.input}
        searchable={true}
        searchPlaceholder="학교 검색"
        placeholder='학교선택'
        placeholderStyle={{
          color: "white",
          fontWeight: "bold"
        }}
        open={open_school}
        value={school}
        items={items_school}
        setOpen={setOpenschool}
        setValue={setSchool}
        setItems={setItemsschool}
      />

      <Button title="Sign Up" onPress={()=>Register()} />
      <Text>Register</Text>
      <Button
        onPress={() => props.navigation.navigate('LoginScreen')}
        title="Go to LoginScreen"
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
