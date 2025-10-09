Chat-Connect Backend — WebSocket Testing with Hoppscotch

This backend exposes a simple WebSocket chat protocol on ws://localhost:8000.
You can test it easily using Hoppscotch (or any WebSocket client).

Prerequisites
- Node.js 18+ installed
- Dependencies installed (npm install)

Running the server
- Build (if needed): npx tsc
- Start: node dist/index.js
  - Alternatively, if you run directly with ts-node (not included by default): npx ts-node src/index.ts

WebSocket URL
- ws://localhost:8000

Message protocol
Incoming (client -> server) message types (JSON):
- create_chat
  - Example:
    {
      "type": "create_chat",
      "name": "Alice"
    }
  - Response:
    {
      "type": "chat_created",
      "chatId": "<generated-room-id>"
    }

- join_chat
  - Example:
    {
      "type": "join_chat",
      "chatId": "<room-id-from-chat_created>",
      "name": "Bob"
    }
  - Response:
    {
      "type": "chat_joined",
      "chatId": "<room-id>",
      "chatUsers": [
        { "name": "Alice", "roomId": "<room-id>", "joinedTime": "...", "isAdmin": false, /* user socket omitted */ },
        { "name": "Bob",   "roomId": "<room-id>", "joinedTime": "...", "isAdmin": false }
      ],
      "messages": []
    }

- message
  - Example:
    {
      "type": "message",
      "chatId": "<room-id>",
      "message": "Hello everyone!"
    }
  - Broadcast response to all users in the room:
    {
      "type": "MESSAGE", // Note: uppercase in server responses
      "message": "Hello everyone!",
      "chatId": "<room-id>",
      "senderName": "Alice",
      "senderSocket": {}, // internal socket reference
      "sentTime": "2025-10-09T15:42:00.000Z"
    }

Note about type casing
- Incoming actions are lowercase (create_chat, join_chat, message)
- Outgoing broadcast uses uppercase "MESSAGE" as currently implemented

How to test with Hoppscotch
1) Open Hoppscotch → WebSocket tab
2) Enter URL: ws://localhost:8000 and click Connect
3) Create a chat room
   - Send payload:
     { "type": "create_chat", "name": "Alice" }
   - Copy the chatId from the chat_created response
4) Join the chat from another Hoppscotch tab/window
   - Open a second WebSocket connection to ws://localhost:8000
   - Send:
     { "type": "join_chat", "chatId": "<copied-chat-id>", "name": "Bob" }
   - You should receive chat_joined with current users and messages
5) Send a message
   - From either client, send:
     { "type": "message", "chatId": "<copied-chat-id>", "message": "Hi!" }
   - Both tabs should receive a broadcast with type "MESSAGE"

Troubleshooting
- If you don’t see responses, ensure the server printed "New Connection Established." in the console
- Verify JSON is valid and includes the correct type and chatId fields
- Ensure both clients are connected to the same server and room id

Implementation notes
- The server wires the ChatManager message handler on connection in src/index.ts
- Message/action constants are defined in src/utils/message.ts
- Chat and room logic lives in src/ChatManager
