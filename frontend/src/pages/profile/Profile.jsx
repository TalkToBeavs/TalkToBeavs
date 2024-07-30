import { Avatar, Box, Divider, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfilePostList from '../../components/card/ProfilePostList';
import FollowButton from '../../components/custom/FollowButton';
import ReportPostModal from '../../components/custom/ReportPostModal';
import ReportProfileModal from '../../components/custom/ReportProfileModal';
import FollowStats from '../../components/text/FollowStats';
import useProfile from '../../hooks/useProfile';
import { fadeInAnimation } from '../../lib/animations';
import { loadPosts, selectAllPosts } from '../../redux/slices/FeedSlice';

export default function Profile() {
  const { onid } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const profile = useProfile({ onid });
  const allPosts = useSelector(selectAllPosts)?.filter(
    (post) => post.postedBy.split('@')[0].toString() === onid.toString(),
  );

  const {
    isOpen: reportPostIsOpen,
    onOpen: reportPostOnOpen,
    onClose: reportPostOnClose,
  } = useDisclosure();
  const {
    isOpen: reportUserIsOpen,
    onOpen: reportUserOnOpen,
    onClose: reportUserOnClose,
  } = useDisclosure();

  const [reportedPost, setReportedPost] = useState(null);
  const [reportedUser, setReportedUser] = useState(null);

  useEffect(() => {
    document.querySelector('title').innerHTML = `${onid}'s Profile`;

    return () => {
      document.querySelector('title').innerHTML = 'Talk2Beavs - OSU CS494';
    };
  }, [onid]);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const handleReportPostOpening = (post) => {
    setReportedPost(post);
    reportPostOnOpen();
  };

  const handleReportUserOpening = (user) => {
    setReportedUser(user);
    reportUserOnOpen();
  };

  const handleValidPostReport = (reportReason, post) => {
    console.log(post);
    console.log(reportReason);
    //Todo: Add report to database

    //Display Toast for successful report
    toast({
      title: 'Report Submitted.',
      description: `Post by ${post.postedBy.split('@')[0]} has been reported.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleValidUserReport = (reportReason, user) => {
    console.log(user);
    console.log(reportReason);
    //Todo: Add report to database

    //Display Toast for successful report
    toast({
      title: 'Report Submitted.',
      description: `User has been reported.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    profile && (
      <>
        <ReportPostModal
          isOpen={reportPostIsOpen}
          onClose={reportPostOnClose}
          onSubmit={handleValidPostReport}
          post={reportedPost}
        />
        <ReportProfileModal
          isOpen={reportUserIsOpen}
          onClose={reportUserOnClose}
          onSubmit={handleValidUserReport}
          user={reportedUser}
        />
        <Box w='100%' h='100%' py={8}>
          <Flex
            direction='column'
            align='center'
            justify='center'
            w='100%'
            h='100%'
            as={motion.div}
            animation={fadeInAnimation}
          >
            <Avatar size='2xl' name={profile.name} src={profile.avatarImg} mb={4} />
            <FollowButton user={profile} handleReportUserOpening={handleReportUserOpening} />
            <Heading as='h1' size='2xl' mb={4}>
              {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
            </Heading>
            <Box my={4} maxW='40%' textAlign='center'>
              {profile.standing && profile.major && (
                <Box mb={4}>
                  <Text>
                    {profile.standing} in {profile.major}
                  </Text>
                </Box>
              )}
              {profile.bio && (
                <Box mb={4}>
                  <Text fontStyle='italic'>"{profile.bio}"</Text>
                </Box>
              )}
            </Box>
            <Divider
              w={{
                base: '50%',
                sm: '60%',
                md: '50%',
                lg: '55%',
              }}
              mb={4}
            />

            <FollowStats onid={onid} user={user} />

            <Divider
              w={{
                base: '50%',
                sm: '60%',
                md: '50%',
                lg: '55%',
              }}
              mb={4}
            />
            <Heading as='h2' size='lg' mt={8} mb={4}>
              {onid}'s Posts
              <Divider mt={2} />
            </Heading>

            <ProfilePostList posts={allPosts} handleReportOpening={handleReportPostOpening} />
          </Flex>
        </Box>
      </>
    )
  );
}
