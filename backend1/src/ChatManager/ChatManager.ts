import type {ChatRoom, Message, User} from "../utils/types.js";
import type {WebSocket} from "ws";
import Chat from "./Chat.js";
import {CHAT_CREATED, CREATE_CHAT, JOIN_CHAT, MESSAGE} from "../utils/message.js";
import generateRoomId from "../utils/generateRoomId.js";

class ChatManager{
    public chats:Chat[]
    constructor(){
       this.chats=[];
    }
    messageHandler(socket:WebSocket){
        socket.on("message",(event)=>{
            const message=JSON.parse(event.toString())
            switch(message.type){
                case MESSAGE:
                    break;
                case CREATE_CHAT:
                    const chatId=generateRoomId();
                    const chat=new Chat(chatId)
                    const newUser:User={
                        user:socket,
                        name:message.name,
                        roomId:chatId,
                        joinedTime:new Date(),
                        isAdmin:true
                    }
                    chat.addNewChatUser(newUser)
                    this.chats.push(chat)
                    socket.send(JSON.stringify({
                        type:CHAT_CREATED,
                        chatId
                    }))
                    break;
                case JOIN_CHAT:
                    const chatId=message.chatId;
                    const chat=this.chats.find(c=>c.roomId===chatId)
                    break;

            }
        })
    }
}
export default ChatManager