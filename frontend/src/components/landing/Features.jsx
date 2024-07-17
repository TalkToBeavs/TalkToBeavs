import React, { useRef } from 'react';
import {
  Box,
  Button,
  chakra,
  SimpleGrid,
  useColorMode,
  Flex,
  Image,
  Text,
  Heading,
} from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import textChatLight from '@/assets/textChatLight.png';
import textChatDark from '@/assets/textChatDark.png';
import lobbyLight from '@/assets/lobbyLight.png';
import lobbyDark from '@/assets/lobbyDark.png';

const FeatureItem = ({ title, description, highlight = [] }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <chakra.h2
        mb={4}
        fontSize={{ base: '2xl', md: '4xl' }}
        fontWeight='bold'
        letterSpacing='normal'
        textAlign={{ base: 'center', md: 'left' }}
        color={colorMode === 'light' ? 'gray.900' : 'gray.400'}
        lineHeight={{ md: 'shorter' }}
        textShadow='2px 0 currentcolor'
      >
        {title}
      </chakra.h2>
      <chakra.p
        mb={5}
        textAlign={{ base: 'center', sm: 'left' }}
        color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
        fontSize={{ md: 'lg' }}
      >
        {description}
      </chakra.p>
      <Button
        w={{ base: 'full', sm: 'auto' }}
        size='lg'
        bg={colorMode === 'light' ? 'brand.500' : 'brand.300'}
        _hover={{
          bg: colorMode === 'light' ? 'brand.600' : 'brand.400',
        }}
        color='white'
        as='a'
      >
        Learn More
      </Button>
    </Box>
  );
};

