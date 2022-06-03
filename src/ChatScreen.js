import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCharsetNumber} from 'mysql/lib/ConnectionConfig';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  //userid token
  const [token, settoken] = useState('');
  //navigation data
  const param_hour = '1'; //route.params.param_hour;
  const param_day = 'Mon'; //route.params.param_day;
  //results
  const [returnMsg, setreturnMsg] = useState([]);

  useEffect(() => {
    //localstorage userid getdata
    AsyncStorage.getItem('token', (err, result) => {
      settoken(result);
      //alert(token);
    });
    chat_fetch();
  }, []);

  const chat_input = async(messages) => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/chat_input.php?userid=' +
          token +
          '&text=' +
          messages +
          '&createdAt = ' +
          new Date() +
          '&selected_hour = ' +
          param_hour +
          '&selected_day = ' +
          param_day,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setreturnMsg(json_table.results); //3 const배열에다가 저장
      if (returnMsg[0].returnMsg == 'success') {
        chat_fetch();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const chat_fetch = async() => {
    try {
      const response_table = await fetch(
        'http://jhk.n-e.kr:80/chat_fetch.php?userid=' +
          token +
          '&selected_hour = ' +
          param_hour +
          '&selected_day = ' +
          param_day,
      ); //1 CURL로 연결(php)
      const json_table = await response_table.json(); //2 json 받아온거 저장
      setMessages(json_table.results); //3 const배열에다가 저장
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //   const onSend1 = useCallback((messages = []) => {
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, messages),
  //     );
  //     console.log(messages);
  //   }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => chat_input(messages)}
      user={{
        _id: token, //유저 이름으로 구별
      }}
    />
  );
};
export default ChatScreen;
