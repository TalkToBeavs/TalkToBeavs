import { ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deletePost,
  downvotePostAsync,
  editPost,
  upvotePostAsync,
} from '../../redux/slices/FeedSlice';
import EditPostModal from '../custom/EditPostModal';

const Post = ({ post }) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem('token');
  const onid = token?.split('@')[0];
  const parts = post.content.split(/[ \n]+/);
  const link = parts[0];
  const text = parts.slice(1).join(' ');
  const [shouldSetUpvote, setShouldSetUpvote] = React.useState(false);
  const [shouldSetDownvote, setShouldSetDownvote] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (shouldSetUpvote && post.upvotes) {
      setShouldSetUpvote(false);
    }
  }, [post.upvotes]);

  React.useEffect(() => {
    if (shouldSetDownvote && post.downvotes) {
      setShouldSetDownvote(false);
    }
  }, [post.downvotes]);

  React.useEffect(() => {
    if (!isEditing) {
      setIsEditing(false);
    }
  }, [isEditing]);

  React.useEffect(() => {
    if (!isDeleting) {
      setIsDeleting(false);
    }
  }, [isDeleting]);

  const handleUpvote = async () => {
    setShouldSetUpvote(true);
    if (!post.upvotes || !post.upvotes.includes(onid)) {
      if (post.downvotes && post.downvotes.includes(onid)) {
        //if its downvoted and they upvote do +2 instead of +1
        await dispatch(
          upvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: true, onid: onid }),
        );
      } else {
        await dispatch(
          upvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: false, onid: onid }),
        );
      }
    } else {
      await dispatch(
        upvotePostAsync({ postId: post._id, isUpvoted: true, isDownvoted: false, onid: onid }),
      );
    }
  };

  const handleDownvote = () => {
    setShouldSetDownvote(true);
    if (!post.downvotes || !post.downvotes.includes(onid)) {
      if (post.upvotes && post.upvotes.includes(onid)) {
        //if its upvoted and they downvote do -2 instead of -1
        dispatch(
          downvotePostAsync({ postId: post._id, isUpvoted: true, isDownvoted: false, onid: onid }),
        );
      } else {
        dispatch(
          downvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: false, onid: onid }),
        );
      }
    } else {
      dispatch(
        downvotePostAsync({ postId: post._id, isUpvoted: false, isDownvoted: true, onid: onid }),
      );
    }
  };

  const handleValidEditPost = (postId, content) => {
    setIsEditing(true);
    dispatch(editPost({ postId, content }));
    setIsEditing(true);

    setTimeout(() => {
      setIsEditing(false);
    }, 1000);
  };

  const handleDelete = () => {
    // for future, we can add a pop up confirmation modal asking user if they are sure that they
    // want to delete a post, but for now we'll just be deleting instantly...
    dispatch(deletePost({ postId: post._id }));
    setIsDeleting(true);

    // hard code ending the delete button's spinner animation cause I'm not sure how to handle loading state for create post from here
    setTimeout(() => {
      setIsDeleting(false);
    }, 1000);
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
        {post.postedBy.split('@')[0].toString() === onid.toString() && (
          <Flex alignItems='center'>
            {!isOpen && !isEditing ? (
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
            ) : null}

            {isOpen ? (
              <EditPostModal
                isOpen={isOpen}
                onClose={onClose}
                handleValidEditPost={handleValidEditPost}
                post={post}
              />
            ) : null}

            {isEditing ? <Spinner size='sm' color='gray.400' mt='0' /> : null}

            {isDeleting ? (
              <Spinner size='sm' color='gray.400' />
            ) : (
              <Tooltip label='Delete post' aria-label='Delete post'>
                <IconButton
                  icon={<DeleteIcon />}
                  variant='ghost'
                  size='sm'
                  colorScheme='red'
                  onClick={handleDelete}
                />
              </Tooltip>
            )}
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
            {shouldSetUpvote ? (
              <Spinner size='sm' color='gray.400' mr={4} />
            ) : (
              <IconButton
                icon={<ArrowUpIcon />}
                variant='ghost'
                size='sm'
                colorScheme={post.upvotes && post.upvotes.includes(onid) ? 'green' : 'gray'}
                onClick={handleUpvote}
                mr={2}
              />
            )}
          </Tooltip>

          <Text fontSize='sm' color='gray.500' mr={2}>
            {post.upvotes.length - post.downvotes.length}
          </Text>

          <Tooltip label='Downvote' aria-label='Downvote'>
            {shouldSetDownvote ? (
              <Spinner size='sm' color='gray.400' ml={4} />
            ) : (
              <IconButton
                icon={<ArrowDownIcon />}
                variant='ghost'
                size='sm'
                colorScheme={post.downvotes && post.downvotes.includes(onid) ? 'red' : 'gray'}
                onClick={handleDownvote}
                mr={2}
              />
            )}
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
