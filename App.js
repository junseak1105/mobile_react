import React from "react";

// import things related to React Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// import screens
import MainScreen from "./src/MainScreen";
import MatchScreen from "./src/MatchScreen";
import LoginScreen from "./src/LoginScreen";
import RegisterScreen from "./src/RegisterScreen";
import ChatScreen from "./src/ChatScreen";

// create a "stack"
const MyStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen name="MainScreen" component={MainScreen} />
        <MyStack.Screen name="MatchScreen" component={MatchScreen} />
        <MyStack.Screen name="LoginScreen" component={LoginScreen} />
        <MyStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <MyStack.Screen name="ChatScreen" component={ChatScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default App;