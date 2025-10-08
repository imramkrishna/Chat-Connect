import {WebSocketServer} from "ws"
import ChatManager from "./ChatManager/ChatManager.js";
const wss =new WebSocketServer({port:8000})
wss.on("connection",ws=>{
    const chatManager=new ChatManager()
    ws.on("message",message=>{
        console.log("Received New Message  : ",message)
    })
    ws.on("open",()=>{
        //websocket open logic
        console.log("New Client Connected.")
    })
    ws.on("close",()=>{
        //websocket close logic
        console.log("Websocket connection closed.")
    })
    ws.on("error",()=>{
        //websocket error logic
        console.log("Error in the websocket.")
    })
})