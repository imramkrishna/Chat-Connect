import type {Message, User} from "../utils/types.js";
import type {WebSocket} from "ws";
export class Chat{
    public chatUsers:User[]
    private messages:Message[]
    public roomId:String
    constructor(roomId:String){
        this.roomId=roomId;
        this.chatUsers=[]
        this.messages=[]
    }
    addNewChatUser(user:User){
        this.chatUsers.push(user)
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
    sendMessage(socket:WebSocket,message:String){

    }
}
export default Chat