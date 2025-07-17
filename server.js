const WebSocket = require("ws");

// إنشاء سيرفر WebSocket على المنفذ 3000
const server = new WebSocket.Server({ port: 3000 });

let clients = [];

server.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (msg) => {
    const messageText = msg.toString(); // تحويل Buffer إلى نص
    console.log("وصلت رسالة:", messageText);

    // إرسال الرسالة لكل الأطراف، بما فيهم المرسل
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageText);
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("سيرفر WebSocket يعمل على ws://localhost:3000");
