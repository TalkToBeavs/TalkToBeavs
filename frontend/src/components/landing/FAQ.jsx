import React, { useRef } from 'react';
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorMode,
  Heading,
  Text,
  Flex,
  chakra,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { motion, useInView } from 'framer-motion';

function FAQItem({ title, description }) {
  return (
    <AccordionItem minH={'full'}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box
                flex='1'
                textAlign='left'
                fontWeight={'medium'}
                fontSize={{
                  base: 'md',
                  sm: 'lg',
                  md: '2xl',
                  lg: '1.5rem',
                  xl: '1.8rem',
                }}
              >
                {title}
              </Box>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 270 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.7 }}
              >
                {isExpanded ? <MinusIcon fontSize='12px' /> : <AddIcon fontSize='12px' />}
              </motion.div>
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            fontSize={{
              base: 'md',
              sm: 'lg',
              md: 'xl',
              lg: 'xl',
              xl: '1.5rem',
            }}
          >
            <Text>{description}</Text>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

export default function FAQ() {
  const { colorMode } = useColorMode();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
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
        delay: 0.8,
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
        py={{ base: 20 }}
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
        >
          <Heading
            my={4}
            fontSize={{
              base: '3xl',
              lg: '4xl',
            }}
            fontWeight='semibold'
            letterSpacing='tight'
            _light={{
              color: 'gray.900',
            }}
            maxW={{
              lg: '3xl',
              base: 'md',
            }}
            textAlign={{ md: 'center' }}
            mx={{ md: 'auto', lg: 'auto' }}
          >
            Frequently asked questions
          </Heading>
          <chakra.p
            fontSize={{ base: 'lg', lg: 'xl' }}
            color='gray.500'
            _dark={{
              color: 'gray.400',
            }}
            textAlign={{ md: 'center' }}
            mx={{ md: 'auto', lg: 'auto' }}
            maxW={{
              lg: '2xl',
              base: 'xl',
            }}
          >
            Get answers to common questions about our platform. If there's a question you have that
            isn't answered here, feel free to{' '}
            <chakra.a
              href='mailto:talktobeavs@gmail.com?subject=%5BQUESTION%5D%20Question%20About%20TalkToBeavs'
              color='brand.500'
              fontWeight='semibold'
              textDecor={'underline'}
            >
              email us.
            </chakra.a>{' '}
          </chakra.p>
        </Box>
        <Accordion allowToggle shadow='md' borderRadius='sm' w='full' h='full' maxW='3xl' mx='auto'>
          <FAQItem
            title='Why did you create TalkToBeavs?'
            description="We created TalkToBeavs to help students connect with each other in a safe and secure environment. Popular options like Omegle didn't put privacy and security first. We hope that TalkToBeavs will help students make new friends and find new opportunities."
          />
          <FAQItem
            title='How do I change my password?'
            description="We're currently working on a way to change your password. Stay tuned for more information."
          />
          <FAQItem
            title='What is the code of conduct?'
            description='The code of conduct is a set of rules that all users must follow. The code of conduct is currently being drafted. Stay tuned for more information.'
          />
          <FAQItem
            title='How is my data being used?'
            description='Your data is only being used to help us improve the platform. We do not sell your data to third parties. All sensitive data is encrypted and stored securely.'
          />
          <FAQItem
            title='I need to report a user. How do I do that?'
            description="You can report a user by emailing us at talktobeavs@gmail.com. Please include the user's name and a description of the incident."
          />
          <FAQItem
            title='Where do I delete my account?'
            description='You can delete your account by emailing us at talktobeavs@gmail.com. Please include your username and a reason for deleting your account.'
          />
          <FAQItem
            title='Where is the source code?'
            description='The source code is available on GitHub. You can find it on our Footer and Navbar.'
          />
        </Accordion>
      </Flex>
    </Box>
  );
}
