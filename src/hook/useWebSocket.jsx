import React from 'react';

const useWebSocket = ({}) => {
  let socket = new WebSocket('ws://localhost:8082');

  socket.onopen = function (e) {
    console.log(
      '[open] 커넥션이 만들어졌습니다. 데이터를 서버에 전송해봅시다.'
    );
    socket.send('My name is Bora');
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

  return { socket };
};
export default useWebSocket;
