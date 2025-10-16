import type {WebSocket} from "ws"
export interface User{
    user:WebSocket
    id:number
    name:string
    roomId?:string
    joinedTime:Date
    isAdmin:boolean
}
interface FileUploadMessage{
    fileName:string
    originalName?:string
    mimeType?:string
    size?:number
}
export interface Message{
    user:WebSocket
    userId?:number
    senderName?:string
    message:string
    sentTime:Date
    File?:FileUploadMessage
    roomId?:string
}
export interface ChatRoom{
    roomId:string
    players:User[]
    Messages:Message[]
    name?:string
    createdAt:Date
}
