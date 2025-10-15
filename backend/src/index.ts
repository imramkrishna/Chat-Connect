import http from "http"
import {WebSocketServer} from "ws"
import ChatManager from "./ChatManager/ChatManager";
import express from "express";
import upload from "./storage/upload";
import {FileUploadMessage} from "./utils/types";
import uploadMulter from "./storage/upload";
const app = express();
const server=app.listen(8000,()=>{
    console.log("Server is running on port 8000")
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

app.get("/", (req, res) => {
    res.send("Server is running for chat connect.")
})
app.post("/api/upload", (req, res) => {
    //file upload api
    const messageDetails:FileUploadMessage=req.body;
    const upload=uploadMulter(messageDetails)
    upload.single("file")(req,res,err=>{
        if(err){
            res.status(500).send("Error uploading file")
        }else{
            res.status(200).send("File uploaded successfully")
        }
    })
})