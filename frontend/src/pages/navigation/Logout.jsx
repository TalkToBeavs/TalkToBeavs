import { useState, useEffect } from 'react';
import ttb from '../../assets/logo.png';
import { Text, Button, Box, Flex, Heading, Image, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import TalkToBeavs from '../../components/text/TalkToBeavs';

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    try {
      const res = await axios.post('https://talk-to-beavs.herokuapp.com/api/auth/logout', {
        email: localStorage.getItem('token'), // assuming email was used as the token
      });
      if (res.status === 200) {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Logout failed');
      }
    } catch (err) {
      console.log(err);
      setError('Logout failed');
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Flex direction='column' align='center' justify='center' w='100%' h='100%'>
      <Image src={ttb} h='100px' />
      <Heading as='h1' size='2xl' mt={16} textAlign={'center'}>
        Thank you for using
        <Box my={4}>
          <TalkToBeavs />
        </Box>
      </Heading>
      <VStack spacing={4} align='center' justify='center'>
        <Text fontSize='2xl' my={4} fontWeight={'bold'} textAlign={'center'}>
          You are now signed out of your account. <br></br> You will be redirected to the login page
          in 2 seconds.
        </Text>
        <Button
          colorScheme='orange'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Login Again
        </Button>
      </VStack>
    </Flex>
  );
}

export default LogoutButton;
