import { useState } from 'react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-blue-900 border-b border-blue-800 fixed w-full top-0 z-50 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">Chat<span className="text-teal-400">Connect</span></span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
                        <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200">How It Works</a>
                        <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a>
                        <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200">
                            Create Chat Room
                        </button> */}
                        <button className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Chat Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-blue-800">
                        <div className="flex flex-col space-y-4">
                            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-2">Features</a>
                            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-2">How It Works</a>
                            <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-2">About</a>
                            <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-2">Contact</a>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-blue-800">
                                <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 text-left">
                                    Sign In
                                </button>
                                <button className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-lg">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;