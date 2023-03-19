import React from 'react';
import { Box } from '@chakra-ui/react';
import Post from './Post';

export default function ProfilePostList({ posts }) {
  return (
    <Box
      w={{
        base: '100%',
        sm: '100%',
        md: '80%',
        lg: '100%',
      }}
      // h="100%"
      my={8}
    >
      {posts && posts.map((post, i) => <Post key={i} post={post} />)}
    </Box>
  );
}
