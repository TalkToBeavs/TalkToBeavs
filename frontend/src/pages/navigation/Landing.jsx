import { useNavigate } from 'react-router-dom';
import TalkToBeavs from '../../components/text/TalkToBeavs';
import SVGComponent from '../../assets/logo';
import { motion } from 'framer-motion';
import {
  comeFromLeftAnimation,
  comeFromTopAnimation,
  comeFromBottomAnimation,
} from '../../lib/animations/index';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  useMediaQuery,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

export default function Landing() {
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 600px)');
  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const text = `Stay connected with all of your peers. Make new friends. Get help with your classes. Welcome to TalkToBeavs.`;

  const letters = Array.from(text);

  return (
    <Container maxW={'5xl'}>
      <Flex as={motion.div} animation={comeFromTopAnimation} justify={'center'} align={'center'}>
        <SVGComponent />
      </Flex>
      <Stack
        my={isMobile ? -12 : -24}
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: -28, md: -36 }}
      >
        <Box
          as={motion.div}
          animation={comeFromLeftAnimation}
          initial='hidden'
          color={useColorModeValue('gray.800', 'white')}
          animate='visible'
          sx={{
            textShadow: '2px 2px #fbd38d',
          }}
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Chatting with peers{' '}
          <Text as={'i'} color={useColorModeValue('orange.300', 'orange.400')}>
            made easy.
          </Text>
        </Box>
        <Text
          color={useColorModeValue('gray.800', 'white')}
          maxW={'3xl'}
          fontSize={isMobile ? 'xs' : 'lg'}
          textAlign={'center'}
        >
          <motion.i
            variants={container}
            style={{
              overflow: 'visible',
              display: 'flex',
              fontSize: `${isMobile ? '0.50rem' : '1rem'}`,
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }}
            color={useColorModeValue('gray.800', 'white')}
            initial='hidden'
            animate='visible'
            aria-label='Stay connected with all of your peers. Make new friends. Get help with your classes. This is TalkToBeavs.'
          >
            {letters.map((letter, index) => (
              <motion.span variants={child} key={index} style={{ color: 'inherit' }}>
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.i>
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            as={motion.div}
            animation={comeFromBottomAnimation}
            px={6}
            bg={useColorModeValue('orange.300', 'orange.400')}
            onClick={() => navigate('/signup')}
            _hover={{ cursor: 'pointer', bg: 'orange.700' }}
          >
            Get started
          </Button>
          <Button
            bg={useColorModeValue('orange.300', 'orange.400')}
            _hover={{ cursor: 'pointer', bg: 'orange.700' }}
            onClick={() => {
              window.location.href = 'https://github.com/Nyumat/TalkToBeavs';
            }}
            rounded={'full'}
            px={6}
            as={motion.div}
            animation={comeFromBottomAnimation}
          >
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
