import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box w='100%' h='100%'>
        <IconButton
          bg={'none'}
          _focus={{ bg: 'none' }}
          _active={{ bg: 'none' }}
          aria-label='Toggle Color Mode'
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          position='fixed'
          top='2'
          left='0'
          m={2}
          zIndex='1'
        />
      </Box>
    </>
  );
}
