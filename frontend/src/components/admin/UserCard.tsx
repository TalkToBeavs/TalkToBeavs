import { Avatar, Box, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';

interface UserCardProps {
  username: string;
  profilePicture: string;
  onOptionsClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ username, profilePicture, onOptionsClick }) => {
  return (
    <Box
      p='4'
      borderRadius='md'
      boxShadow='md'
      width='70vw'
      height='5vh'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
    >
      <HStack spacing='4' align='stretch' justifyContent='space-between'>
        <HStack spacing='4'>
          <Avatar src={profilePicture} size='sm' />
          <Text fontSize='lg' fontWeight='bold'>
            {username}
          </Text>
        </HStack>

        <Button size='sm' onClick={onOptionsClick}>
          Options
        </Button>
      </HStack>
    </Box>
  );
};

export default UserCard;
