import http from "http"
import {WebSocketServer} from "ws"
import ChatManager from "./ChatManager/ChatManager";
import express from "express";
const app = express();
const server=app.listen(8000,()=>{
    console.log("Server is running on port 3000")
});

const wss = new WebSocketServer({ server })
const chatManager = new ChatManager()

wss.on("connection", (ws) => {
    console.log("New Connection Established.")
    chatManager.messageHandler(ws)
    
    ws.on("close", () => {
        console.log("Connection Closed.")
    })
    
    ws.on("error", (err) => {
        console.log("Error in the websocket.", err)
    })
})

server.listen(8000, () => {
    console.log("Server running on port 8000 (HTTP + WebSocket)")
})