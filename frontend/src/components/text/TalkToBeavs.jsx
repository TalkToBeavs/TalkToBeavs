import React from 'react'
import { Heading, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'

export function TalkToBeavsMobile() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Heading
            as="h1"
            textTransform="uppercase"
            letterSpacing="tight"
            ml={'32'}
            size="2xl"
            color="orange.500"
        >
            Talk
            <Text as="span" mx={0} color={useColorModeValue('gray.900', 'white')}>
                2
            </Text>
            Beavs
        </Heading>
    )
}

export default function TalkToBeavs() {
    return (
        <Heading
            as="h1"
            textTransform="uppercase"
            letterSpacing="tight"
            size="2xl"
            color="orange.500"
        >
            Talk
            <Text as="span" mx={0} color={useColorModeValue('gray.900', 'white')}>
                2
            </Text>
            Beavs
        </Heading>
    )
}
