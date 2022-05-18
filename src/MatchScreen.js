import React, { useState,useEffect } from "react";
import {Button,ActivityIndicator, FlatList, SafeAreaView, TextInput, isSelectedBar, StyleSheet, Text,TouchableOpacity,View,ScrollView } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import MyButton from "../components/MyButton";
import CheckboxList from 'rn-checkbox-list';




const MatchScreen = () => {

  const [selectedFood,setselectedFood] = useState([]);
  const [selectedHobby,setselectedHobby] = useState([]);

  //db접속
  const [isLoading, setLoading] = useState(true);
  const [fa_hobby, sethobbyData] = useState([]);
  const [fa_food, setfoodData] = useState([]);

  const getcategory = async () => {
     try {
      const response_food = await fetch('http://jhk.n-e.kr:8080/test.php?table=favor_ca&co_code=fa_food'); //1 CURL로 연결(php)
      const response_hobby = await fetch('http://jhk.n-e.kr:8080/test.php?table=favor_ca&co_code=fa_hobby');
      const json_food = await response_food.json(); //2 json 받아온거 저장
      const json_hobby = await response_hobby.json();
      sethobbyData(json_hobby.results); //3 const배열에다가 저장
      setfoodData(json_food.results);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  //db접속끝
  
  useEffect(() => {
    getcategory(); //받아오는 함수 실행
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.idx}, {item.userName}</Text>
          )}
        />
      )}
    </View> */}
      <View style={styles.container}>
        <View style={styles.container_sex}>
          <MyButton/>
          <MyButton/>
          <MyButton/>
        </View>
        <View style = {styles.selector_hobby_food}>
          <SafeAreaView style={styles.container_hobby}>
            <CheckboxList 
              headerName="전체" 
              listItems={fa_hobby} 
              selectedListItems={selectedHobby} 
              onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.container_food}>   
            <CheckboxList 
              headerName="전체" 
              listItems={fa_food} 
              selectedListItems={selectedFood} 
              onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
            />
          </SafeAreaView>
        </View>
        <View style={styles.set_match}>
          <MyButton/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hobby_checkbox: {
    flexDirection:'row',
  },
  item_food: {
    width:20,
    height:20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
  },
  selector_hobby_food: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex:6,
  },
  container_food:{
    flex:1,
  },
  container_hobby:{
    flex:1,
  },
  container_sex:{
    flexDirection:'row',
  },
  set_match:{
    width:100,
    flex:1,
  }
});


export default MatchScreen;