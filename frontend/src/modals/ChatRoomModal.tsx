import React from "react";

interface ChatRoomModalProps {
    onOpen?: () => void;
    onClose?: () => void;
    onJoin: () => void;
    onCreate: () => void;
}

const ChatRoomModal: React.FC<ChatRoomModalProps> = ({
    onJoin,
    onCreate,
    onClose
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full p-8 transform transition-all">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-white text-center mb-3">
                    Welcome to ChatConnect
                </h2>
                <p className="text-slate-400 text-center mb-8">
                    Choose how you'd like to get started
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                    {/* Create Room Button */}
                    <button
                        onClick={onCreate}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Room
                    </button>

                    {/* Join Room Button */}
                    <button
                        onClick={onJoin}
                        className="w-full bg-slate-700 text-white py-4 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200 border border-slate-600 flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Join Existing Room
                    </button>
                </div>

                {/* Info Text */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                    <div className="flex items-start gap-3 text-sm text-slate-400">
                        <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>
                            Create a room to start a new conversation or join an existing room with a room code.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatRoomModal;