export default function Features() {
  const { colorMode } = useColorMode();
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isInView2 = useInView(ref2, { once: true });
  const isInView3 = useInView(ref3, { once: true });
  const child = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        delay: 0.5,
      },
    },
  };
  return (
    <Box
      justify='center'
      color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      borderTop={
        !colorMode === 'light'
          ? '1px solid rgba(255, 255, 255, 0.25)'
          : '1px solid rgba(0, 0, 0, 0.1)'
      }
      borderBottom={
        !colorMode === 'light'
          ? '1px solid rgba(255, 255, 255, 0.25)'
          : '1px solid rgba(0, 0, 0, .1)'
      }
      borderRightWidth={'0px'}
      pos='relative'
      p={{ base: 10, md: 20 }}
      justifyContent='center'
      alignItems='center'
    >
      <Flex
        px={{ base: 8 }}
        py={{ base: 4 }}
        mx='auto'
        direction={'column'}
        gap={10}
        ref={ref}
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        borderRadius='lg'
      >
        <Box
          as={motion.div}
          variants={child}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          pt={32}
        >
          <Heading
            mb={8}
            letterSpacing='tight'
            textAlign='center'
            fontWeight='semibold'
            maxW={{
              base: 'xs',
              sm: 'xl',
              md: '2xl',
              lg: '2xl',
              xl: '3xl',
            }}
            mx='auto'
            fontSize={{ base: '3xl', sm: '2.5rem', md: '4xl' }}
            color={colorMode === 'light' ? 'gray.900' : 'gray.100'}
            w={{ base: 'full', sm: 'auto' }}
          >
            Making new friends has never been easier
          </Heading>

          <Text
            fontSize={{
              base: 'md',
              sm: 'xl',
              md: '2xl',
              lg: '1.5rem',
              xl: '1.8rem',
            }}
            color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
            textAlign='center'
            maxW={{
              base: 'xs',
              sm: 'lg',
              md: 'xl',
              lg: '2xl',
              xl: '3xl',
            }}
            mx='auto'
          >
            TalkToBeavs provides
            <chakra.span
              letterSpacing={'tight'}
              bgGradient={'linear(to-tl, brand.600, brand.400)'}
              bgClip='text'
              fontWeight={'semibold'}
            >
              {' '}
              every medium
            </chakra.span>{' '}
            for you to{' '}
            <chakra.span
              letterSpacing={'tight'}
              bgGradient={'linear(to-tl, brand.600, brand.400)'}
              bgClip='text'
              fontWeight={'semibold'}
            >
              connect with other beavers.{' '}
            </chakra.span>
            Whether you want to video chat, text chat or even post to the beaver feed,
            <chakra.span
              letterSpacing={'tight'}
              bgGradient={'linear(to-tl, brand.600, brand.400)'}
              bgClip='text'
              fontWeight={'semibold'}
            >
              {' '}
              we've got you covered.
            </chakra.span>
          </Text>
        </Box>
      </Flex>

      <Box
        px={{ base: 8 }}
        py={{ base: 20 }}
        mx='auto'
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        borderRadius='lg'
      >
        <SimpleGrid
          alignItems='center'
          columns={{ base: 1, md: 2 }}
          flexDirection='column-reverse'
          mb={24}
          p={4}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <motion.span variants={child} initial='hidden' animate={isInView2 ? 'visible' : 'hidden'}>
            <Box order={{ base: 'initial', md: 2 }}>
              <Box ref={ref2}>
                <chakra.h2
                  mb={4}
                  fontSize={{
                    base: '2xl',
                    sm: '3xl',
                    md: '4xl',
                  }}
                  fontWeight='semibold'
                  letterSpacing='tight'
                  textAlign={{ base: 'center', sm: 'left' }}
                  color={colorMode === 'light' ? 'gray.900' : 'gray.400'}
                  lineHeight={{ md: 'shorter' }}
                >
                  Instantly
                  <chakra.span
                    letterSpacing={'tight'}
                    bgGradient={'linear(to-tl, brand.600, brand.400)'}
                    fontWeight='semibold'
                    bgClip='text'
                  >
                    {' '}
                    pair{' '}
                  </chakra.span>
                  with
                  <chakra.span
                    letterSpacing={'tight'}
                    bgGradient={'linear(to-tl, brand.600, brand.400)'}
                    bgClip='text'
                    fontWeight='semibold'
                  >
                    {' '}
                    other beavs
                  </chakra.span>
                </chakra.h2>
                <chakra.p
                  mb={5}
                  textAlign={{ base: 'center', sm: 'left' }}
                  color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                  fontSize={{ md: 'lg' }}
                >
                  Join any of our chat lobbies to get matched with a fellow beaver. You can choose
                  to join a video or text lobby. Keep in mind that activity may vary depending on
                  the time of day.
                </chakra.p>
                <Button
                  w={{ base: 'full', sm: 'auto' }}
                  color='white'
                  colorScheme='brand'
                  aria-label='Join The Conversation'
                  variant={'solid'}
                  onClick={() => {
                    navigate('/signup');
                  }}
                  size='lg'
                  bgGradient={'linear(to-tl, brand.600, brand.400)'}
                  _hover={{
                    transform: 'scale(1.05)',
                    bgGradient: 'linear(to-tl, brand.700, brand.500)',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </motion.span>
          <Image
            w='full'
            h='full'
            borderRadius='lg'
            boxShadow='xl'
            shadow='2xl'
            border='1px solid rgba(0, 0, 0, 0.1)'
            objectFit='cover'
            src={colorMode === 'light' ? lobbyLight : lobbyDark}
          />
        </SimpleGrid>
        <SimpleGrid
          alignItems='start'
          columns={{ base: 1, md: 2 }}
          spacingY={{ base: 10, md: 32 }}
          spacingX={{ base: 10, md: 24 }}
        >
          <motion.span
            variants={child}
            initial='hidden'
            animate={isInView3 ? 'visible' : 'hidden'}
            style={{ order: 2 }}
          >
            <Box order={{ base: 'initial', md: 1 }}>
              <Box ref={ref3}>
                <chakra.h2
                  my={8}
                  mb={4}
                  fontSize={{
                    base: '2xl',
                    sm: '3xl',
                    md: '4xl',
                  }}
                  fontWeight='semibold'
                  letterSpacing='tight'
                  textAlign={{
                    base: 'center',
                    sm: 'left',
                    md: 'left',
                  }}
                  color={colorMode === 'light' ? 'gray.900' : 'gray.400'}
                  lineHeight={{ md: 'shorter' }}
                >
                  Freedom to chat <br />
                  <chakra.span
                    letterSpacing={'tight'}
                    bgGradient={'linear(to-tl, brand.600, brand.400)'}
                    bgClip='text'
                    fontWeight='semibold'
                  >
                    how you want
                  </chakra.span>
                </chakra.h2>
                <chakra.p
                  mb={5}
                  textAlign={{ base: 'center', sm: 'left' }}
                  color={colorMode === 'light' ? 'gray.600' : 'gray.400'}
                  fontSize={{ md: 'lg' }}
                >
                  Be it text or video chat, you will get matched to a random beaver for real-time
                  synchronous conversation. If a beaver is not following the rules, immediately
                  report them{' '}
                  <chakra.a
                    href='mailto:talktobeavs@gmail.com?subject=%5BREPORT%5D%20Observed%20Misconduct%20Within%20TalkToBeavs'
                    color='brand.500'
                    fontWeight='semibold'
                    textDecor={'underline'}
                  >
                    to us
                  </chakra.a>{' '}
                  and we will take action.
                </chakra.p>
                <Button
                  w={{ base: 'full', sm: 'auto' }}
                  color='white'
                  colorScheme='brand'
                  aria-label='Join The Conversation'
                  variant={'solid'}
                  onClick={() => {
                    navigate('/signup');
                  }}
                  size='lg'
                  bgGradient={'linear(to-tl, brand.600, brand.400)'}
                  _hover={{
                    transform: 'scale(1.05)',
                    bgGradient: 'linear(to-tl, brand.700, brand.500)',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </motion.span>
          <Image
            w='full'
            h='full'
            borderRadius='lg'
            boxShadow='xl'
            shadow='2xl'
            border='1px solid rgba(0, 0, 0, 0.1)'
            objectFit='cover'
            src={colorMode === 'light' ? textChatLight : textChatDark}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
