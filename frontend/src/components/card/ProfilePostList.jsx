import { Box, useMediaQuery } from '@chakra-ui/react';
import Post from './Post';

export default function ProfilePostList({ posts }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  return (
    <Box
      h={'100vh'}
      overflowY={'scroll'}
      display={'flex'}
      flexDirection={'column'}
      w={isMobile ? '100%' : '70%'}
      ml={isMobile ? 0 : 8}
      mt={4}
    >
      {posts && posts.map((post, i) => <Post key={i} post={post} />)}
    </Box>
  );
}
