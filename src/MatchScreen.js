import React, { useState,useEffect } from "react";
import {Button,ActivityIndicator, FlatList, SafeAreaView, TextInput, isSelectedBar, StyleSheet, Text,TouchableOpacity,View,ScrollView } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import MyButton from "../components/MyButton";
import CheckboxList from 'rn-checkbox-list';




const MatchScreen = () => {

  const [selectedId, setSelectedId] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  //db접속
  const [isLoading, setLoading] = useState(true);
  const [fa_hobby, sethobbyData] = useState([]);
  const [fa_food, setfoodData] = useState([]);

  const getcategory = async () => {
     try {
      const response_food = await fetch('http://jhk.n-e.kr:8080/test.php?table=favor_ca&co_code=fa_food');
      const response_hobby = await fetch('http://jhk.n-e.kr:8080/test.php?table=favor_ca&co_code=fa_hobby');
      const json_food = await response_food.json();
      const json_hobby = await response_hobby.json();
      sethobbyData(json_hobby.results);
      setfoodData(json_food.results);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  //db접속끝
  
  useEffect(() => {
    getcategory();
  }, []);


  //취미
  const Item_hobby = ({ item, onPress, backgroundColor, textColor }) => (
    <View style={[styles.hobby_checkbox]}>
      <Text>{item.favor_ca_name}</Text>
      <CheckBox
        id = {item.favor_ca_code}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );

  const renderItem_hobby = ({ item }) => {
    var backgroundColor = "white";
    var color = "black";

    if(item.favor_ca_code == selectedId){
        backgroundColor = "white";
        color="black";
    } 

    return (
      <Item_hobby
        item={item}
        onPress={() => setSelectedId(item.favor_ca_code)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  //음식
  const Item_food = ({ item, onPress, backgroundColor, textColor }) => (
    <View style={[styles.hobby_checkbox]}>
      <Text>{item.favor_ca_name}</Text>
      <CheckBox
        id = {item.favor_ca_code}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(newValue) => setToggleCheckBox(newValue)}
      />
    </View>
  );

  const renderItem_food = ({ item }) => {
    
    const backgroundColor = item.isSelected === "Y"? "green" : "white";
    const color = item.isSelected === "Y" ? 'white' : 'black';

    return (
      <Item_food
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  

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
            <View style={{ flex: 1, padding: 24 }}>
              {isLoading ? <ActivityIndicator/> : (
              <FlatList
                data={fa_hobby}
                renderItem={renderItem_hobby}
                keyExtractor={(item) => item.favor_ca_code}
                extraData={selectedId}
              />
              )}
          </View>
            {/* <FlatList
              data={DATA_hobby}
              renderItem={renderItem_hobby}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            /> */}
          </SafeAreaView>
          <SafeAreaView style={styles.container_food}>   
            <FlatList
              data={fa_food}
              renderItem={renderItem_food}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
              horizontal={false}
              numColumns={3}
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


const DATA_food = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "1",
    isSelected: "false",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "2",
    isSelected: "false",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "3",
    isSelected: "false",
  },
];
export default MatchScreen;