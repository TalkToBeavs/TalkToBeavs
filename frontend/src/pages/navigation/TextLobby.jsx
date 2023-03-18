import React from 'react'
import { Text, Heading, Flex, Box } from '@chakra-ui/react'

const TextLobby = () => {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="gray.100"
        >
            <Heading textAlign={'center'}>Text Lobby</Heading>
            <Text py={4} textAlign={'center'} w={'fit-content'}>
                Waiting for other user to join...
            </Text>
        </Flex>
    )
}

export default TextLobby

