import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const NEW_CHAT_MESSAGE_EVENT = 'newMessage';
const SOCKET_SERVER_URL = 'https://https://talk-to-beavs.herokuapp.com';

const useTextChat = (roomId) => {
  const [messages, setMessages] = useState([
    {
      body: `You have been connected to the chat. Say hi!`,
      ownedByCurrentUser: false,
      senderUsername: 'TalkToBeavs Chat',
      senderGivenName: 'TalkToBeavs Chat',
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
      senderGivenName: otherUser?.name,
      createdAt: Date.now(),
    });
  };

  return { messages, sendMessage };
};

export default useTextChat;
