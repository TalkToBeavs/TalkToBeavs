import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newMessage';
const SOCKET_SERVER_URL = 'http://localhost:8080';

const useChat = (roomId) => {
  const [messages, setMessages] = useState([
    {
      body: `You have been connected to the chat. Say hi!`,
      ownedByCurrentUser: false,
      senderUsername: 'TalkToBeavs Chat',
      createdAt: Date.now(),
    },
  ]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message, otherUser) => {
      console.log(message);
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
        senderUsername: message.senderUsername === socketRef.current.id ? 'You' : message.senderUsername,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody, otherUser) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      room: roomId,
      senderUsername: otherUser?.email.split('@')[0],
      createdAt: Date.now(),
    });
  };

  return { messages, sendMessage };
};

export default useChat;
