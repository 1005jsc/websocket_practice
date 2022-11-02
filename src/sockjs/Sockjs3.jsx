import { useEffect, useState } from 'react';

import sockJS from 'sockjs-client';

import { Stomp } from '@stomp/stompjs';
import { ChattingServiceKit } from './SockInstance';
import { useDispatch, useSelector } from 'react-redux';
import { chatActions } from '../redux/modules/chatSlice';

// stompClient.debug = () => {};

const SockJS3 = ({}) => {
  const [contents, setContents] = useState([]);
  const { messageList, chatOnChange } = useSelector((state) => state.chat);
  const { addMessage, resetChatOnChange } = chatActions;

  const dispatch = useDispatch();

  const [messageObject, setMessageObject] = useState({
    userName: '',
    message: '',
  });

  // 메세지를 받는 것 이제 짜면 됨

  // 가장 기본적인 속js연결 headers에 토큰없이 해봄

  //

  // 컴포넌트가 닫힐때 연결을 끝는다
  useEffect(() => {
    // if (ChattingServiceKit.stompClient.current) {
    //   ChattingServiceKit.onDisconnect();
    // }

    setContents([
      ...contents,
      ChattingServiceKit.onConnect('socket/roomId', {}, (newMessage) => {
        console.log(newMessage);

        dispatch(addMessage(newMessage));
      }),
    ]);

    if (chatOnChange) {
      setContents([...messageList]);
      dispatch(resetChatOnChange());
    }

    return () => {
      ChattingServiceKit.onDisconnect();
    };
  }, [dispatch, chatOnChange]);

  const handleSend = () => {
    ChattingServiceKit.sendMessage(messageObject);
  };

  const onInputClick = (e) => {
    const { name, value } = e.target;
    setMessageObject({
      ...messageObject,
      [name]: value,
    });
  };

  return (
    <div className={'container'}>
      <input
        value={messageObject.userName}
        name='username'
        onChange={onInputClick}
        placeholder='username'
      />
      <input
        value={messageObject.message}
        name='message'
        onChange={onInputClick}
        placeholder='message'
      />
      <button onClick={handleSend}>보내기</button>

      <h1>state의 contents들</h1>

      {contents &&
        contents.map((val, index) => {
          return <h3 key={index}>{val}</h3>;
        })}

      <h1>redux의 contents들</h1>

      {messageList &&
        messageList.map((val, index) => {
          return <h3 key={index}>{val}</h3>;
        })}
    </div>
  );
};
export default SockJS3;
