import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
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

  const handleFollow = async (e) => {
    e.preventDefault();
    setUserIsFollowing(!userIsFollowing);
    const req = {
      currentUserEmail: loggedInUser.email,
      email: user.email,
    };
    dispatch(followUser(req));
  };

  if (loggedInUser?.email === user?.email)
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
              userIsFollowing ? (
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
