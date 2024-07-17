import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const BASE_URL = import.meta.env.VITE_APP_PROD_BACKEND_URL;

if (!BASE_URL) throw new Error('Missing backend URL');

export default function CreatePostModal({ isOpen, onClose, handleValidPost }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [shouldFetchTrending, setShouldFetchTrending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleGifClick = (url) => {
    setContent(url);
  };

  async function fetchDataSearch() {
    const response = await fetch(`${BASE_URL}/api/feed/giphy_search?q=${searchValue}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await response.json();

    setData(json.data.data);
    setShouldFetch(false);
  }

  async function fetchDataTrending() {
    const response = await fetch(`${BASE_URL}/api/feed/giphy_trending`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await response.json();
    setData(json.data.data);
    setShouldFetchTrending(false);
  }

  useEffect(() => {
    if (shouldFetch) {
      fetchDataSearch();
    }
  }, [shouldFetch, searchValue]);

  useEffect(() => {
    if (shouldFetchTrending) {
      fetchDataTrending();
    }
  }, [shouldFetchTrending]);

  useEffect(() => {
    if (!isCreating) {
      setIsCreating(false);
    }
  }, [isCreating]);

  const userData = useSelector((state) => state.user.data);

  const handleSubmit = () => {
    if (content.length === 0) {
      setError(true);
    } else {
      let post = {
        content: content,
        postedBy: userData.email,
      };
      onClose();
      setError(false);
      setContent('');
      handleValidPost(post);
    }
  };

  const handleClose = () => {
    setContent('');
    setError(false);
    onClose();
  };

  return (
    <>
      {isCreating ? (
        <>
          <Spinner size='lg' color='gray.400' mt='8' />
        </>
      ) : (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setData('');
            setLoading(true);
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id='content' isRequired isInvalid={error}>
                <FormLabel>Post Content</FormLabel>
                <Divider my={4} />
                <Textarea
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  _focusVisible={{
                    borderColor: 'orange.500',
                    boxShadow: '0 0 0 1px orange.500',
                  }}
                  _focus={{ borderColor: 'orange.500' }}
                />
                {error && <FormErrorMessage>Post content is required</FormErrorMessage>}
              </FormControl>
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </ModalBody>
            <ModalFooter>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      onClick={() => {
                        setSearchValue('');
                        if (!isOpen) {
                          setLoading(true);
                          setShouldFetchTrending(true);
                        } else {
                          setData('');
                        }
                      }}
                    >
                      {isOpen ? 'Close' : 'Add a GIF'}
                    </MenuButton>
                    <MenuList>
                      <Input
                        placeholder='Search for GIFs'
                        onChange={(event) => {
                          setSearchValue(event.target.value);
                          setErrorMessage('');
                        }}
                        value={searchValue}
                        onKeyDown={(event) => {
                          if (event.keyCode === 13) {
                            if (!searchValue) {
                              setErrorMessage('Please enter a search term');
                            } else {
                              setLoading(true);
                              setShouldFetch(true);
                            }
                          }
                        }}
                      />
                      {errorMessage && (
                        <div style={{ color: 'red', fontSize: 16, marginLeft: 10 }}>
                          {errorMessage}
                        </div>
                      )}
                      <Button
                        m={3}
                        onClick={() => {
                          if (!searchValue) {
                            setErrorMessage('Please enter a search term');
                          } else {
                            setLoading(true);
                            setShouldFetch(true);
                          }
                        }}
                      >
                        Search
                      </Button>
                      <Button
                        m={3}
                        onClick={() => {
                          if (!data) {
                            setLoading(true);
                          }
                          setSearchValue('');
                          setShouldFetchTrending(true);
                          setTimeout(() => {
                            setShouldFetchTrending('');
                          }, 1000);
                        }}
                      >
                        Trending (Default)
                      </Button>
                      <Box maxHeight='200px' overflowY='scroll'>
                        <SimpleGrid columns={5} spacing={0} align='center' justify='center'>
                          {data &&
                            data
                              .filter(
                                (value, index, self) =>
                                  self.findIndex((v) => v.id === value.id) === index,
                              )
                              .map(({ id, embed_url }) => (
                                <MenuItem key={id} onClick={() => handleGifClick(embed_url)}>
                                  <Box position='relative' height='80px' width='80px'>
                                    <iframe
                                      src={embed_url}
                                      width='80'
                                      height='80'
                                      frameBorder='0'
                                      className='giphy-embed'
                                      allowFullScreen={false}
                                      style={{ pointerEvents: 'none' }}
                                      onLoad={() =>
                                        setTimeout(() => {
                                          setLoading(false);
                                        }, 500)
                                      }
                                    ></iframe>
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 1,
                                        cursor: 'default',
                                      }}
                                    ></div>
                                  </Box>
                                </MenuItem>
                              ))}
                          {loading && (
                            <Box
                              position='absolute'
                              top='50%'
                              left='50%'
                              transform='translate(-50%, -50%)'
                            >
                              <Spinner size='xl' color='lightblue' thickness='5px' />
                            </Box>
                          )}
                        </SimpleGrid>
                      </Box>
                    </MenuList>
                  </>
                )}
              </Menu>
              <Spacer></Spacer>
              <Button colorScheme='orange' mr={3} onClick={handleSubmit}>
                Post
              </Button>
              <Button
                variant='ghost'
                onClick={() => {
                  setData('');
                  handleClose();
                  setLoading(true);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
