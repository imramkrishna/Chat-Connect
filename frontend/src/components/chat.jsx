import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Combined useEffect with all WebSocket logic
  useEffect(() => {
    // Initialize username if not already set
    if (!username) {
      const joined = prompt("Enter your name");
      if (!joined) {
        navigate("/");
        return; // Exit early if no username provided
      }
      setUsername(joined);
      return; // Exit early and let the effect re-run with username set
    }

    // Create WebSocket connection
    socketRef.current = new WebSocket('wss://chat-connect-backend-2ty0.onrender.com');
    console.log("Attempting to connect to WebSocket server...");
    
    // Connection opened handler
    socketRef.current.onopen = () => {
      console.log('WebSocket connection established');
      setConnected(true);
      
      // Send join message
      const joinMsg = {
        type: 'join',
        username: username,
        timestamp: new Date().toISOString()
      };
      socketRef.current.send(JSON.stringify(joinMsg));
    };
    
    // Message handler
    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prev => {
          const newMessages = [...prev, data];
          // Handle scroll after message added (with setTimeout to ensure DOM update)
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
          return newMessages;
        });
      } catch (err) {
        // Handle plain text messages
        setMessages(prev => {
          const newMessages = [...prev, { 
            type: 'system',
            content: event.data,
            timestamp: new Date().toISOString()
          }];
          // Handle scroll after message added
          setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
          return newMessages;
        });
      }
    };
    
    // Connection closed handler
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setConnected(false);
    };
    
    // Error handler
    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };
    
    // Clean up function
    return () => {
      if (socketRef.current) {
        console.log("Closing WebSocket connection");
        socketRef.current.close();
      }
    };
  }, [username, navigate]); // Only re-run if username or navigate changes

  // Send message handler
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !connected) return;
    
    const messageObj = {
      type: 'message',
      username: username,
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    // Send to WebSocket server
    socketRef.current.send(JSON.stringify(messageObj));
    
    // Add to our local state (optimistic update)
    setMessages(prev => {
      const newMessages = [...prev, { ...messageObj, isSelf: true }];
      // Handle scroll after sending message
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
      return newMessages;
    });
    
    // Clear input field
    setInputMessage('');
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-indigo-600 font-bold text-xl">CC</span>
            </div>
            <h1 className="ml-3 text-xl font-bold">ChatConnect</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${connected ? 'bg-green-400' : 'bg-red-500'}`}></div>
            <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-6xl mx-auto w-full px-4 py-4">
        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto mb-4 pr-2 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.isSelf || msg.username === username ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[75%] break-words ${
                    msg.type === 'system' 
                      ? 'bg-gray-200 text-gray-800' 
                      : msg.isSelf || msg.username === username 
                        ? 'bg-indigo-500 text-white' 
                        : 'bg-white text-gray-800 shadow-sm'
                  }`}
                >
                  {msg.type !== 'system' && (
                    <div className="font-semibold text-sm mb-1">
                      {msg.isSelf || msg.username === username ? 'You' : msg.username}
                    </div>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  {msg.timestamp && (
                    <div className="text-xs opacity-70 text-right mt-1">
                      {formatTime(msg.timestamp)}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form 
          onSubmit={sendMessage} 
          className="flex space-x-2 bg-white rounded-lg shadow-md p-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={!connected}
            className="flex-1 py-2 px-4 outline-none rounded-md bg-gray-50 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!connected || !inputMessage.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;