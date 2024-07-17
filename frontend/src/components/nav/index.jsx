import { Flex, chakra, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import LeftNav from './LeftNav';
import RightNav from './RightNav';

const Navbar = () => {
  const bg = useColorModeValue('gray.100', 'gray.900');
  return (
    <>
      <chakra.header bg={bg} w='full' px={{ base: 2, sm: 4 }} py={4}>
        <Flex
          alignItems='center'
          justifyContent={{ base: 'space-between', md: 'center' }}
          gap={36}
          mx='auto'
        >
          <LeftNav />
          <RightNav />
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;
