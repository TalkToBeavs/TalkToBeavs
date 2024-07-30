import { Box, useMediaQuery } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Post from './Post';

export default function ProfilePostList({ posts, handleReportOpening }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const user = useSelector((state) => state.user.data);
  return (
    user && (
      <Box
        h={'100vh'}
        overflowY={'scroll'}
        display={'flex'}
        flexDirection={'column'}
        w={isMobile ? '100%' : '70%'}
        ml={isMobile ? 0 : 8}
        mt={4}
      >
        {posts &&
          posts.map((post, i) => (
            <Post key={i} user={user} post={post} handleReportOpening={handleReportOpening} />
          ))}
      </Box>
    )
  );
}
