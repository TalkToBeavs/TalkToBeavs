import React from 'react'
import { Text, Heading, Button, Box, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const FourOhFour = () => {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            h="100vh"
            w="100vw"
        >
            <Heading as="h1" size="2xl" mb={4}>
                404
            </Heading>
            <Text mb={4}>Page not found</Text>
            <Link to="/">
                <Button colorScheme="orange">Go Back Home</Button>
            </Link>
        </Flex>
    )
}

export default FourOhFour
