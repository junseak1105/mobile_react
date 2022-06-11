import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  // CheckBox,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCharsetNumber} from 'mysql/lib/ConnectionConfig';
// import {getDatabase, get, ref, onVlaue} from 'react-native-firebase/database';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);

  // const [customText, setcustomText] = useState();

  // //navigation data
  const token = route.params.token;
  const user1_id = route.params.user1_id;
  const user2_id = route.params.user2_id;
  const param_hour = route.params.param_hour;
  const param_day = route.params.param_day;

  useEffect(() => {
    chat_fetch();
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,

          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });

    return () => unsubscribe();
  }, []);

  const chat_fetch = async () => {
    console.log(
      'http://jhk.n-e.kr:80/chat_fetch.php?userID=' +
        token +
        '&user1_id=' +
        user1_id +
        '&user2_id=' +
        user2_id +
        '&selected_hour=' +
        param_hour +
        '&selected_day=' +
        param_day,
    );
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/chat_fetch.php?userID=' +
          token +
          '&user1_id=' +
          user1_id +
          '&user2_id=' +
          user2_id +
          '&selected_hour=' +
          param_hour +
          '&selected_day=' +
          param_day,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      //console.log(json_table);
      setMessages(json_table.results); //3 const배열에다가 저장
      //console.log(messages);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
    console.log(messages);
  }, []);

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: token,
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </>
  );
  const styles = StyleSheet.create({});
};
export default ChatScreen;
