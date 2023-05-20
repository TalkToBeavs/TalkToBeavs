import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function EditPostModal({ isOpen, onClose, handleValidEditPost, post }) {
  const [content, setContent] = useState(post.content);
  const [error, setError] = useState(false);

  const userData = useSelector((state) => state.user.data);

  const handleSubmit = () => {
    if (content.length === 0) {
      setError(true);
    } else {
      setContent('');
      setError(false);
      onClose();
      handleValidEditPost(post._id, content);
    }
  };

  const handleClose = () => {
    setContent('');
    setError(false);
    onClose();
  };

  useEffect(() => {
    setContent(post.content);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit a post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id='content' isRequired isInvalid={error}>
            <FormLabel>Existing Post Content</FormLabel>
            <Divider my={4} />
            <Textarea
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
            Edit
          </Button>
          <Button variant='ghost' onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
