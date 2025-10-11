import { MESSAGE } from "../utils/message";
import type {Message, User} from "../utils/types";
import type {WebSocket} from "ws";
export class Chat{
    public chatUsers:User[]
    public messages:Message[]
    public roomId:string
    public name?:string
    public createdAt:Date
    constructor(roomId:string){
        this.roomId=roomId;
        this.chatUsers=[]
        this.messages=[]
        this.createdAt=new Date()
    }
    addNewChatUser(socket:WebSocket,name:string,isAdmin?:boolean){
        const newUser={
            user:socket,
            name:name,
            roomId:this.roomId,
            joinedTime:new Date(),
            isAdmin:isAdmin || false
        }
        this.chatUsers.push(newUser)
    }
    setRoomName(name:string){
        this.name=name
    }
    removeChatUser(user:User) {
        const filteredUsers = this.chatUsers.filter(u => u != user)
        this.chatUsers = []
        this.chatUsers = filteredUsers
    }
    findChatUser(socket:WebSocket):User | undefined{
        const user=this.chatUsers.find(u=>u.user==socket)
        return user;
    }
    sendMessage(socket:WebSocket,message:Message){
        const user=this.findChatUser(socket)
        if(user){
            this.messages.push(message)
            this.chatUsers.forEach(u=>{
                    u.user.send(JSON.stringify({
                        type:MESSAGE,
                        message:message.message,
                        chatId:message.roomId,
                        senderName:user.name,
                        senderSocket:u.user,
                        sentTime:message.sentTime
                    }))
            })
        }
    }
}
export default Chat