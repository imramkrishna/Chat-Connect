export interface Message{
    user:WebSocket,
    message:string
    sentTime:Date
    roomId:string
}
export interface User{
    user:WebSocket
    name:string
    roomId?:string
    joinedTime:Date
    isAdmin:boolean
}