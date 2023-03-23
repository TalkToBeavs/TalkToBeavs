import { ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Spacer, Text, Tooltip, useMediaQuery, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { upvotePostAsync, downvotePostAsync, editPost, deletePost } from '../../redux/slices/FeedSlice'
import EditPostModal from '../custom/EditPostModal';
import moment from 'moment';

const Post = ({ post }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem('token');
  const onid = token?.split('@')[0];
  const parts = post.content.split(/[ \n]+/);
  const link = parts[0];
  const text = parts.slice(1).join(' ');
  const dispatch = useDispatch();

  const handleUpvote = () => {
    if (!post.upvotes || !post.upvotes.includes(onid)) {
      if (post.downvotes && post.downvotes.includes(onid)) {
        //if its downvoted and they upvote do +2 instead of +1
        dispatch(upvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: true, onid: onid }))
      } else {
        dispatch(upvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: false, onid: onid }))
      }
    } else {
      dispatch(upvotePostAsync({ postId: post._id, isUpvoted: true, isDownvoted: false, onid: onid }))
    }
  };

  const handleDownvote = () => {
    if (!post.downvotes || !post.downvotes.includes(onid)) {
      if (post.upvotes && post.upvotes.includes(onid)) {
        //if its upvoted and they downvote do -2 instead of -1
        dispatch(downvotePostAsync({ postId: post._id, isUpvoted: true, isDownvoted: false, onid: onid }))
      } else {
        dispatch(downvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: false, onid: onid }))
      }
    } else {
      dispatch(downvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: true, onid: onid }))
    }
  }

  const handleValidEditPost = (postId, content) => {
    dispatch(editPost({ postId, content }));
  };

  const handleDelete = () => {
    // for future, we can add a pop up confirmation modal asking user if they are sure that they 
    // want to delete a post, but for now we'll just be deleting instantly...
    dispatch(deletePost({ postId: post._id }));
  }

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
      <Flex justifyContent='space-between' alignItems='center' mb={2}>
      {post.content.includes('https://giphy.com') ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <iframe
            src={link}
            width='150'
            height='150'
            frameBorder='0'
            className='giphy-embed'
            allowFullScreen
            style={{ display: 'block', margin: '0', marginBottom: '0.5rem' }}
          ></iframe>

          <Text fontSize='lg' fontWeight='bold' mb={2} style={{ marginLeft: '0' }}>
            {text}
          </Text>
        </div>
      ) : (
        <Text fontSize='lg' fontWeight='bold' mb={2}>
          {post.content}
        </Text>
      )}
        {(post.postedBy.split('@')[0].toString() === onid.toString()) && (
          <Flex alignItems='center'>
            {!isOpen ? (
              <Tooltip label='Edit post' aria-label='Edit post'>
                <IconButton
                  icon={<EditIcon />}
                  variant='ghost'
                  size='sm'
                  colorScheme='teal'
                  onClick={onOpen}
                  mr={2}
                />
              </Tooltip> 
            ) : (
              <IconButton
              icon={<EditIcon />}
              variant='ghost'
              size='sm'
              colorScheme='teal'
              onClick={onOpen}
              mr={2}
            />
            )}
            <EditPostModal isOpen={isOpen} onClose={onClose} handleValidEditPost={handleValidEditPost} post = {post} />
            <Tooltip label='Delete post' aria-label='Delete post'>
              <IconButton
                icon={<DeleteIcon />}
                variant='ghost'
                size='sm'
                colorScheme='red'
                onClick={handleDelete}
              />
            </Tooltip>
          </Flex>
        )}
      </Flex>

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
              colorScheme={post.upvotes && post.upvotes.includes(onid) ? 'green' : 'gray'}
              onClick={handleUpvote}
              mr={2}
            />
          </Tooltip>

          <Text fontSize='sm' color='gray.500' mr={2}>
            {post.upvotes.length - post.downvotes.length}
          </Text>

          <Tooltip label='Downvote' aria-label='Downvote'>
            <IconButton
              icon={<ArrowDownIcon />}
              variant='ghost'
              size='sm'
              colorScheme={(post.downvotes && post.downvotes.includes(onid)) ? 'red' : 'gray'}
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