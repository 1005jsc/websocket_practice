import React from 'react';
import SockJS from 'sockjs-client';
import StompJs from '@stomp/stompjs';

const Sockjs = ({}) => {
  const client = new StompJs.Client({
    brokerURL: 'ws://서버주소',
    connectHeaders: {
      login: 'user',
      passcode: 'password',
    },
    debug: function (str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  client.onConnect = function (frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
  };

  client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  client.activate();

  client.publish({
    destination: '/topic/general',
    body: 'Hello world',
    headers: { priority: '9' },
  });

  // *v5부턴 바이너리 메세지 전송도 지원된다고 하네요! (header에 'content-type': 'application/octet-stream')로 contentType을 써줍니다.)

  const binaryData = generateBinaryData();
  client.publish({
    destination: '/topic/special',
    binaryBody: binaryData,
    headers: { 'content-type': 'application/octet-stream' },
  });

  return (
    <>
      <div>hi</div>
    </>
  );
};
export default Sockjs;
