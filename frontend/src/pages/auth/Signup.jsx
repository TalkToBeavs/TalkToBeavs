import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useColorMode,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ttb from '../../assets/logo.png';
import { slideAnimation } from '../../lib/animations';

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { colorMode } = useColorMode();

  const handleSubmit = async (e) => {
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
      const res = await axios.post('https://talk-to-beavs.herokuapp.com/api/auth/register', data);

      if (res.status === 201) {
        setTimeout(() => {
          setError('');
          setIsLoading(false);

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
      minH={isMobile ? 'calc(100vh - 80px)' : '100vh'}
      bg={useColorModeValue('gray.50', 'inherit')}
    >
      <Box
        as={motion.div}
        animation={slideAnimation}
        p={8}
        maxWidth={isMobile ? '80%' : '40%'}
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
            alt='logo'
            width='100%'
            maxH={isMobile ? '100px' : '200px'}
            objectFit='contain'
          />
          <Heading
            as='h1'
            size='2xl'
            fontWeight='bold'
            textShadow={colorMode === 'light' ? '2px 2px #DE6A1F' : '2px 2px #f2a673'}
            color={colorMode === 'light' ? '#f2a673' : '#DE6A1F'}
          >
            {' '}
            Sign Up
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
              autoComplete='email'
              _placeholder={{
                color: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              placeholder='Email'
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
              type='text'
              _placeholder={{
                color: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              autoComplete='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              type='password'
              autoComplete='current-password'
              _placeholder={{
                color: colorMode === 'light' ? '#f2a673' : '#DE6A1F',
              }}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              width='full'
              mt={4}
              bg={colorMode === 'light' ? '#f2a673' : '#DE6A1F'}
              isLoading={isLoading}
              loadingText='Creating account...'
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
