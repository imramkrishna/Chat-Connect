import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import ChatRoomModal from "../modals/ChatRoomModal.tsx";
import JoinRoomModal from "../modals/JoinRoomModal.tsx";
import CreateRoomModal from "../modals/CreateRoomModal.tsx";

const LandingPage = () => {
    const [showJoinRoomModal,setShowJoinRoom]=useState<boolean>(false)
    const [showCreateRoomModal,setShowCreateRoomModal]=useState<boolean>(false)
    const [showChatRoomModal,setShowChatRoomModal]=useState<boolean>(false)
    const handleCreateRoom=()=>{

    }

    return (
        <div className="bg-slate-950 min-h-screen">
            <Header />
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>
                {showChatRoomModal && (
                    <ChatRoomModal
                    onOpen={()=>setShowChatRoomModal((true))}
                    onClose={()=>setShowChatRoomModal((false))}
                    onCreate={()=>setShowCreateRoomModal(true)}
                    onJoin={()=>setShowJoinRoom(true)}
                    />
                )}
                {
                    showJoinRoomModal &&(
                        <JoinRoomModal
                            onOpen={()=>setShowJoinRoom(true)}
                            onClose={()=>setShowJoinRoom(false)}
                            onCreate={handleCreateRoom}
                        />
                    )
                }
                {
                    showCreateRoomModal &&(
                        <CreateRoomModal
                            onOpen={()=>setShowCreateRoomModal(true)}
                            onClose={()=>setShowCreateRoomModal(false)}
                        />
                    )
                }
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block mb-4">
                            <span className="bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
                                🚀 Now with end-to-end encryption
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Connect Instantly,
                            <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Chat Anywhere
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                            Real-time messaging that's fast, secure, and simple. Start a conversation with anyone in seconds, no signup required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                            onClick={()=>setShowChatRoomModal((true))}
                            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
                                Start Chatting Now
                            </button>
                            <button className="px-8 py-4 bg-slate-800 text-white rounded-lg text-lg font-semibold hover:bg-slate-700 transition-all duration-200 border border-slate-700 w-full sm:w-auto">
                                Watch Demo
                            </button>
                        </div>
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>No signup required</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>End-to-end encrypted</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>100% Free</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Everything you need for seamless communication
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Powerful features that make chatting effortless and secure
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                            <p className="text-slate-400">
                                Messages delivered instantly with real-time synchronization across all devices.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
                            <p className="text-slate-400">
                                End-to-end encryption ensures your conversations stay private and secure.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Group Chats</h3>
                            <p className="text-slate-400">
                                Create rooms and invite multiple people for seamless group conversations.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Cross-Platform</h3>
                            <p className="text-slate-400">
                                Works seamlessly on desktop, tablet, and mobile devices.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Rich Media</h3>
                            <p className="text-slate-400">
                                Share images, files, emojis, and more to express yourself fully.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Customizable</h3>
                            <p className="text-slate-400">
                                Personalize your chat experience with themes and custom settings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Get started in seconds
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            No complicated setup. Just three simple steps to start chatting.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
                                <div className="relative bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">1</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Create a Room</h3>
                            <p className="text-slate-400">
                                Click "Start Chatting" and instantly generate a unique chat room with a shareable link.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse animation-delay-1000"></div>
                                <div className="relative bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">2</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Share the Link</h3>
                            <p className="text-slate-400">
                                Send the room link to anyone you want to chat with via email, text, or social media.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-pulse animation-delay-2000"></div>
                                <div className="relative bg-slate-900 rounded-full w-16 h-16 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-white">3</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">Start Chatting</h3>
                            <p className="text-slate-400">
                                That's it! Begin your real-time conversation immediately with no delays or registration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Ready to connect?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join thousands of users who are already chatting on ChatConnect
                    </p>
                    <button className="px-10 py-4 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Start Your First Chat
                    </button>
                    <p className="mt-4 text-indigo-200 text-sm">
                        No credit card required • Free forever
                    </p>
                </div>
            </section>

            <Footer />

            {/* Custom CSS for animations */}
            <style>{`
                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                .bg-grid-pattern {
                    background-image: 
                        linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;