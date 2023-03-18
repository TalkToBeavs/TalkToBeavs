import React from 'react';
import {
  Heading,
  Box,
  Flex,
  Stack,
  Divider,
  HStack,
  Text,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
  AbsoluteCenter,
  Center,
} from '@chakra-ui/react';
import TalkToBeavs from '../../components/text/TalkToBeavs';
import { slideAnimation, popInAnimation, comeFromLeftAnimation } from '../../lib/animations';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex minH={'100vh'} align={'flex-start'} justify={'center'} direction={'column'} w={'full'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Flex
          direction='column'
          align='center'
          justify='center'
          as={motion.div}
          animation={slideAnimation}
          sx={{
            animationDelay: '0.2s',
          }}
        >
          <TalkToBeavs />
          <Text
            fontSize={'xl'}
            fontWeight='extrabold'
            color={useColorModeValue('gray.800', 'white')}
          >
            By Students, For Students.
          </Text>
        </Flex>

        <Box w={'full'} textAlign='center'>
          <Heading
            as={motion.div}
            animation={comeFromLeftAnimation}
            fontSize={'4xl'}
            fontWeight='extrabold'
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            Start Chatting!
          </Heading>
          <Divider w={'100%'} my={4} />

          <SimpleGrid minChildWidth='220px' spacing='40px' w={'full'} textAlign='center'>
            <Flex direction='row' align='center' gap={42}>
              <Box
                as={motion.div}
                animation={comeFromLeftAnimation}
                sx={{
                  animationDelay: '0.2s',
                }}
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
                animation={comeFromLeftAnimation}
                sx={{
                  animationDelay: '0.2s',
                }}
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
