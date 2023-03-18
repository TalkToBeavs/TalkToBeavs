import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  keyframes,
  Text,
  useColorModeValue,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import ttb from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, selectUser } from '../../redux/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../lib/animations';

function Login() {
  const navigate = useNavigate();

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
        return;
      }, 1000);
    }

    const data = {
      email,
      password,
    };

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', data);

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
      minH='100vh'
      bg={useColorModeValue('gray.50', 'inherit')}
    >
      <Box
        as={motion.div}
        animation={slideAnimation}
        p={8}
        maxWidth='500px'
        borderWidth={1}
        borderRadius={8}
        boxShadow='xl'
      >
        <Box textAlign='center'>
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign='left'>
          <form onSubmit={handleSubmit}>
            <Input
              variant='filled'
              mb={3}
              type='email'
              placeholder='Email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant='filled'
              mb={3}
              autoComplete='current-password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width='full'
              mt={4}
              colorScheme='orange'
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
