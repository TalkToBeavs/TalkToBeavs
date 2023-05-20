import React from 'react';
import {
  Box,
  Flex,
  Stack,
  Avatar,
  Heading,
  Divider,
  useEditableControls,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
import { editUser } from '../../redux/slices/UserSlice';

export default function Edit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  const onid = user?.email.split('@')[0];
  const profile = useProfile({ onid, user });
  const [name, setName] = React.useState(user?.name);
  const [standing, setStanding] = React.useState(user?.standing || '');
  const [major, setMajor] = React.useState(user?.major || '');
  const [bio, setBio] = React.useState(user?.bio || '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const standing = event.target.standing.value;
    const major = event.target.major.value;
    const bio = event.target.bio.value;
    const email = user.email;
    const updatedUser = { email, name, standing, major, bio };
    await dispatch(editUser(updatedUser));
    navigate(-1);
  };

  useEffect(() => {
    document.querySelector('title').innerHTML = `${onid}'s Profile`;

    return () => {
      document.querySelector('title').innerHTML = 'Talk2Beavs - OSU CS494';
    };
  }, [onid]);

  return (
    profile && (
      <Box w='100%' h='100%' py={8}>
        <Flex direction='column' align='center' justify='center' w='100%' h='100%'>
          <Avatar size='2xl' name={profile.name} src={profile.avatarImg} mb={4} />
          <Heading as='h1' size='2xl' mb={4}>
            {profile.name.charAt(0).toUpperCase() + profile.name.slice(1)}
          </Heading>
          <Divider
            w={{
              base: '50%',
              sm: '60%',
              md: '50%',
              lg: '55%',
            }}
            mb={4}
          />
          <Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <FormControl id='name' isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </FormControl>

                <FormControl id='standing' mt={4}>
                  <FormLabel>Standing</FormLabel>
                  <Select value={standing} onChange={(event) => setStanding(event.target.value)}>
                    <option value=''>Select your standing</option>
                    <option value='Freshman'>Freshman</option>
                    <option value='Sophomore'>Sophomore</option>
                    <option value='Junior'>Junior</option>
                    <option value='Senior'>Senior</option>
                    <option value='Grad Student'>Grad Student</option>
                  </Select>
                </FormControl>

                <FormControl id='major' mt={4}>
                  <FormLabel>Major</FormLabel>
                  <Input
                    type='text'
                    placeholder='Enter your major'
                    value={major}
                    onChange={(event) => setMajor(event.target.value)}
                  />
                </FormControl>

                <FormControl id='bio' mt={4}>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    placeholder='Tell us about yourself'
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                </FormControl>

                <Box py='10px' width='100%' justifySelf='center'>
                  <Button colorScheme='orange' type='submit' width='100%'>
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Box>
    )
  );
}
