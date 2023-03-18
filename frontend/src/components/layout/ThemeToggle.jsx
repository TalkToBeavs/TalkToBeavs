import React from 'react'
import {
    Box,
    IconButton,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function ThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <Box w="100%" h="100%">
                <IconButton
                    bg={'none'}
                    _focus={{ bg: 'none' }}
                    _active={{ bg: 'none' }}
                    aria-label="Toggle Color Mode"
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    position="fixed"
                    top="2"
                    left="0"
                    m={2}
                    zIndex="1"
                />
            </Box>
        </>
    )
}
