import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        bg={'none'}
        _focus={{ bg: 'none' }}
        _active={{ bg: 'none' }}
        _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
        aria-label='Toggle Color Mode'
        onClick={toggleColorMode}
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        m={2}
        zIndex='1'
      />
    </>
  );
}
