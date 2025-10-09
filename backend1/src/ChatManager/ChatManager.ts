import type {ChatRoom, Message, User} from "../utils/types";
import type {WebSocket} from "ws";
import Chat from "./Chat";
import {CHAT_CREATED, CHAT_JOINED, CREATE_CHAT, JOIN_CHAT, MESSAGE} from "../utils/message";
import generateRoomId from "../utils/generateRoomId";

class ChatManager{
    public chats:Chat[]
    constructor(){
       this.chats=[];
    }
    messageHandler(socket:WebSocket){
        socket.on("message",(event)=>{
            const message=JSON.parse(event.toString())
            if(message.type===MESSAGE){
                const chatId=message.chatId
                const chat=this.chats.find(c=>c.roomId==chatId)
                if(chat){
                    const newMessage:Message={
                        user:socket,
                        message:message.message,
                        sentTime:new Date(),
                        roomId:chatId
                    }
                    chat.sendMessage(socket,newMessage)
                }
            }
            if(message.type===CREATE_CHAT){
                const chatId=generateRoomId();
                const chat=new Chat(chatId)
                chat.addNewChatUser(socket,message.name)
                this.chats.push(chat)
                socket.send(JSON.stringify({
                    type:CHAT_CREATED,
                    chatId
                }))
            }
            if(message.type===JOIN_CHAT){
                const chatId=message.chatId
                const chat=this.chats.find(c=>c.roomId==chatId)
                if(chat){
                    chat.addNewChatUser(socket,message.name)
                    socket.send(JSON.stringify({
                        type:CHAT_JOINED,
                        chatId,
                        chatUsers:chat.chatUsers,
                        messages:chat.messages
                    }))
                }
            }
        })
    }
}
export default ChatManager