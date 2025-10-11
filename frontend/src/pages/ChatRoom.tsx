import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import {MESSAGE, NEW_USER_JOINED} from '../messages/message';
import type {Message, User} from "../types.tsx";
const ChatRoom = () => {
    const socket=useSocket();
    const location = useLocation();
    const {chatId,chatUsers,chatName,chatMessages,createdAt}=location.state || {}
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(chatMessages);
    const [users,setUsers]=useState(chatUsers)

    const handleSend = () => {
        socket?.send(JSON.stringify({
            type:MESSAGE,
            chatId:chatId,
            message:message
        }))  
    };
    useEffect(()=>{
        if(!socket) return;
        socket.onmessage=(messageEvent:MessageEvent)=>{
            const message=JSON.parse(messageEvent.data);
            switch(message.type){
                case MESSAGE:
                    { const newMessage:Message={
                        user:message.senderSocket,
                        message:message.message,
                        roomId:message.chatId,
                        sentTime:message.sentTime,
                    }
                    setMessages((prevMessages:Message[])=>[...prevMessages,newMessage])
                    break; }
                case NEW_USER_JOINED:
                {
                    const length = message.chatUsers.length()

                    setUsers((prevUsers:User[])=>[...prevUsers,message.chatUsers[length-1]])
                    break;
                }
                default:
                    console.log("Unknown message type:", message);
            }
        }
    },[socket])
    return (
        <div className="flex h-screen bg-slate-950">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex flex-col p-6">
                <h2 className="text-xl font-bold text-white mb-6">Members</h2>
                <ul className="space-y-4">
                    {users.map((user:any) => (
                        <li key={user.id} className="flex items-center gap-3">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border-2 border-indigo-500 shadow"
                            />
                            <span className="text-slate-200 font-medium">{user.name}</span>
                            {
                                user.isAdmin && (
                                    <span className="text-slate-200 bg-green-300 flex justify-center items-center mt-1 font-medium px-1 rounded-full">admin</span>
                                )
                            }
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col">
                {/* Room Info */}
                <div className="px-8 py-6 border-b border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{chatName}</h1>
                        <p className="text-slate-400 text-sm">Room ID: <span className="font-mono text-indigo-400">{chatId}</span></p>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow">
                            Invite
                        </button>
                        <button className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg font-semibold border border-slate-700 hover:bg-slate-700 transition-all">
                            Leave Room
                        </button>
                        <span className="text-slate-400 text-sm">Room Created At : {createdAt}</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-8 py-6 bg-slate-950">
                    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
                        {messages.map((msg:any) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-lg ${msg.sender === 'You'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md'
                                            : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold text-indigo-300">{msg.sender}</span>
                                        <span className="text-xs text-slate-400">{msg.time}</span>
                                    </div>
                                    <div className="text-base font-medium">{msg.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className="px-8 py-6 bg-slate-900 border-t border-slate-800 flex items-center gap-4">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>
                </div>
            </main>
        </div>
    );
};

export default ChatRoom;
