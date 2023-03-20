import React from 'react';
import {
  Heading,
  Box,
  Flex,
  Stack,
  Divider,
  Text,
  useColorModeValue,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import TalkToBeavs from '../../components/text/TalkToBeavs';
import {
  slideAnimation,
  comeFromRightAnimation,
  comeFromLeftAnimation,
  fadeIntoViewAnimation,
} from '../../lib/animations';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
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

  const letters = Array.from('By Students, For Students.');

  return (
    <Flex minH={'100vh'} align={'flex-start'} justify={'center'} direction={'column'} w={'100vw'}>
      <Stack spacing={4} mx={'auto'} maxW={'md'} py={16} px={16}>
        <Flex
          direction='column'
          align='center'
          justify='center'
          as={motion.div}
          animation={slideAnimation}
        >
          <TalkToBeavs />
          <motion.i
            style={{ overflow: 'hidden', display: 'flex', fontSize: '1rem' }}
            variants={container}
            color={useColorModeValue('gray.800', 'white')}
            initial='hidden'
            animate='visible'
            aria-label='By Students, For Students.'
          >
            {letters.map((letter, index) => (
              <motion.span variants={child} key={index}>
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.i>
        </Flex>

        <Box w={'full'} as={motion.div} animation={comeFromRightAnimation} textAlign={'center'}>
          <Heading
            as={motion.div}
            animation={fadeIntoViewAnimation}
            fontSize={'4xl'}
            fontWeight='extrabold'
            color={useColorModeValue('gray.800', 'white')}
            textAlign={'center'}
          >
            <motion.i
              style={{ overflow: 'hidden', textAlign: 'center', fontSize: '2rem' }}
              variants={container}
              color={useColorModeValue('gray.800', 'white')}
              initial='hidden'
              animate='visible'
            >
              {Array.from('Start Chatting!').map((letter, index) => (
                <motion.span variants={child} key={index}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.i>
          </Heading>
          <Divider w={'100%'} my={4} />

          <SimpleGrid minChildWidth='220px' spacing='40px' w={'full'} textAlign='center'>
            <Flex direction='row' align='center' gap={42}>
              <Box
                as={motion.div}
                animation={comeFromLeftAnimation}
                shadow='xl'
                bg='orange.500'
                height='20'
                width='200px'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                transition={'all 0.3s ease-in-out'}
                _hover={{
                  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                  transform: 'scale(1.05)',
                  padding: '1rem',
                  cursor: 'pointer',
                  borderRadius: '0.5rem',
                  bg: 'orange.500',
                  color: useColorModeValue('white', 'gray.900'),
                }}
              >
                <Center h='100%' w='100%' as='button' onClick={() => navigate('/video')}>
                  <Text fontSize={'xl'} fontWeight='extrabold'>
                    Video Chat
                  </Text>
                </Center>
              </Box>
              <Box
                shadow='xl'
                as={motion.div}
                animation={comeFromRightAnimation}
                bg='orange.500'
                height='20'
                width='200px'
                borderRadius='lg'
                role='group'
                cursor='pointer'
                transition={'all 0.3s ease-in-out'}
                _hover={{
                  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                  transform: 'scale(1.05)',
                  padding: '1rem',
                  cursor: 'pointer',
                  borderRadius: '0.5rem',
                  bg: 'orange.500',
                  color: useColorModeValue('white', 'gray.900'),
                }}
              >
                <Center h='100%' w='100%' as='button' onClick={() => navigate('/text')}>
                  <Text fontSize={'xl'} fontWeight='extrabold'>
                    Text Chat
                  </Text>
                </Center>
              </Box>
            </Flex>
          </SimpleGrid>
        </Box>
      </Stack>
    </Flex>
  );
}
