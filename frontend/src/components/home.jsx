import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToChat = () => {

    navigate('/chat');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">CC</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-800">
                Chat<span className="text-purple-600">Connect</span>
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-700 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-700 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-indigo-700 transition-colors">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-indigo-700 transition-colors">Contact</a>
            </nav>

            <div className="flex items-center space-x-3">
              <button className="hidden md:block text-gray-600 hover:text-indigo-700 font-medium transition-colors">
                Sign In
              </button>
              <button onClick={goToChat} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-md">
                Go to Chat
              </button>
              <button className="md:hidden text-gray-500 hover:text-indigo-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - keep your existing content */}
      <main className="flex-grow bg-gradient-to-b from-indigo-100 via-purple-50 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="md:w-1/2 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-indigo-800">
                Chat<span className="text-purple-600">Connect</span>
              </h1>

              <p className="text-xl text-gray-700 max-w-md">
                Connect with friends, family and colleagues in real-time with our
                intuitive messaging platform.
              </p>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={goToChat}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  Go to Chat
                </button>

                <button className="border-2 border-indigo-600 text-indigo-600 font-medium py-3 px-8 rounded-full hover:bg-indigo-50 transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-10 w-10 rounded-full border-2 border-white bg-indigo-${i * 100 + 200}`}>
                      <span className="sr-only">User {i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">Join 1000+ users</p>
              </div>
            </div>

            {/* Right side image/chat preview */}
            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="relative bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center border-b pb-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-10 w-10 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">CC</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold">ChatConnect</h3>
                      <p className="text-sm text-green-500">Online</p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>Hi there! Welcome to ChatConnect</p>
                    </div>
                    <div className="bg-indigo-100 p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                      <p>Thanks! Excited to try it out</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                      <p>Click "Go to Chat" to start messaging!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with reduced height */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold">CC</span>
                </div>
                <h3 className="ml-2 text-lg font-semibold">ChatConnect</h3>
              </div>
              <p className="text-gray-400 text-sm">
                The modern way to stay connected with everyone that matters in your life.
              </p>
              <div className="flex space-x-4">
                {/* Social Icons */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-3 md:mt-0">
              <h3 className="text-base font-semibold border-b border-gray-700 pb-1 mb-2">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQ</a></li>
              </ul>
            </div>

            <div className="mt-3 md:mt-0">
              <h3 className="text-base font-semibold border-b border-gray-700 pb-1 mb-2">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Press</a></li>
              </ul>
            </div>

            <div className="mt-3 md:mt-0">
              <h3 className="text-base font-semibold border-b border-gray-700 pb-1 mb-2">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-4 pt-3 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400">© 2025 Ram Krishna Yadav. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-1 md:mt-0">Made with ❤️ for better communication</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;