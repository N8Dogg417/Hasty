import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CallObjectContext from '../CallObjectContext';
import '../chat/chat.css';

export default function Chat(props) {
  const callObject = useContext(CallObjectContext);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const _logger = debug.extend("videochat");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    _logger("Chat value", event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    _logger("Chat send", inputValue);
    callObject.sendAppMessage({ message: inputValue }, '*');
    const name = callObject.participants().local.user_name
      ? callObject.participants().local.user_name
      : 'Guest';
    setChatHistory([
      ...chatHistory,
      {
        sender: name,
        message: inputValue,
      },
    ]);
    setInputValue('');
  }


  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleAppMessage(event) {
      const participants = callObject.participants();
      const name = participants[event.fromId].user_name
        ? participants[event.fromId].user_name
        : 'Guest';
      setChatHistory([
        ...chatHistory,
        {
          sender: name,
          message: event.data.message,
        },
      ]);
      props.notification();
    }

    callObject.on('app-message', handleAppMessage);

    return function cleanup() {
      callObject.off('app-message', handleAppMessage);
    };
  }, [callObject, chatHistory]);

  useEffect(() => {}, [chatHistory]);

  return props.isOnClickDisplay ? (
    
    <div className="chat col">
            {chatHistory.map((entry, index) => (
              <div key={`entry-${index}`} className="messageList">
                <b>{entry.sender}</b>: {entry.message}
              </div>
            ))}
      <form onSubmit={handleSubmit}>
        <label htmlFor="chatInput"></label>
        <input
          id="chatInput"
          className="chat-input"
          type="text"
          placeholder="Type your message here.."
          value={inputValue}
          onChange={handleChange}
        ></input>
        <button type="submit" className="send-chat-button">
          Send
        </button>
      </form>
    </div>
  ) : null;
}

Chat.propTypes = {
  notification: PropTypes.func,
  isOnClickDisplay: PropTypes.bool,
};