import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { followUser, selectIsFollowing, selectUser } from '../../redux/slices/UserSlice';

// Current user can follow/unfollow the props.user
export default function FollowButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector(selectUser);
  const isFollowing = useSelector(selectIsFollowing(user._id));
  const [userIsFollowing, setUserIsFollowing] = React.useState(isFollowing);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const email = localStorage.getItem('token');

  const handleFollow = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUserIsFollowing(!userIsFollowing);
    const req = {
      currentUserEmail: loggedInUser.email,
      email: user.email,
    };
    dispatch(followUser(req)).finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    setUserIsFollowing(isFollowing);
  }, [isFollowing]);

  if (email === user?.email)
    return (
      <Flex>
        <Box my={6}>
          <Button
            colorScheme={'orange'}
            variant='outline'
            size='sm'
            onClick={() => {
              navigate('/edit');
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Flex>
    );

  return (
    loggedInUser && (
      <Flex>
        <Box my={6}>
          <IconButton
            onClick={handleFollow}
            aria-label='Follow'
            icon={
              isSubmitting ? (
                <Spinner size='sm' color='gray.400' />
              ) : userIsFollowing ? (
                <>
                  <Flex
                    direction='row'
                    gap={2}
                    mx={2}
                    align='center'
                    justify='center'
                    w='100%'
                    h='100%'
                  >
                    <Text ml={2} fontSize='sm'>
                      Following
                    </Text>
                    <CheckIcon />
                  </Flex>
                </>
              ) : (
                <>
                  <Flex
                    direction='row'
                    gap={2}
                    mx={2}
                    align='center'
                    justify='center'
                    w='100%'
                    h='100%'
                  >
                    <Text ml={2} fontSize='sm'>
                      Follow
                    </Text>
                    <AddIcon />
                  </Flex>
                </>
              )
            }
          ></IconButton>
        </Box>
      </Flex>
    )
  );
}
