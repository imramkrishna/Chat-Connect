import express from "express";
import cors from "cors";
import {WebSocketServer} from "ws";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(4000,() => {
  console.log("Server running on port 4000");
});

// Store all connected clients
const clients = new Set();

const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => { 
    // Add this client to our set
    clients.add(ws);
    
    ws.send("Connection is established");
    console.log("Connection is established");
    
    ws.on("message", (data) => {
       try {
        const message = JSON.parse(data);
        console.log("Message received:", message);
        
        switch(message.type) {
          case 'join':
            console.log("User joined:", message.username);
            broadcastMessage({
              type: 'system',
              content: `${message.username} has joined the chat`,
              timestamp: message.timestamp
            }, ws); // Pass the sender
            break;
            
          case 'message':
            console.log(`Message from ${message.username}:`, message.content);
            // Broadcast the message to everyone except sender
            broadcastMessage(message, ws);
            break;
            
          default:
            console.log("Unknown message type:", message.type);
        }
       } catch(e) {
        console.log("Error parsing message:", e);
       }
    });
    
    // Handle client disconnection
    ws.on("close", () => {
      // Remove from clients set when they disconnect
      clients.delete(ws);
      console.log(`Client disconnected. Total connected: ${clients.size}`);
    });
});

// Function to broadcast message to all connected clients except sender
function broadcastMessage(message, sender = null) {
  // Convert message object to JSON string
  const messageString = JSON.stringify(message);
  
  // Send to each connected client except the sender
  clients.forEach((client) => {
    // Skip the sender if provided
    if (sender && client === sender) {
      return; // Skip this iteration
    }
    
    // Check if client connection is still open
    if (client.readyState === client.OPEN) {
      try {
        client.send(messageString);
      } catch (error) {
        console.error("Error sending message to client:", error);
      }
    }
  });
  
  const recipientCount = sender ? clients.size - 1 : clients.size;
  console.log(`Broadcasted message to ${recipientCount} clients`);
}
