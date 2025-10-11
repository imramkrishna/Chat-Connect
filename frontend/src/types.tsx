export interface Message{
    user:WebSocket,
    userId?:number
    message:string
    sentTime:Date
    roomId:string
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