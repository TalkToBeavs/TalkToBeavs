import { Box, useMediaQuery } from '@chakra-ui/react';
import Post from './Post';
import { useSelector } from 'react-redux';

export default function ProfilePostList({ posts }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const user = useSelector((state) => state.user.data);
  return user &&(
    <Box
      h={'100vh'}
      overflowY={'scroll'}
      display={'flex'}
      flexDirection={'column'}
      w={isMobile ? '100%' : '70%'}
      ml={isMobile ? 0 : 8}
      mt={4}
    >
      {posts && posts.map((post, i) => <Post key={i} user={user} post={post} />)}
    </Box>
  );
}
