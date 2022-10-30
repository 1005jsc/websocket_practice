import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import KeyDetector from './util/KeyDetector';

function App() {
  const [value, setValue] = useState();

  let socket = new WebSocket('ws://localhost:8082');
  console.log(socket);

  socket.onopen = function (e) {
    console.log(
      '[open] 커넥션이 만들어졌습니다. 데이터를 서버에 전송해봅시다.'
    );
    socket.send('My name is Bora');
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      alert(
        `[close] 커넥션이 정상적으로 종료되었습니다(code=${event.code} reason=${event.reason})`
      );
    } else {
      // 예시: 프로세스가 죽거나 네트워크에 장애가 있는 경우
      // event.code가 1006이 됩니다.
      alert('[close] 커넥션이 죽었습니다.');
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
    console.log(value);
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
      <button ref={buttonRef} onClick={handleClick}>
        클릭
      </button>

      <input value={value} onChange={handleChange}></input>

      <KeyDetector sendKeyValue={handleKeyDetector} />
    </div>
  );
}

export default App;
