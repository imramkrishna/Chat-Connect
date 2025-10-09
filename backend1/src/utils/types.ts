import type {WebSocket} from "ws"
export interface User{
    user:WebSocket
    name:string
    roomId?:string
    joinedTime:Date
    isAdmin:boolean
}
export interface Message{
    user:WebSocket
    message:string
    sentTime:Date
    roomId?:string
}
export interface ChatRoom{
    roomId:string
    players:User[]
    Messages:Message[]
    name?:string
    createdAt:Date
}