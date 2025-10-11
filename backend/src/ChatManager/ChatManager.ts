import type {ChatRoom, Message, User} from "../utils/types";
import type {WebSocket} from "ws";
import Chat from "./Chat";
import {
    CHAT_CREATED,
    CHAT_JOINED,
    CREATE_CHAT,
    INVALID_CREDENTIALS,
    JOIN_CHAT, KICK_OUT,
    LEAVE_CHAT,
    MESSAGE, NEW_USER_JOINED, USER_LEFT, USER_REMOVED
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
                const newUser = chat.addNewChatUser(socket,message.name,true)
                chat.setRoomName(message.roomName)
                this.chats.push(chat)
                socket.send(JSON.stringify({
                    type:CHAT_CREATED,
                    chatId,
                    chatUsers:chat.chatUsers,
                    messages:chat.messages,
                    name:chat.name,
                    createdAt:chat.createdAt,
                    currentUser:newUser
                }))
            }
            if(message.type===JOIN_CHAT){
                const chatId=message.chatId
                const chat=this.chats.find(c=>c.roomId==chatId)

                if(chat){
                    const newUser = chat.addNewChatUser(socket,message.name)
                    chat.chatUsers.forEach(user=>{
                        if(user.user===socket){
                            socket.send(JSON.stringify({
                                type:CHAT_JOINED,
                                chatId,
                                chatUsers:chat.chatUsers,
                                messages:chat.messages,
                                name:chat.name,
                                createdAt:chat.createdAt,
                                currentUser:newUser
                            }))
                        }else{
                            user.user.send(JSON.stringify({
                                type:NEW_USER_JOINED,
                                chatUsers:chat.chatUsers
                            }))
                        }
                    })
                }else{
                    socket.send(JSON.stringify({
                        type:INVALID_CREDENTIALS
                    }))
                }
            }
            if(message.type===USER_LEFT){
                const chatId=message.chatId
                const chat=this.chats.find(c=>c.roomId==chatId)
                const user=chat?.findChatUser(socket)
                if(chat){
                    chat.removeChatUser(socket)
                    chat.chatUsers.forEach(user=>{
                        user.user.send(JSON.stringify({
                            type:USER_LEFT,
                            chatId,
                            userName:user.name,
                            user:user,
                            leftAt:new Date()
                        }))
                    })
                }
            }
            if(message.type===KICK_OUT){
                const chatId=message.chatId
                const chat=this.chats.find(c=>c.roomId==chatId)
                const user=chat?.findChatUser(socket)
                const removeUserId=message.removeUserId
                const removeUser=chat?.findChatUserById(removeUserId)
                if(chat && removeUser){
                    if(user?.isAdmin){
                        // Notify the removed user
                        removeUser.user.send(JSON.stringify({
                            type:USER_REMOVED,
                            name:removeUser.name,
                            userId:removeUser.id,
                            removedAt:new Date(),
                            message: "You have been removed from the chat"
                        }))
                        
                        // Remove the user
                        chat.removeChatUserById(removeUserId)
                        
                        // Notify all remaining users
                        chat.chatUsers.forEach(u=>{
                            u.user.send(JSON.stringify({
                                type:USER_REMOVED,
                                name:removeUser.name,
                                userId:removeUser.id,
                                users:chat.chatUsers,
                                removedAt:new Date()
                            }))
                        })
                    }
                }
            }
        })
    }
}
export default ChatManager