import React from 'react';
import { Box, Stack, Flex, chakra, Link, useColorMode, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
export default function CTA() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <Flex
      justify='center'
      color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
      boxShadow='0 -2px 10px 0 rgba(0, 0, 0, 0.01)'
      p={{ base: 10, md: 20 }}
      bg={colorMode === 'light' ? 'gray.50' : 'gray.700'}
    >
      <Box
        w='full'
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 20 }}
        textAlign='center'
        maxW={{ base: 'md', md: '3xl' }}
      >
        <chakra.span
          fontSize={{ base: 'xl', sm: '2xl', md: '4xl', lg: '4xl' }}
          fontWeight='semibold'
          letterSpacing='tight'
          lineHeight='shorter'
          color={colorMode === 'light' ? 'gray.900' : 'gray.100'}
          mb={6}
        >
          <chakra.span display='block'>Ready to dive in?</chakra.span>
          <chakra.span
            display='block'
            letterSpacing={'tight'}
            bgGradient={'linear(to-tl, brand.600, brand.400)'}
            bgClip='text'
            fontWeight={'semibold'}
          >
            Join the community today.
          </chakra.span>
        </chakra.span>
        <Stack justifyContent='center' direction={{ base: 'column', sm: 'row' }} spacing={4} mt={4}>
          <Box display='inline-flex' rounded='md' shadow='md'>
            <Link
              to='/signup'
              w='full'
              as={ReactRouterLink}
              display='inline-flex'
              alignItems='center'
              justifyContent='center'
              px={5}
              py={3}
              border='solid transparent'
              fontWeight='bold'
              rounded='md'
              _light={{
                color: 'white',
              }}
              bg='brand.600'
              _dark={{
                bg: 'brand.500',
              }}
              _hover={{
                bg: 'brand.700',
                _dark: {
                  bg: 'brand.600',
                },
              }}
            >
              Get started
            </Link>
          </Box>
          <Box ml={3} display='inline-flex' rounded='md' shadow='md'>
            <Link
              href='https://github.com/nyumat/talktobeavs'
              isExternal
              w='full'
              display='inline-flex'
              alignItems='center'
              justifyContent='center'
              px={5}
              py={3}
              border='solid transparent'
              fontWeight='bold'
              rounded='md'
              color='brand.600'
              bg='white'
              _hover={{
                bg: 'rgba(255, 90, 0, 0.45)',
                color: 'white',
              }}
            >
              Learn more
            </Link>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
