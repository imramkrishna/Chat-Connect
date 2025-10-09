import {WebSocketServer} from "ws"
import ChatManager from "./ChatManager/ChatManager";
const wss = new WebSocketServer({ port: 8000 })
const chatManager = new ChatManager()
wss.on("connection", (ws) => {
    console.log("New Connection Established.")
    // Wire ChatManager's message handler so clients (e.g., Hoppscotch) can use the protocol
    chatManager.messageHandler(ws)
    ws.on("close", () => {
        // websocket close logic
        console.log("Websocket connection closed.")
    })
    ws.on("error", (err) => {
        // websocket error logic
        console.log("Error in the websocket.", err)
    })
})