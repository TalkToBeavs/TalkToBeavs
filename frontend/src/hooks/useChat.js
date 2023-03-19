import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newMessage';
const SOCKET_SERVER_URL = 'http://localhost:8080';

const useChat = (roomId) => {
  const [messages, setMessages] = useState([{
    body: 'You have been connected to the chat. Say hi!',
    ownedByCurrentUser: true,
    senderUsername: 'Chat Bot',
  }]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log(message)
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
        senderUsername: message.senderId === socketRef.current.id ? 'You' : message.senderId,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      room: roomId,
      senderUsername: 'You',
    });
  };

  return { messages, sendMessage };
};

export default useChat;
