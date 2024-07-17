import { Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';

export function TalkToBeavsMobile() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Heading
      as='h1'
      textTransform='uppercase'
      letterSpacing='tight'
      size='md'
      color={useColorModeValue('orange.500', 'orange.500')}
    >
      Talk
      <Text as='span' mx={0} color={useColorModeValue('gray.900', 'white')} fontSize='xl'>
        to
      </Text>
      Beavs
    </Heading>
  );
}

export default function TalkToBeavs() {
  return (
    <Heading as='h1' textTransform='uppercase' letterSpacing='tight' size='2xl' color='orange.500'>
      Talk
      <Text as='span' mx={0} color={useColorModeValue('gray.900', 'white')}>
        2
      </Text>
      Beavs
    </Heading>
  );
}
