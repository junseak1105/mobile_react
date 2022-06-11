import React from 'react';
// import things related to React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import screens
import MainScreen from './src/MainScreen';
import MatchScreen from './src/MatchScreen';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import ChatScreen from './src/ChatScreen';

// import {TailwindProvider, tailwind} from 'tailwind-rn';
// import utilities from './tailwind.json';
// import {style as tw} from 'tailwind-react-native-classnames';

// create a "stack"
const MyStack = createNativeStackNavigator();

// // firebase
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBVDkSExWDgCvrTGJoGElTUPn_tNfL-nX4',
  authDomain: 'mobileprogram-e7cbf.firebaseapp.com',
  databaseURL: 'https://mobileprogram-e7cbf-default-rtdb.firebaseio.com',
  projectId: 'mobileprogram-e7cbf',
  storageBucket: 'mobileprogram-e7cbf.appspot.com',
  messagingSenderId: '224863518305',
  appId: '1:224863518305:web:ebd71921577c17cd837420',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const App = () => {
  return (
    <NavigationContainer>
      <MyStack.Navigator screenOptions={{headerShown: false}}>
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
