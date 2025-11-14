import React, { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { CHAT_JOINED, INVALID_CREDENTIALS, JOIN_CHAT } from "../messages/message";
import { useNavigate } from "react-router-dom";
import type { Message } from "../types.tsx";

interface JoinRoomModalProps {
    onOpen?: () => void;
    onClose?: () => void;
    onCreate: () => void;
}

const JoinRoomModal: React.FC<JoinRoomModalProps> = ({
    onCreate,
    onClose
}) => {
    const navigate = useNavigate();
    const socket = useSocket();
    const [roomCode, setRoomCode] = useState("");
    const [userName, setUserName] = useState("");
    const [showError, setShowError] = useState<boolean>(false)
    const handleJoinRoom = () => {
        socket?.send(JSON.stringify({
            type: JOIN_CHAT,
            name: userName.toUpperCase(),
            chatId: roomCode
        }))
    };
    useEffect(() => {
        if (!socket) return;
        socket.onmessage = (messageData) => {
            const message = JSON.parse(messageData.data)
            switch (message.type) {
                case CHAT_JOINED:
                    navigate("/chat", {
                        state: {
                            chatId: message.chatId,
                            chatUsers: message.chatUsers,
                            chatMessages: message.messages as Message[],
                            chatName: message.name,
                            createdAt: message.createdAt,
                            currentUser: message.currentUser
                        }
                    })
                    break;
                case INVALID_CREDENTIALS:
                    setShowError(true)
                    break;
                default:
                    console.log("Invalid message data")
            }
        }
        return () => {
            socket.onmessage = null; // Cleanup
        };
    }, [socket, navigate])
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Join Room</h2>
                        <p className="text-gray-400 text-sm">Enter room code to join conversation</p>
                    </div>
                </div>

                {/* Form */}
                <div className="space-y-5">
                    {/* Room Code Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Room Code
                        </label>
                        <input
                            type="text"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="Enter 4-digit room code"
                            maxLength={4}
                            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-center text-2xl font-mono tracking-widest"
                        />
                        {showError && (
                            <div className="text-red-400 flex justify-center items-center">
                                Invalid room id
                            </div>
                        )}
                        <p className="text-gray-500 text-xs mt-2">
                            Ask the room creator for the code
                        </p>
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

                    {/* Info Card */}
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-gray-300">
                                <p className="font-medium text-white mb-1">Need a room code?</p>
                                <p className="text-gray-400">
                                    Get the code from the person who created the room, or{" "}
                                    <button
                                        onClick={onCreate}
                                        className="text-teal-400 hover:text-teal-300 font-medium underline"
                                    >
                                        create your own room
                                    </button>
                                    .
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
                        onClick={handleJoinRoom}
                        disabled={!roomCode.trim() || !userName.trim()}
                        className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:from-teal-600 disabled:hover:to-emerald-600"
                    >
                        Join Room
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinRoomModal;