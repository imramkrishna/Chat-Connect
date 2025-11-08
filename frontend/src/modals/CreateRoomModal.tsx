import React, { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { CHAT_CREATED, CREATE_CHAT } from "../messages/message";
import { useNavigate } from "react-router-dom";

interface CreateRoomModalProps {
    onOpen?: () => void;
    onClose?: () => void;
}

const CreateRoomModal: React.FC<CreateRoomModalProps> = ({
    onClose
}) => {
    const navigate=useNavigate();
    const socket=useSocket();
    const [roomName, setRoomName] = useState("");
    const [userName, setUserName] = useState("");
        const handleCreateRoom = () => {
        socket?.send(JSON.stringify({
            type:CREATE_CHAT,
            name:userName.toUpperCase(),
            roomName:roomName.toUpperCase()
        }))
    }
    useEffect(()=>{
        if(!socket) return;
        socket.onmessage=(messageEvent)=>{
            const message=JSON.parse(messageEvent.data);
            switch(message.type){
                case CHAT_CREATED:
                    navigate("/chat",{
                        state:{
                            chatId:message.chatId,
                            chatUsers:message.chatUsers,
                            chatMessages:message.messages,
                            chatName:message.name,
                            createdAt:message.createdAt,
                            currentUser:message.currentUser
                        }
                    })
                    break;
            }
        }
    },[socket])
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-lg w-full p-8 transform transition-all">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Create New Room</h2>
                        <p className="text-gray-400 text-sm">Start a new conversation</p>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    {/* Room Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Room Name
                        </label>
                        <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="e.g., Team Discussion"
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* User Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Private Room Toggle */}
                    {/* <div className="flex items-center justify-between bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white font-medium">Private Room</p>
                                <p className="text-slate-400 text-xs">Require password to join</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                isPrivate ? 'bg-indigo-600' : 'bg-slate-600'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    isPrivate ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div> */}

                    {/* Info Card */}
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-gray-300">
                                <p className="font-medium text-white mb-1">Quick Tip</p>
                                <p className="text-gray-400">
                                    After creating the room, you'll receive a unique link to share with others.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-200 border border-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateRoom}
                        disabled={!roomName.trim() || !userName.trim()}
                        className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-teal-600 disabled:hover:to-emerald-600"
                    >
                        Create Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateRoomModal;
