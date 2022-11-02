import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import KeyDetector from './util/KeyDetector';
import SockJS3 from './sockjs/Sockjs3';

function App() {
  const [value, setValue] = useState('');

  // const { socket } = useWebSocket();

  let socket = new WebSocket('ws://localhost:8082');

  socket.onopen = function (e) {
    console.log(
      '[open] 커넥션이 만들어졌습니다. 데이터를 서버에 전송해봅시다.'
    );
    // socket.send('My name is Bora');
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`
      );
    } else {
      // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
      // event.code가 1006이 됩니다.
      console.log('[close] 커넥션이 죽었습니다.');
    }
  };

  socket.onerror = function (error) {
    alert(`[error]`);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    socket.onmessage = (res) => {
      console.log(res.data);
    };

    socket.send(`${value}`);
  };

  const buttonRef = useRef();

  const handleKeyDetector = (keyValue) => {
    if (keyValue === 'Enter') {
      buttonRef.current.click();
    }
  };

  return (
    <div className='App'>
      {/* <button ref={buttonRef} onClick={handleClick}>
        클릭
      </button>

      <input value={value} onChange={handleChange}></input> */}

      <KeyDetector sendKeyValue={handleKeyDetector} />

      <h1>sockjs로 채팅구현하기</h1>

      <SockJS3 />
    </div>
  );
}

export default App;
