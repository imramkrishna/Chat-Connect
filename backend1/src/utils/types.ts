import type {WebSocket} from "ws"
export interface User{
    user:WebSocket
    name:string
    roomId?:String
    joinedTime:Date
    isAdmin:boolean
}
export interface Message{
    user:WebSocket
    message:String
    sentTime:Date
    roomId?:String
}
export interface ChatRoom{
    roomId:String
    players:User[]
    Messages:Message[]
    createdAt:Date
}