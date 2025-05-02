// server.js
const WebSocket = require('ws');
const http = require('http');

// Create a basic HTTP server (needed for Render)
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// When a client connects
wss.on('connection', function connection(ws) {
  console.log('🔌 Client connected');

  // When a message is received from a client
  ws.on('message', function incoming(message) {
    console.log('📩 Received:', message.toString());

    // Broadcast to ALL clients (including sender)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ WebSocket server running on port ${PORT}`);
});
