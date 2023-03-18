import React from 'react'
import { Text, Box, Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="gray.100"
        >
            <Box
                p={8}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Box textAlign="center">
                    <Heading>Welcome To TalkToBeavs</Heading>
                </Box>
                <Box my={4} textAlign="center">
                    <Text fontSize="lg">
                        TalkToBeavs is a chat application that allows you to
                        chat with other users in real time. You can create an
                        account as a user or login as a guest.
                    </Text>
                    <ButtonGroup mt={4} width="min" mx={4}>
                        <Button
                            onClick={() => navigate('/signup')}
                            colorScheme="orange"
                            mt={4}
                        >
                            Sign Up
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            colorScheme="orange"
                            mt={4}
                        >
                            Login
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Flex>
    )
}

export default Landing

