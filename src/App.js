import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.dev.readychatai.com/messages_json');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching messages');
      setLoading(false);
      console.error('Error fetching messages:', error); // Log error for debugging
    }
  };

  // Function to format date as "Month Day, Year"
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to format time as "HH:MM AM/PM"
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="App">
      <h1 align="center">AI Messenger Messages</h1>
      {loading && <p>Loading messages...</p>}
      {error && <p>{error}</p>}
      <div className="message-container">
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            {/* Check if the previous message has a different date */}
            {index === 0 || formatDate(messages[index - 1].message_date) !== formatDate(message.message_date) ? (
              <div className="date-separator">{formatDate(message.message_date)}</div>
            ) : null}
            <div
              className={`message ${message.sender_name === 'bot' ? 'incoming' : 'outgoing'}`}
            >
              <p className="sender">{message.sender_name}</p>
              <p className="text">{message.message_text}</p>
              <p className="timestamp">{formatTime(message.message_date)}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default App;
