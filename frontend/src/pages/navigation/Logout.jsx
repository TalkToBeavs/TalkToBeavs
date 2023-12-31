import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ttb from '../../assets/logo.png';
import TalkToBeavs from '../../components/text/TalkToBeavs';
import { logoutUser } from '../../redux/slices/UserSlice';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const email = user?.email;
  const [error, setError] = useState('');

  const handleLogout = async () => {
    setError('');
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/logout`,
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      if (res.status === 200) {
        localStorage.removeItem('token');
        dispatch(logoutUser());
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Logout failed');
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (err) {
      setError('Logout failed');
      localStorage.removeItem('token');
      navigate('/');
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
