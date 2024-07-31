import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../../components/card/Post';
import CreatePostModal from '../../components/custom/CreatePostModal';
import ReportPostModal from "../../components/custom/ReportPostModal";
import { createPost, loadPosts, selectAllPosts } from '../../redux/slices/FeedSlice';

function Feed() {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: reportIsOpen, onOpen: reportOnOpen, onClose: reportOnClose } = useDisclosure();

  const [reportedPost, setReportedPost] = useState(null)

  const toast = useToast()
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  const handleValidPost = (post) => {
    dispatch(createPost(post));
  };

  const handleReportOpening = (post) => {
    setReportedPost(post)
    reportOnOpen()
  }

  const handleValidReport = (reportReason, post) =>{
    console.log(post)
    console.log(reportReason)
    //Todo: Add report to database

    //Display Toast for successful report
    toast({
      title: 'Report Submitted.',
      description: `Post by ${post.postedBy.split('@')[0]} has been reported.`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    
    (
      <Flex
        w='100%'
        h={isMobile ? 'calc(100vh - 80px)' : '100vh'}
        direction='column'
        justify='center'
        align='center'
      >
        <Box display={'flex'} gap={12} flexDirection={'row'} justify='center' align='center'>
          <Box
            display={'flex'}
            flexDirection={'column'}
            justify='center'
            align='center'
            w={isMobile ? '100%' : '30%'}
            mt={2}
          >
            <IconButton
              aria-label='Create Post'
              icon={<EditIcon />}
              color={'orange.500'}
              bg={useColorModeValue('gray.300', 'gray.800')}
              onClick={onOpen}
              size='lg'
              mt={4}
            />
            <CreatePostModal isOpen={isOpen} onClose={onClose} handleValidPost={handleValidPost} />
            <ReportPostModal isOpen={reportIsOpen} onClose={reportOnClose} onSubmit={handleValidReport} post={reportedPost}/>
          </Box>

          <Text
            textAlign='center'
            as={'h1'}
            fontSize={{
              base: '3xl',
              md: '4xl',
              lg: '5xl',
              xl: '6xl',
            }}
            fontWeight='bold'
            textShadow={`0 0 5px ${useColorModeValue('orange', 'white')}`}
          >
            The
            <Text as={'span'} mx={1} color={'orange.500'} textShadow={'0 0 5px #D97706'}>
              Beaver
            </Text>
            Feed
          </Text>

          <Divider w={'50%'} mb={4} />
        </Box>
        <Box
          h={'100vh'}
          overflowY={'scroll'}
          display={'flex'}
          flexDirection={'column'}
          w={isMobile ? '100%' : '70%'}
          ml={isMobile ? 0 : 8}
          mt={4}
        >
          {allPosts?.map((post, i) => (
            <Post key={i} post={post} handleReportOpening={handleReportOpening} />
          ))}
        </Box>
      </Flex>
    )
  );
}

export default Feed;
