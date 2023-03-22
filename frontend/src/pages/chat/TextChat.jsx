import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useTextChat from '../../hooks/useTextChat';
import moment from 'moment';

export default function TextChat() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { colorMode } = useColorMode();
  const [input, setInput] = React.useState('');
  const messages_ = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const otherUser = useSelector((state) => state.user.data);
  const messageBox = React.useRef(null);
  const endOfMessages = React.useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const [newMessage, setNewMessage] = React.useState('');
  // const [otherOnid, setOtherOnid] = React.useState('');

  let onid = user?.email.split('@')[0];
  let senderName = otherUser?.name;
  let otherOnid = otherUser?.email.split('@')[0];
  const { messages, sendMessage } = useTextChat(id || location.pathname.split('/')[2], otherUser);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(newMessage, otherUser);
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
      // console.log(message)
      // console.log(otherUser)
      console.log(senderName)
      let avatarUsername = message.senderUsername;
      if (avatarUsername === onid) {
        avatarUsername = senderName
      }

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
              {isMe ? onid : message.senderUsername}
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
                  {moment(new Date(message.createdAt)).format('h:mm A')}
                </Box>
              </Box>
              <Avatar size='sm' mr={4} name={message.senderGivenName} src='https://bit.ly/broken-link' />
            </Box>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Flex
      direction='column'
      align='stretch'
      justify='center'
      h='100vh'
      bg={useColorModeValue('gray.50', 'inherit')}
    >
      <Box
        minH={isMobile ? 'calc(100vh - 80px)' : 'calc(100vh)'}
        maxW='100vw'
        display='flex'
        flexDirection='column'
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        transition='background-color 200ms'
        marginLeft = {{ base: 'full', md: 52 }}
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
    </Flex>
  );
}
