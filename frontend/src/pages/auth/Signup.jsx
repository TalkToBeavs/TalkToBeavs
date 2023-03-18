import { useState, useEffect } from 'react';
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
import io from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../lib/animations';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(email);
    console.log(name);
    console.log(password);
    const data = {
      email,
      name,
      password,
    };
    e.preventDefault();
    setIsLoading(true);

    if (name === '' || email === '' || password === '') {
      setTimeout(() => {
        setIsLoading(false);
        setError('Please fill in all fields');
        return;
      }, 1000);
    }

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', data);

      console.log(res.status);

      if (res.status === 201) {
        setTimeout(() => {
          setError('');
          setIsLoading(false);
          console.log('success');
          setResponse('Signup successful!');
        }, 1000);
        setTimeout(() => {
          navigate('/login');
          setIsLoading(false);
        }, 2000);
      } else {
        setError('Signup failed');
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (err) {
      console.error(err.response.data.message);
      setIsLoading(false);
      if (err.response.data.message === 'User already exists') {
        setError('User already exists');
      } else if (
        err.response.data.message.substring(err.response.data.message.length - 71) ===
        'fails to match the required pattern: /^[a-zA-Z._%+-]+@oregonstate.edu$/'
      ) {
        setError('Please use your Oregon State email');
      } else {
        setError('Signup failed');
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
        boxShadow='lg'
      >
        <Box textAlign='center'>
          <Heading>Sign Up</Heading>
        </Box>
        <Box my={4} textAlign='left'>
          <form onSubmit={handleSubmit}>
            <Input
              variant='filled'
              mb={3}
              type='email'
              autoComplete='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant='filled'
              mb={3}
              type='text'
              autoComplete='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              variant='filled'
              mb={3}
              type='password'
              autoComplete='current-password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width='full'
              mt={4}
              colorScheme='orange'
              isLoading={isLoading}
              loadingText='Submitting'
              type='submit'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </Box>
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
        <Text mt={4} textAlign='center'>
          Already have an account?{' '}
          <Link style={{ color: '#DE6A1F' }} to='/login'>
            Login
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Signup;
