import { useState, useEffect } from 'react';
import {
  Button,
  Center,
  Text,
  VStack,
  HStack,
  Flex,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useVideoChat from '../../hooks/useVideoChat';

function VideoChat() {
  const { roomId } = useParams();
  const user = useSelector((state) => state.user.data);
  const {
    localStream,
    remoteStream,
    createOffer,
    status,
    socketRef,
    setStatus,
    connected,
    peerConnected,
  } = useVideoChat(roomId);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (connected && peerConnected) {
      setLoading(false);
      setStatus('Connected!');
    }

    if (!connected && !peerConnected) {
      setLoading(true);
      setStatus('Connecting...');
    }

    socketRef.current.on('disconnect', () => {
      setLoading(true);
      setStatus('Disconnected');
      navigate('/video');
    });
  }, [connected, peerConnected]);

  return (
    <Center h='100vh' w='100vw' bg={useColorModeValue('gray.100', 'gray.900')}>
      <VStack spacing={4}>
        <Text fontSize='xl' fontWeight='bold'>
          You are in room: {roomId}
        </Text>
        <Text fontSize='xl' fontWeight='bold'>
          {status ?? 'Connecting...'}
        </Text>
        {loading && <Spinner size='sm' />}
        <Flex direction='row' spacing={4} gap={1} justify='center' align='center'>
          <Flex direction='column' justify='center' align='center'>
            <Text fontSize='lg' fontWeight='bold'>
              {user?.name}
            </Text>
            <video
              ref={localStream}
              autoPlay
              muted={isMuted}
              style={{
                height: 'max-content',
                margin: '10px',
                width: 'max-content',
                border: '2px solid orange',
                borderRadius: '10px',
              }}
            />
          </Flex>

          <Flex direction='column' justify='center' align='center'>
            <Text fontSize='lg' fontWeight='bold'>
              A Random Beaver
            </Text>
            <video
              ref={remoteStream}
              autoPlay
              muted
              style={{
                height: 'max-content',
                margin: '10px',
                width: 'max-content',
                border: '2px solid black',
                borderRadius: '10px',
              }}
            />
          </Flex>
        </Flex>
        <HStack spacing={4}>
          <Button
            colorScheme='green'
            onClick={() => {
              createOffer();
              setStatus('Connected!');
              setLoading(false);
            }}
          >
            Connect
          </Button>
          <Button
            colorScheme='orange'
            onClick={() => {
              setIsMuted(!isMuted);
            }}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </Button>
          <Button
            colorScheme='red'
            onClick={() => {
              navigate('/video');
            }}
          >
            End Call
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}

export default VideoChat;
