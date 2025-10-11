import { MESSAGE } from "../utils/message";
import type {Message, User} from "../utils/types";
import type {WebSocket} from "ws";
export class Chat{
    public chatUsers:User[]
    public messages:Message[]
    public roomId:string
    public name?:string
    public createdAt:Date
    private userIdCounter:number
    constructor(roomId:string){
        this.roomId=roomId;
        this.chatUsers=[]
        this.messages=[]
        this.createdAt=new Date()
        this.userIdCounter=0
    }
    addNewChatUser(socket:WebSocket,name:string,isAdmin?:boolean){
        this.userIdCounter++
        const newUser={
            user:socket,
            id:this.userIdCounter,
            name:name,
            roomId:this.roomId,
            joinedTime:new Date(),
            isAdmin:isAdmin || false
        }
        this.chatUsers.push(newUser)
        return newUser
    }
    setRoomName(name:string){
        this.name=name
    }
    removeChatUser(user:WebSocket) {
        const filteredUsers = this.chatUsers.filter(u => u.user != user)
        this.chatUsers = []
        this.chatUsers = filteredUsers
    }
    findChatUser(socket:WebSocket):User | undefined{
        const user=this.chatUsers.find(u=>u.user==socket)
        return user;
    }
    findChatUserById(userId:number):User | undefined{
        return this.chatUsers.find(u=>u.id === userId)
    }
    removeChatUserById(userId:number) {
        const filteredUsers = this.chatUsers.filter(u => u.id !== userId)
        this.chatUsers = []
        this.chatUsers = filteredUsers
    }
    sendMessage(socket:WebSocket,message:Message){
        const user=this.findChatUser(socket)
        if(user){
            // Store message with senderName and userId so it persists
            const storedMessage = {
                ...message,
                userId: user.id,
                senderName: user.name
            }
            this.messages.push(storedMessage)
            
            this.chatUsers.forEach(u=>{
                    u.user.send(JSON.stringify({
                        type:MESSAGE,
                        message:message.message,
                        chatId:message.roomId,
                        senderName:user.name,
                        userId:user.id,
                        sentTime:message.sentTime
                    }))
            })
        }
    }
}
export default Chat