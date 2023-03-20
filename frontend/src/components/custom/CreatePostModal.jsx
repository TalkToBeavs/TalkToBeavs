import React, { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function CreatePostModal({ isOpen, onClose, handleValidPost }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button colorScheme='orange' mr={3} onClick={handleSubmit}>
            Post
          </Button>
          <Button variant='ghost' onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
