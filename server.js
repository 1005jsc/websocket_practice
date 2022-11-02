// const express = require('express');
// const app = express();

// app.use('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// app.listen(8080);

const WebSocket = require('ws');

// 포트 8081 로 웹소켓 연결하겠다
const socket = new WebSocket.Server({
  port: 8082,
});

// 들어오는 문자를 수신

socket.on('connection', (ws, req) => {
  ws.on('message', (msg) => {
    console.log('유저가 보낸거: ' + msg);
    ws.send('나는 서버: ' + msg);
  });
});
