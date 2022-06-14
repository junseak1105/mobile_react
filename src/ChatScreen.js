import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCharsetNumber} from 'mysql/lib/ConnectionConfig';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const [customText, setcustomText] = useState();

  //navigation data
  const token = route.params.token;
  const user1_id = route.params.user1_id;
  const user2_id = route.params.user2_id;
  const param_hour = route.params.param_hour;
  const param_day = route.params.param_day;
  //results
  const [returnMsg, setreturnMsg] = useState([]);
  const [loading, setLoading] = useState(false); // clean up

  useEffect(() => {
    chat_fetch();
  }, []);

  const chat_input = async () => {
    setLoading(true);
    let now = new Date();
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/chat_input.php?userID=' +
          token +
          '&user1_id=' +
          user1_id +
          '&user2_id=' +
          user2_id +
          '&text=' +
          customText +
          '&createdAt=' +
          now.toISOString() +
          '&selected_hour=' +
          param_hour +
          '&selected_day=' +
          param_day,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setreturnMsg(json_table.results); //3 const배열에다가 저장
      chat_fetch();
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };
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
      setLoading(false);
    }
  };
  //   const onSend = useCallback((messages = []) => {
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messages),
  //     );
  //     console.log(messages);
  //   }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => chat_input()}
      user={{
        _id: token, //유저 이름으로 구별
      }}
      text={customText}
      onInputTextChanged={text => setcustomText(text)}
    />
  );
};
export default ChatScreen;
