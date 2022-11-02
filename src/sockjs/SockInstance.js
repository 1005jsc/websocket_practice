import sockJS from 'sockjs-client';

import { Stomp } from '@stomp/stompjs';

class ChattingService {
  socket = new sockJS('http://localhost:8080/webSocket');

  stompClient = Stomp.over(socket);

  roomId = '';

  // 방 id 받기

  receiveRoomId = (roomId) => {
    this.roomId = roomId;
  };
  // 웹소켓 연결 요청 & 구독 요청

  onConnect = (
    roomAddress = '/socket/roomId',
    headers = {},
    callback = () => {}
  ) => {
    let newMessage = '';
    // headers에 {} 인증요청 집어 넣기
    this.stompClient.current.connect(headers, () => {
      this.stompClient.current.subscribe(roomAddress, (data) => {
        newMessage = JSON.parse(data.body);
        // 연결 성공시 발동시킬 콜백 넣기
        // 주로 메세지를 받는 로직을 여기에 넣는다
        // 리렌더링
        callback(newMessage);
      });
    });
    return newMessage;
  };

  //

  sendMessage = (messageObject) => {
    stompClient.current.send('/hello', {}, JSON.stringify(messageObject));
  };

  receiveMessage = () => {};

  onDisconnect = () => {
    stompClient.current.disconnect();
    stompClient.current = null;
    console.log('disconnected');
  };
}

export const ChattingServiceKit = new ChattingService();
