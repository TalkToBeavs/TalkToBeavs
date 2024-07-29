import { MenuContent, RegularAvatar } from '@/components/custom/UserAvatar';
import ThemeToggle from '@/components/layout/ThemeToggle';
import {
  Button,
  ButtonGroup,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VisuallyHidden,
  chakra,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RightNav() {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const user = useSelector((state) => state.user.data);
  const email = user ? user.email : '';
  console.log(user);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <HStack
      spacing={3}
      display={{
        base: 'none',
        md: 'none',
        lg: 'inline-flex',
      }}
      mx={8}
      alignItems='center'
    >
      {!user && (
        <ButtonGroup spacing={4}>
          <Button
            size='sm'
            colorScheme='brand'
            variant='outline'
            _hover={{
              bg: colorMode === 'light' ? 'brand.600' : 'brand.900',
              color: colorMode === 'light' ? 'brand.100' : 'brand.400',
            }}
            color={colorMode === 'light' ? 'brand.500' : 'brand.400'}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
          <Button
            size='sm'
            colorScheme='brand'
            variant='outline'
            color={colorMode === 'light' ? 'brand.500' : 'brand.400'}
            _hover={{
              bg: colorMode === 'light' ? 'brand.600' : 'brand.900',
              color: colorMode === 'light' ? 'brand.100' : 'brand.400',
            }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
        </ButtonGroup>
      )}

      <chakra.a
        p={3}
        color='gray.800'
        href='https://github.com/nyumat/talktobeavs'
        _dark={{
          color: 'inherit',
        }}
        rounded='sm'
        _hover={{
          color: 'gray.800',
          _dark: {
            color: 'gray.600',
          },
        }}
        aria-label='TalkToBeavs on GitHub'
      >
        <AiFillGithub size={24} />
        <VisuallyHidden>TalkToBeavs on GitHub</VisuallyHidden>
      </chakra.a>

      {user && (
        <Menu isLazy>
          <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
            <RegularAvatar user={user} />
          </MenuButton>
          <MenuList>
            <MenuContent user={user} />
            <MenuDivider />
            <MenuItem>
              <Text
                onClick={() => {
                  navigate('/logout');
                }}
              >
                Logout
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <ThemeToggle />
    </HStack>
  );
}
