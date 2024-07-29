import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  StackDivider,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import UserOptionsModal from '../custom/UserOptionsModal';
import UserCard from './UserCard';

import { User, users } from '../../data/Users';

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { isOpen: userIsOpen, onOpen: userOnOpen, onClose: userOnClose } = useDisclosure();

  const handleOptionsClick = (user: User) => {
    console.log(`Options clicked for ${user.username}`);
    setSelectedUser(user);
    userOnOpen();
  };

  return (
    <>
      <UserOptionsModal isOpen={userIsOpen} onClose={userOnClose} user={selectedUser} />
      <Box p='4'>
        {/* Search and Filters */}
        <Flex mb='4' align='center' wrap='wrap'>
          <Input
            placeholder='Search users'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            m='1'
            minWidth='200px'
            maxWidth='300px'
          />
          <Select
            placeholder='Select filter'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            m='1'
            minWidth='200px'
            maxWidth='300px'
          >
            <option value='filter1'>Active</option>
            <option value='filter2'>Reported</option>
          </Select>
          <Button width='100px' m='1' justifyContent='center'>
            Search
          </Button>
        </Flex>

        {/* User Cards */}
        <VStack divider={<StackDivider borderColor='gray.200' />} spacing={4} align='stretch'>
          {' '}
          {users.map((user) => (
            <UserCard
              key={user.username}
              username={user.username}
              onOptionsClick={() => handleOptionsClick(user)}
            />
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default Users;
