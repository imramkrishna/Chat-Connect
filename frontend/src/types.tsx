export interface Message{
    user:WebSocket,
    userId?:number
    message:string
    sentTime:Date
    roomId:string
    file?:FileUploadMessage
    senderName?:string
}
export interface User{
    user:WebSocket
    id:number
    name:string
    roomId?:string
    joinedTime:Date
    isAdmin:boolean
    avatar?:string
}
export interface FileUploadMessage{
    fileName:string
    originalName?:string
    mimeType?:string
    size?:number
}