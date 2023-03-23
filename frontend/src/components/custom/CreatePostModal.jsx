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
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CreatePostModal({ isOpen, onClose, handleValidPost }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [menuListHeight, setMenuListHeight] = useState(0);

  const handleGifClick = (url) => {
    setContent(url);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:8080/api/feed/giphy_search?q=${searchValue}`,
      );
      const json = await response.json();
      setData(json.data);
      setShouldFetch(false);
    }
    console.log(data)

    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch, searchValue]);

  const menuListRef = (node) => {
    if (node !== null) {
      setMenuListHeight(node.offsetHeight);
    }
  };

  useEffect(() => {
    const menuListElement = menuListRef.current;
    if (menuListElement) {
      const { scrollHeight, clientHeight } = menuListElement;
      setMenuListHeight(scrollHeight - clientHeight);
    }
  }, [data]);

  useEffect(() => {
    const menuListElement = menuListRef.current;
    if (menuListElement) {
      if (menuListHeight > 200) {
        menuListElement.style.overflowY = 'scroll';
        menuListElement.style.maxHeight = '200px';
      } else {
        menuListElement.style.overflowY = 'auto';
        menuListElement.style.maxHeight = 'none';
      }
    }
  }, [menuListHeight]);

  const userData = useSelector((state) => state.user.data);

  const handleSubmit = () => {
    if (content.length === 0) {
      setError(true);
    } else {
      let post = {
        content: content,
        postedBy: userData.email,
      };
      setContent('');
      setError(false);
      onClose();
      handleValidPost(post);
    }
  };

  const handleClose = () => {
    setContent('');
    setError(false);
    onClose();
  };

  const performSearch = () => {
    console.log(searchValue);
  };

  console.log(searchValue);

  return (
<Modal isOpen={isOpen} onClose={() => {
  console.log('Modal closed');
  onClose();
  setData('')
}}>
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
                    console.log(data);
                    if (!isOpen) {
                      console.log('active');
                    } else {
                      console.log('not active');
                      setData('');
                    }
                  }}
                >
                  {isOpen ? 'Close' : 'Open'}
                </MenuButton>
                <MenuList ref={menuListRef}>
                  <Input
                    placeholder='Search for GIFs'
                    onChange={(event) => setSearchValue(event.target.value)}
                  />
                  <Button
                    onClick={() => {
                      console.log(searchValue);
                      setShouldFetch(true);
                      setTimeout(() => {
                        setSearchValue('');
                      }, 1000);
                    }}
                  >
                    Search
                  </Button>
                  <SimpleGrid columns={5} spacing={0} align='center' justify='center'>
                    {data &&
                      data.map(({ id, embed_url }) => (
                        <MenuItem
                          key={id}
                          onClick={() => {
                            handleGifClick(embed_url);
                          }}
                        >
                          <Box position='relative' height='80px' width='80px'>
                            <iframe
                              src={embed_url}
                              width='80'
                              height='80'
                              frameBorder='0'
                              className='giphy-embed'
                              allowFullScreen={false}
                              style={{ pointerEvents: 'none' }}
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
                  </SimpleGrid>
                </MenuList>
              </>
            )}
          </Menu>
          <Button colorScheme='orange' mr={3} onClick={handleSubmit}>
            Post
          </Button>
          <Button
            variant='ghost'
            onClick={() => {
              setSearchValue('');
              setData('');
              handleClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
