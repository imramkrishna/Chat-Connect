import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocket } from '../hooks/useSocket';
import {MESSAGE, NEW_USER_JOINED, USER_LEFT, KICK_OUT, USER_REMOVED} from '../messages/message';
import type {Message, User} from "../types.tsx";

interface SystemMessage {
    type: 'system';
    message: string;
    time: Date;
}
const ChatRoom = () => {
    const socket=useSocket();
    const location = useLocation();
    const {chatId,chatUsers,chatName,chatMessages,createdAt,currentUser}=location.state || {}
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(chatMessages || []);
    const [users,setUsers]=useState<User[]>(chatUsers || [])
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [currentUserName, setCurrentUserName] = useState<string>(currentUser?.name || '');
    const [currentUserId, setCurrentUserId] = useState<number>(currentUser?.id || 0);
    const [isAdmin, setIsAdmin] = useState<boolean>(currentUser?.isAdmin || false);

    // Generate initials for avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    
    // Generate random color based on name
    const getAvatarColor = (name: string) => {
        const colors = [
            'bg-indigo-600',
            'bg-purple-600',
            'bg-blue-600',
            'bg-pink-600',
            'bg-rose-600',
            'bg-emerald-600',
            'bg-teal-600',
            'bg-cyan-600',
            'bg-amber-600',
            'bg-orange-600'
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const handleSend = () => {
        if (!message.trim()) return;
        socket?.send(JSON.stringify({
            type:MESSAGE,
            chatId:chatId,
            message:message
        }))
        setMessage('');
    };

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(chatId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    useEffect(() => {
        // Update current user info from users list when it changes
        const currentUserInList = users?.find((u: User) => u.id === currentUserId);
        if (currentUserInList && currentUserId !== 0) {
            setCurrentUserName(currentUserInList.name);
            setIsAdmin(currentUserInList.isAdmin);
        }
    }, [users, currentUserId]);

    // Track user joins and leaves
    useEffect(() => {
        if (!users || users.length === 0) return;

        const prevUserNames = new Set(chatUsers?.map((u: User) => u.name) || []);
        const currentUserNames = new Set(users.map((u: User) => u.name));

        // Check for new users
        users.forEach((user: User) => {
            if (!prevUserNames.has(user.name) && user.name !== currentUserName) {
                const systemMsg: SystemMessage = {
                    type: 'system',
                    message: `${user.name} joined the chat`,
                    time: new Date()
                };
                setMessages((prev: any) => [...prev, systemMsg]);
            }
        });
        
        // Check for left users
        chatUsers?.forEach((user: User) => {
            if (!currentUserNames.has(user.name) && user.name !== currentUserName) {
                const systemMsg: SystemMessage = {
                    type: 'system',
                    message: `${user.name} left the chat`,
                    time: new Date()
                };
                setMessages((prev: any) => [...prev, systemMsg]);
            }
        });
    }, [users]);

    useEffect(()=>{
        if(!socket) return;
        socket.onmessage=(messageEvent:MessageEvent)=>{
            const message=JSON.parse(messageEvent.data);
            console.log("Received message:", message);
            switch(message.type){
                case MESSAGE:
                    { const newMessage:Message={
                        user:message.senderSocket,
                        userId:message.userId,
                        message:message.message,
                        roomId:message.chatId,
                        sentTime:message.sentTime,
                        senderName:message.senderName
                    }
                    setMessages((prevMessages:Message[])=>[...prevMessages,newMessage])
                    break; }
                case NEW_USER_JOINED:
                {
                    console.log("New user joined:", message.chatUsers);
                    const prevCount = users.length;
                    const newCount = message.chatUsers.length;
                    
                    // Add system message for new user
                    if (newCount > prevCount && message.chatUsers.length > 0) {
                        const newUser = message.chatUsers[message.chatUsers.length - 1];
                        if (newUser.name !== currentUserName) {
                            const systemMsg: SystemMessage = {
                                type: 'system',
                                message: `${newUser.name} joined the chat`,
                                time: new Date()
                            };
                            setMessages((prev: any) => [...prev, systemMsg]);
                        }
                    }
                    
                    setUsers(message.chatUsers);
                    break;
                }
                case USER_LEFT:
                {
                    console.log("User left:", message.userName);
                    const systemMsg: SystemMessage = {
                        type: 'system',
                        message: `${message.userName} left the chat`,
                        time: new Date()
                    };
                    setMessages((prev: any) => [...prev, systemMsg]);
                    setUsers(message.chatUsers);
                    break;
                }
                case USER_REMOVED:
                {
                    console.log("User removed:", message.name);
                    const systemMsg: SystemMessage = {
                        type: 'system',
                        message: `${message.name} was removed from the chat`,
                        time: new Date()
                    };
                    setMessages((prev: any) => [...prev, systemMsg]);
                    setUsers(message.users);
                    break;
                }
                default:
                    console.log("Unknown message type:", message);
            }
        }
    },[socket, users, currentUserName, currentUserId])
    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            {/* Sidebar */}
            <aside className={`${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 w-80 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 flex-shrink-0 flex-col h-full transition-transform duration-300 ease-in-out shadow-2xl`}>
                {/* Sidebar Header */}
                <div className="p-6 border-b border-slate-800/50 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Members
                        </h2>
                        <button 
                            onClick={() => setShowMobileMenu(false)}
                            className="md:hidden text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-slate-400 text-sm">{users.length} {users.length === 1 ? 'member' : 'members'} online</p>
                </div>

                {/* Members List */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <ul className="space-y-3">
                        {users.map((user:any, index:number) => (
                            <li key={user.id || index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all duration-200 border border-slate-700/50 hover:border-indigo-500/30 group">
                                <div className="relative">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-12 h-12 rounded-full border-2 border-indigo-500 shadow-lg group-hover:scale-105 transition-transform"
                                        />
                                    ) : (
                                        <div className={`w-12 h-12 rounded-full ${getAvatarColor(user.name)} border-2 border-indigo-500 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center text-white font-bold text-base`}>
                                            {getInitials(user.name)}
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-200 font-semibold truncate">{user.name}</span>
                                        {user.isAdmin && (
                                            <span className="text-xs text-emerald-900 bg-emerald-400 px-2 py-0.5 rounded-full font-bold shadow-sm">
                                                ADMIN
                                            </span>
                                        )}
                                        {user.id === currentUserId && (
                                            <span className="text-xs text-blue-400 font-medium">(You)</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500">Active now</span>
                                </div>
                                {/* Kick button - only show for admin and not for themselves */}
                                {isAdmin && user.id !== currentUserId && (
                                    <button
                                        onClick={() => {
                                            if (confirm(`Remove ${user.name} from the chat?`)) {
                                                socket?.send(JSON.stringify({
                                                    type: KICK_OUT,
                                                    chatId: chatId,
                                                    removeUserId: user.id
                                                }));
                                            }
                                        }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-600/20 rounded-lg text-red-400 hover:text-red-300"
                                        title="Remove user"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {showMobileMenu && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setShowMobileMenu(false)}
                ></div>
            )}

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Room Info Header */}
                <div className="px-4 md:px-8 py-4 md:py-6 border-b border-slate-800/50 bg-slate-900/95 backdrop-blur-xl shadow-lg">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button 
                                onClick={() => setShowMobileMenu(true)}
                                className="md:hidden text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl md:text-2xl font-bold truncate bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    {chatName}
                                </h1>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-slate-400 text-xs md:text-sm">
                                        Room ID: <span className="font-mono text-indigo-400 font-semibold">{chatId}</span>
                                    </p>
                                    {createdAt && (
                                        <span className="text-slate-500 text-xs hidden sm:inline">• Created {new Date(createdAt).toLocaleDateString()}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <button 
                                onClick={() => setShowInviteModal(true)}
                                className="px-3 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/50 hover:scale-105 text-sm md:text-base flex items-center gap-2"
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="hidden sm:inline">Invite</span>
                            </button>
                            <button className="px-3 md:px-5 py-2 md:py-2.5 bg-slate-800/80 text-slate-200 rounded-xl font-semibold border border-slate-700/50 hover:bg-red-600 hover:border-red-500 transition-all text-sm md:text-base hover:scale-105">
                                <span className="hidden sm:inline">Leave</span>
                                <svg className="w-4 h-4 md:w-5 md:h-5 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-slate-950 custom-scrollbar">
                    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 max-w-md">
                                    <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <h3 className="text-xl font-bold text-white mb-2">No messages yet</h3>
                                    <p className="text-slate-400">Be the first to start the conversation!</p>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg: any, idx: number) => {
                                // Check if this is a system message
                                if (msg.type === 'system') {
                                    return (
                                        <div key={`system-${idx}`} className="flex justify-center my-4 animate-fadeIn">
                                            <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 shadow-md">
                                                <p className="text-xs text-slate-400 font-medium">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                                
                                // Get sender name from message or fallback to finding user
                                const senderName = msg.senderName || msg.sender || 'Unknown';
                                const sent = msg.time ?? msg.sentTime;
                                const timeLabel = sent ? new Date(sent).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
                                const text = msg.text ?? msg.message ?? '';
                                
                                // Check if this message is from current user by comparing user IDs
                                const isMine = msg.userId === currentUserId;
                                console.log("Current User ID:", currentUserId, "Message User ID:", msg.userId, "Is Mine:", isMine);
                                
                                // Find user info for avatar
                                const userInfo = users.find((u:User)=>u.name === senderName);
                                
                                return (
                                    <div
                                        key={`${msg.id ?? msg.roomId ?? chatId ?? 'msg'}-${sent ?? idx}`}
                                        className={`flex ${isMine ? 'justify-start' : 'justify-end'} animate-fadeIn`}
                                    >
                                        <div className={`flex items-start gap-3 max-w-[85%] sm:max-w-[75%] md:max-w-[70%]`}>
                                            {/* Avatar - Always on left */}
                                            <div className="flex-shrink-0">
                                                {userInfo?.avatar ? (
                                                    <img
                                                        src={userInfo.avatar}
                                                        alt={senderName}
                                                        className="w-10 h-10 rounded-full border-2 border-slate-700 shadow-lg"
                                                    />
                                                ) : (
                                                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(senderName)} border-2 border-slate-700 shadow-lg flex items-center justify-center text-white font-bold text-sm`}>
                                                        {getInitials(senderName)}
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Message Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-sm font-bold truncate ${isMine ? 'text-blue-400' : 'text-slate-300'}`}>
                                                        {senderName}
                                                    </span>
                                                    {timeLabel && (
                                                        <span className="text-xs text-slate-500">
                                                            {timeLabel}
                                                        </span>
                                                    )}
                                                </div>
                                                <div
                                                    className={`px-4 py-3 rounded-2xl shadow-lg ${
                                                        isMine
                                                            ? 'bg-blue-600 text-white rounded-tl-md'
                                                            : 'bg-slate-800/90 text-slate-100 rounded-tl-md border border-slate-700/50'
                                                    }`}
                                                >
                                                    <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                                                        {text}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Message Input */}
                <div className="px-4 md:px-8 py-4 md:py-6 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/50 shadow-2xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-end gap-3">
                            <div className="flex-1 relative">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    rows={1}
                                    className="w-full bg-slate-800/80 text-white px-4 py-3 rounded-2xl border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none custom-scrollbar shadow-inner"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    style={{ minHeight: '48px', maxHeight: '120px' }}
                                />
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={!message.trim()}
                                className="px-5 md:px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0"
                            >
                                <span className="hidden sm:inline">Send</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">Press Enter to send, Shift+Enter for new line</p>
                    </div>
                </div>
            </main>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fadeIn">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700/50 animate-slideUp">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-700/50 bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Invite Friends</h3>
                                        <p className="text-sm text-slate-400">Share room details</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Room ID Section */}
                            <div>
                                <label className="text-sm font-semibold text-slate-300 mb-2 block">Room ID</label>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700/50 font-mono text-indigo-400 text-lg font-bold shadow-inner">
                                        {chatId}
                                    </div>
                                    <button
                                        onClick={handleCopyRoomId}
                                        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95 flex-shrink-0"
                                        title="Copy Room ID"
                                    >
                                        {copied ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {copied && (
                                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Room ID copied to clipboard!
                                    </p>
                                )}
                            </div>

                            {/* Instructions */}
                            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    How to Join This Room
                                </h4>
                                <ol className="space-y-3 text-sm text-slate-300">
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                        <span>Share the <span className="font-mono text-indigo-400 font-semibold">Room ID</span> with your friends</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                        <span>Ask them to visit the app's landing page</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                        <span>Click on <span className="font-semibold text-white">"Join Room"</span> button</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                        <span>Enter the Room ID and start chatting!</span>
                                    </li>
                                </ol>
                            </div>

                            {/* Room Info */}
                            <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-xl p-4 border border-indigo-500/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <h4 className="text-sm font-semibold text-white">Room: {chatName}</h4>
                                </div>
                                <p className="text-xs text-slate-400 pl-8">
                                    {users.length} {users.length === 1 ? 'member' : 'members'} • 
                                    {createdAt && ` Created ${new Date(createdAt).toLocaleDateString()}`}
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-700/50 bg-slate-800/30">
                            <button
                                onClick={() => setShowInviteModal(false)}
                                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:scale-105 active:scale-95"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.7);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ChatRoom;
