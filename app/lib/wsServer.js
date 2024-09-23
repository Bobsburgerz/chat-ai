// wsServer.js
const WebSocket = require('ws'); // Use CommonJS syntax

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received message:', message);
    ws.send(`Hello, you sent -> ${message}`);
  });
});

console.log('WebSocket server running on ws://localhost:8080');
