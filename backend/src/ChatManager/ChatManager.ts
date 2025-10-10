import type {ChatRoom, Message, User} from "../utils/types";
import type {WebSocket} from "ws";
import Chat from "./Chat";
import {
    CHAT_CREATED,
    CHAT_JOINED,
    CREATE_CHAT,
    INVALID_CREDENTIALS,
    JOIN_CHAT,
    LEAVE_CHAT,
    MESSAGE, NEW_USER_JOINED
} from "../utils/message";
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
                chat.addNewChatUser(socket,message.name,true)
                chat.setRoomName(message.roomName)
                this.chats.push(chat)
                socket.send(JSON.stringify({
                    type:CHAT_CREATED,
                    chatId,
                    chatUsers:chat.chatUsers,
                    messages:chat.messages,
                    name:chat.name,
                    createdAt:chat.createdAt
                }))
            }
            if(message.type===JOIN_CHAT){
                const chatId=message.chatId
                const chat=this.chats.find(c=>c.roomId==chatId)

                if(chat){
                    chat.addNewChatUser(socket,message.name)
                    chat.chatUsers.forEach(user=>{
                        if(user.user===socket){
                            socket.send(JSON.stringify({
                                type:CHAT_JOINED,
                                chatId,
                                chatUsers:chat.chatUsers,
                                messages:chat.messages,
                                name:chat.name,
                                createdAt:chat.createdAt
                            }))
                        }else{
                            user.user.send(JSON.stringify({
                                type:NEW_USER_JOINED,
                                user
                            }))
                        }
                    })
                }else{
                    socket.send(JSON.stringify({
                        type:INVALID_CREDENTIALS
                    }))
                }
            }
        })
    }
}
export default ChatManager