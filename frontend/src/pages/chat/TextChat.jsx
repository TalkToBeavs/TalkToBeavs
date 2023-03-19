import React, { useState, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Button,
  Input,
  Box,
  Text,
  FormControl,
  Icon,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import useChat from '../../hooks/useChat';

export default function TextChat() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { colorMode } = useColorMode();
  const [input, setInput] = React.useState('');
  const messages_ = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const messageBox = React.useRef(null);
  const endOfMessages = React.useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const [newMessage, setNewMessage] = React.useState('');

  let onid = user?.email.split('@')[0];
  const { messages, sendMessage } = useChat(id || location.pathname.split('/')[2]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage('');
  };

  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showMessages = () => {
    return messages.map((message, index) => {
      const isMe = message.ownedByCurrentUser;
      return (
        <Box
          key={index}
          display='flex'
          flexDirection={isMe ? 'row-reverse' : 'row'}
          alignItems='flex-end'
          mb={4}
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems={isMe ? 'flex-end' : 'flex-start'}
            mx={4}
          >
            <Text
              fontSize='sm'
              fontWeight='bold'
              color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
            >
              {isMe ? 'You' : onid}
            </Text>
            <Box
              display='flex'
              flexDirection={isMe ? 'row' : 'row-reverse'}
              gap={2}
              mt={2}
              alignItems='center'
              mb={1}
            >
              <Box
                bg={isMe ? 'orange.500' : 'gray.200'}
                color={isMe ? 'white' : 'gray.800'}
                px={4}
                py={1}
                borderRadius='lg'
                wordBreak='break-word'
              >
                {message.body}

                <Box
                  display='flex'
                  flexDirection='row'
                  alignItems='center'
                  justifyContent='flex-end'
                  fontSize='xs'
                  color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                >
                  {new Date(message.createdAt).setSeconds(0) && new Date(message.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </Box>
              </Box>
              <Avatar size='sm' mr={4} name={message.username} src='https://bit.ly/broken-link' />
            </Box>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box
      minH={isMobile ? 'calc(100vh - 80px)' : 'calc(100vh)'}
      maxW='100vw'
      display='flex'
      flexDirection='column'
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      transition='background-color 200ms'
    >
      <Box
        id='msg-box'
        p={6}
        pb={0}
        flex={1}
        overflowY='scroll'
        ref={messageBox}
        className='invisible'
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {showMessages()}
        <Box ref={endOfMessages}>{/* scroll target empty div */}</Box>
      </Box>
      <FormControl
        p={16}
        zIndex={3}
        as='form'
        display='flex'
        alignItems='centre'
        onSubmit={handleSendMessage}
      >
        <Input
          position='sticky'
          bottom={0}
          h={isMobile ? '50px' : '100px'}
          value={newMessage}
          onChange={handleNewMessageChange}
        />
        <IconButton
          ml={2}
          type='submit'
          icon={<Icon as={RiSendPlaneFill} />}
          _focus={{ boxShadow: 'none' }}
          size={isMobile ? 'md' : 'lg'}
          w={isMobile ? '50px' : '100px'}
          isRound
        />
        <Button hidden type='submit'>
          send
        </Button>
      </FormControl>
    </Box>
  );
}
