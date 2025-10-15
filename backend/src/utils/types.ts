import type {WebSocket} from "ws"
export interface User{
    user:WebSocket
    id:number
    name:string
    roomId?:string
    joinedTime:Date
    isAdmin:boolean
}
export interface Message{
    user:WebSocket
    userId?:number
    senderName?:string
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
export interface FileUploadMessage{
    user:WebSocket
    userId?:number
    senderName?:string
    fileUrl:string
    fileName:string
    fileType:string
    fileSize:number
    sentTime:Date
    roomId?:string
}
