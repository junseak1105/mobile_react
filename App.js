import React from "react";

// import things related to React Navigation
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// import screens
import MainScreen from "./src/MainScreen";
import MatchScreen from "./src/MatchScreen";

// create a "stack"
const MyStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen name="MainScreen" component={MainScreen} />
        <MyStack.Screen name="match" component={MatchScreen} />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default App;