import { useState, useEffect } from 'react';
import { Chatbot } from 'supersimpledev';
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {

    const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) ||
      [{
        message: 'hello chatbot',
        sender: 'user',
        id: 'id1',
        time: 1736127288920
      }]);

    useEffect(() => {
      Chatbot.addResponses({
        'goodbye': 'Goodbye. Have a great day^_^',
        'give me a unique id': function() {
          return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
        }
      });
    }, []);

    useEffect(() => {
      localStorage.setItem('messages', JSON.stringify(chatMessages));
    }, [chatMessages]);

    return (
      <div className="app-container"> 
        {chatMessages.length === 0 && (
          <p className="welcome-message">
            Welcome to the chatbot project! Send a message using the textbox below.
          </p>
        )}
        <ChatMessages
          chatMessages={chatMessages}
        />

        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    );
  }

export default App
