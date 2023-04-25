import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { MdExitToApp } from 'react-icons/md';
import { Circles } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLobby from '../../hooks/useLobby';
import { comeFromLeftAnimation, pulseLoaderAnimation } from '../../lib/animations';

const TextLobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [input, setInput] = useState('');
  let onid = user?.email.split('@')[0];
  const { queue, joinQueue, roomId, disconnect } = useLobby(onid, 'text');
  const dots = ['.', '.', '.'].map((dot, i) => (
    <motion.span
      key={i}
      animate={{ opacity: [1, 0], y: [0, -10], x: [0, 10] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: 'linear' }}
    >
      {dot}
    </motion.span>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/text/${input}`);
  };

  React.useEffect(() => {
    joinQueue();

    if (roomId) {
      navigate(`/text/${roomId}`);
    }

    return () => {
      disconnect();
    };
  }, [roomId]);

  return (
    <Flex
      direction='column'
      align='stretch'
      justify='center'
      h='100vh'
      bg={useColorModeValue('gray.50', 'inherit')}
    >
      {!isMobile && (
        <Menu closeOnSelect={true}>
          <MenuButton
            as={IconButton}
            position='absolute'
            top='5'
            right='5'
            zIndex='99999'
            icon={<MdExitToApp />}
          />
          <MenuList zIndex='99999'>
            {['Leave Lobby', 'Logout'].map((item, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  switch (item) {
                    case 'Leave Lobby':
                      navigate('/home');
                      break;
                    case 'Logout':
                      navigate('/logout');
                      break;
                    default:
                      break;
                  }
                }}
              >
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}

      {/* 
        Either use the Rings or Circles loader works fine
      <Rings
        height="100vh"
        width="100vw"
        color="#DE6A1F"
        radius="6"
        wrapperStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          opacity: 0.1,
        }}
        visible={true}
        ariaLabel="rings-loading"
      /> */}

      <Box
        as={motion.div}
        animation={pulseLoaderAnimation}
        style={{
          position: 'absolute',
          top: `${isMobile ? '53%' : '50%'}`,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      >
        <Circles
          height={isMobile ? '60vh' : '50vh'}
          width={isMobile ? '60vw' : '50vw'}
          color='#DE6A1F'
          ariaLabel='circles-loading'
          wrapperStyle={{
            position: 'absolute',
            top: `${isMobile ? '53%' : '50%'}`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            opacity: 0.1,
          }}
          visible={true}
        />
      </Box>

      <Heading
        textAlign={'center'}
        w={'70%'}
        mx={'auto'}
        color={useColorModeValue('gray.900', 'gray.100')}
        fontSize={isMobile ? '4xl' : '6xl'}
      >
        Welcome To The Lobby
      </Heading>
      <Text
        py={4}
        textAlign={'center'}
        w={'fit-content'}
        mx={'auto'}
        color={useColorModeValue('gray.600', 'gray.400')}
        fontSize={isMobile ? 'sm' : 'xl'}
        fontWeight={500}
        letterSpacing={1.5}
        animation={comeFromLeftAnimation}
      >
        Waiting for another beaver to join
        <span>{dots}</span>
      </Text>
    </Flex>
  );
};

export default TextLobby;
