import { Box, Button, ButtonGroup, Flex, HStack, Heading, Avatar, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Lobby = () => {
  const [name, setName] = React.useState('');

  return (
    <Flex direction='column' align='center' justify='center' minH='100vh' bg='gray.100'>
      <HStack>
        <Box p={8} maxWidth='400px' borderWidth={1} borderRadius={8} boxShadow='lg'>
          <Heading textAlign={'center'}>Home</Heading>
          <Text py={4} textAlign={'center'} w={'fit-content'}>
            In TalkToBeavs, you can either text or video chat with other students. You can also post
            to the bulletin board and see what other students are posting.{' '}
            <b>
              <i>Enjoy!</i>
            </b>
          </Text>
          <Input placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
          <ButtonGroup mt={4} spacing={4} w={'full'} justifyContent={'center'}>
            <Button colorScheme='blue' variant='outline'>
              <Link to={`/video`}>Video Chat</Link>
            </Button>
            <Button colorScheme='blue' variant='outline'>
              <Link to='/text'>Text Chat</Link>
            </Button>
          </ButtonGroup>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Lobby;
