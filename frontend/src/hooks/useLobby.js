import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

const useLobby = (onid, option) => {
  const [queue, setQueue] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socketIOClient(BASE_URL, {
      query: { onid },
    });

    socketRef.current.on('matched', (data) => {
      setRoomId(data.room);
    });

    socketRef.current.on('getPeer', (data) => {
      setRoomId(data.room);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [onid]);

  const joinQueue = () => {
    if (option === 'text') {
      socketRef.current.emit('joinTextQueue', {
        name: onid,
      });
    } else {
      socketRef.current.emit('joinVideoQueue', {
        name: onid,
      });
    }
  };

  const disconnect = () => {
    socketRef.current.disconnect();
  };

  return { queue, joinQueue, roomId, disconnect };
};

export default useLobby;
