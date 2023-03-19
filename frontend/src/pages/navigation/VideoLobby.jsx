import React from 'react';
import { Text, Heading, Flex, Box, Button } from '@chakra-ui/react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../components/AuthProvider';

const VideoLobby = () => {
  const socket = io('http://localhost:8080');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch({ type: 'video/connect', payload: { url: 'ws://localhost:8080' } });
  }, []);
  /*
  React.useEffect(() => {
    let email = localStorage.getItem('token');
    const user = {
      email: email,
    };

    socket.on('connect', () => {
      console.log('Connected to the server');
      socket.emit('joinQueue', { name: user.email });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  */
  return (
    <Flex direction='column' align='center' justify='center' minH='100vh' bg='gray.100'>
      <Heading textAlign={'center'}>Video Lobby</Heading>
      <Text py={4} textAlign={'center'} w={'fit-content'}>
        Waiting for other user to join...
      </Text>
      <Button colorScheme='orange' onClick={() => navigate('/video/440')}>
        Go To Chat
      </Button>
    </Flex>
  );
};

export default VideoLobby;
