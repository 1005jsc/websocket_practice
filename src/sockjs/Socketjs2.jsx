import { useEffect, useState } from 'react';

import sockJS from 'sockjs-client';

import { Stomp } from '@stomp/stompjs';

let socket = new sockJS('http://localhost:8080/webSocket');
let stompClient = Stomp.over(socket);
// stompClient.debug = () => {};

const SockJS2 = ({}) => {
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/roomId', (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, [contents]);

  const handleSend = () => {
    const newMessage = { username, message };
    stompClient.send('/hello', {}, JSON.stringify(newMessage));
    setMessage('');
  };

  const addMessage = (message) => {
    setContents((prev) => [...prev, message]);
  };

  return (
    <div className={'container'}>
      {/* <ChatPresenter
      contents={contents}
      handleEnter={handleSend}
      message={message}
      setMessage={setMessage}
      username={username}
      setUsername={setUsername}
      /> */}
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder='username'
      />
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder='message'
      />
      <button onClick={handleSend}>보내기</button>
      {console.log(contents)}
      {console.log(username)}
      {console.log(message)}
    </div>
  );
};
export default SockJS2;
