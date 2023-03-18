import React from 'react'
import { Text, Heading, Flex, Box, Button, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const TextLobby = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch({ type: 'chat/connect', payload: { url: "ws://localhost:8080" } })

    }, [])

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg={useColorModeValue('gray.50', 'inherit')}
        >
            <Heading textAlign={'center'}>Text Lobby</Heading>
            <Text py={4} textAlign={'center'} w={'fit-content'}>
                Waiting for other user to join...
            </Text>

            <Button colorScheme="orange" onClick={() => navigate('/text/440')}>
                Go To Chat
            </Button>
        </Flex>
    )
}

export default TextLobby

