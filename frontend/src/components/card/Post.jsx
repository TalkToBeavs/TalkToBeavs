import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Spacer, Text, Tooltip, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { upvotePost, downvotePost } from '../redux/slices/FeedSlice'
import moment from 'moment';

const Post = ({ post }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const dispatch = useDispatch();

  const handleUpvote = () => {
    if (isUpvoted === false) {
      dispatch(upvotePost({ _id: post._id }));
      setIsUpvoted(true);
      setIsDownvoted(false);
    } else {
      dispatch(downvotePost({ _id: post._id }));
      setIsUpvoted(false);
    }
  };

  const handleDownvote = () => {
    if (isDownvoted === false) {
      dispatch(downvotePost({ _id: post._id }));
      setIsDownvoted(true);
      setIsUpvoted(false);
    } else {
      dispatch(upvotePost({ _id: post._id }));
      setIsDownvoted(false);
    }
  };

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={3}
      _hover={{ shadow: 'lg' }}
      w='70%'
      maxW={isMobile ? '100%' : '60%'}
      margin='0 auto'
      marginBottom={6}
    >
      <Text fontSize='lg' fontWeight='bold' mb={2}>
        {post.content}
      </Text>

      <Flex alignItems='center' mb={2}>
        <Text fontSize='sm' color='gray.500'>
          {moment(post.createdAt).calendar()}
        </Text>
        <Spacer />
      </Flex>

      <Flex alignItems='center' justifyContent='space-between'>
        <Flex alignItems='center'>
          <Tooltip label='Upvote' aria-label='Upvote'>
            <IconButton
              icon={<ArrowUpIcon />}
              variant='ghost'
              size='sm'
              colorScheme={isUpvoted ? 'green' : 'gray'}
              onClick={handleUpvote}
              mr={2}
            />
          </Tooltip>

          <Text fontSize='sm' color='gray.500' mr={2}>
            {post.upvotes + post.downvotes}
          </Text>

          <Tooltip label='Downvote' aria-label='Downvote'>
            <IconButton
              icon={<ArrowDownIcon />}
              variant='ghost'
              size='sm'
              colorScheme={isDownvoted ? 'red' : 'gray'}
              onClick={handleDownvote}
              ml={2}
            />
          </Tooltip>
        </Flex>

        <Box textAlign='right'>
          <Text fontSize='sm' color='gray.500'>
            {post.postedBy.split('@')[0]}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;
