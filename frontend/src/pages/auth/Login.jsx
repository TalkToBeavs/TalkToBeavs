import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useColorModeValue,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import axios from 'axios';
import ttb from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../lib/animations';

function Login() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { colorMode } = useColorMode();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse('');

    if (email === '' || password === '') {
      setTimeout(() => {
        setLoading(false);
        setError('Please fill in all fields');
      }, 1000);
    }

    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post('https://talk-to-beavs.herokuapp.com/api/auth/login', data);

      if (res.status === 200) {
        localStorage.setItem('token', res.data.user.email);
        setTimeout(() => {
          setError('');
          dispatch(loginUser(res.data.user));
          setResponse('Login successful!');
        }, 1000);
        setTimeout(() => {
          navigate('/home');
          setLoading(false);
        }, 2000);
      } else {
        setError('Login failed');
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (err) {
      console.error(err.response.data.message);
      setLoading(false);
      if (err.response.data.message === 'Incorrect password') {
        setError('Incorrect password');
      } else if (err.response.data.message === 'User not found') {
        setError('User not found');
      } else if (
        err.response.data.message.substring(err.response.data.message.length - 71) ===
        'fails to match the required pattern: /^[a-zA-Z._%+-]+@oregonstate.edu$/'
      ) {
        setError('Please use your Oregon State email');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      minH={isMobile ? 'calc(100vh - 80px)' : '100vh'}
      bg={useColorModeValue('gray.50', 'inherit')}
    >
      <Box
        as={motion.div}
        animation={slideAnimation}
        p={8}
        maxWidth={isMobile ? '80%' : '30%'}
        borderWidth={1}
        borderRadius={8}
        borderColor={useColorModeValue('orange.300', 'orange.500')}
        boxShadow='2xl'
        shadow={useColorModeValue('lg', 'dark-lg')}
        bg={useColorModeValue('white', 'gray.800')}
        w='full'
      >
        <Box textAlign='center' align='center' justify='center' mb={12}>
          <Image
            src={ttb}
            width='100%'
            maxH={isMobile ? '100px' : '200px'}
            objectFit='contain'
            alt='logo'
          />
          <Heading
            as='h1'
            size='2xl'
            fontWeight='bold'
            textShadow={colorMode === 'light' ? '2px 2px #DE6A1F' : '2px 2px #f2a673'}
            color={colorMode === 'light' ? '#f2a673' : '#DE6A1F'}
          >
            Login
          </Heading>
        </Box>
        <Box my={4} textAlign='left'>
          <form onSubmit={handleSubmit}>
            <Input
              variant='filled'
              mb={3}
              type='email'
              _active={{
                borderColor: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              _focus={{
                borderColor: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              _placeholder={{
                color: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              placeholder='Email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant='filled'
              mb={3}
              _active={{
                borderColor: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              _focus={{
                borderColor: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              autoComplete='current-password'
              _placeholder={{
                color: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width='full'
              mt={4}
              bg={colorMode === 'light' ? '#f2a673' : '#DE6A1F'}
              isLoading={loading}
              loadingText='Logging in...'
              type='submit'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box textAlign='center'>
          {error && (
            <Text mt={4} textAlign='center' color='red.500'>
              {error}
            </Text>
          )}
          {response && (
            <Text mt={4} textAlign='center' color='green.500'>
              {response}
            </Text>
          )}
        </Box>
        <Text mt={4} textAlign='center'>
          Don't have an account?{' '}
          <Link
            style={{
              color: colorMode === 'light' ? '#DE6A1F' : '#DE6A1F',
            }}
            to='/signup'
          >
            Sign Up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
