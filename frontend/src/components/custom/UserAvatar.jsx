import { Avatar, AvatarBadge, Flex, Stack, Text, Box, Heading, Divider } from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function UserAvatar({ user }) {
  const { name, avatarImg, online, email } = user;
  const [active, setActive] = useState(false);

  const onid = email.replace(/@.*/, '');

  const navigate = useNavigate();

  return (
    <Stack
      direction='column'
      ml={2}
      as={NavLink}
      to={`/profile/${onid}`}
      my={2}
      _activeLink={{
        color: 'white',
        textDecoration: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        cursor: 'pointer',
        borderRadius: '0.5rem',
        bg: 'orange.500',
      }}
    >
      <Flex
        direction='row'
        gap={12}
        padding={2}
        textAlign={'left'}
        _hover={{
          boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
          transform: 'scale(1.05)',
          cursor: 'pointer',
          borderRadius: '0.5rem',
          bg: 'orange.500',
        }}
      >
        <Avatar
          border={online ? '2px solid orange' : '2px solid white'}
          size='sm'
          name={name}
          src={avatarImg}
          opacity={online ? '1' : '0.5'}
        >
          <AvatarBadge
            boxSize='3'
            bg={online ? 'green.500' : 'gray.500'}
            offset={[-2, 2]}
            border={online ? '6px' : '0px'}
          />
        </Avatar>
        <Text align={'center'} transform={'translateX(-2.2rem)'}>
          {email.replace(/@.*/, '')}
        </Text>
      </Flex>
    </Stack>
  );
}

export const RegularAvatar = ({ user }) => {
  return (
    <Avatar
      size='sm'
      name={user ? user.name : ''}
      src={user ? user.avatar : 'https://bit.ly/broken-link'}
    />
  );
};

export const MenuContent = ({ user }) => {
  const { name, email } = user;
  const followers = user ? user.followers : [];
  const following = user ? user.following : [];
  return (
    <>
      <Box w='full'>
        <Flex direction='column' alignItems='flex-start' justifyContent='center'>
          <Box p={4}>
            <Heading size='md'>
              Hello, {user ? name.charAt(0).toUpperCase() + name.slice(1) : ''}!
            </Heading>
            <Text align={'center'}>{email}</Text>
          </Box>

          <Divider borderWidth='0.5px' borderColor='gray.200' opacity='0.5' />

          <Box p={4}>
            <Text align={'center'} mb={2}>
              Following: {following.length}
            </Text>

            <Text align={'center'}>Followers: {followers.length}</Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
};
