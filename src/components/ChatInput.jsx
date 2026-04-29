import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs';
import LoadingImage from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    setInputText('');

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ];

    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingImage} className="loading-spinner" />,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    const response = await Chatbot.getResponse(inputText);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30" 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>

      <button
        onClick={clearMessages}
        className="clear-button"
      >
        Clear
      </button>
    </div> 
  );
}