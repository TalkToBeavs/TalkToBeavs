import React from 'react';
import {
  Text,
  Box,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  useColorModeValue,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TalkToBeavs, { TalkToBeavsMobile } from '../../components/text/TalkToBeavs';

const Landing = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      minH={'100vh'}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Box
        p={8}
        maxWidth={isMobile ? '70%' : '50%'}
        borderWidth={1}
        borderRadius={8}
        boxShadow='lg'
      >
        <Box textAlign='center'>
          <Heading textAlign='center' fontSize='4xl' fontWeight='extrabold'>
            {/* <Image
              src={logo}
              alt='logo'
              width='50%'
              height='50%'
              objectFit='contain'
            /> */}
            <Box mt={4} scale={isMobile ? 0.5 : 1}>
              <TalkToBeavs />
            </Box>
          </Heading>
        </Box>
        <Box my={4} textAlign='center'>
          <ButtonGroup mt={4} width='min' mx={4}>
            <Button onClick={() => navigate('/signup')} colorScheme='orange' mt={4}>
              Sign Up
            </Button>
            <Button onClick={() => navigate('/login')} colorScheme='orange' mt={4}>
              Login
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Flex>
  );
};

export default Landing;
