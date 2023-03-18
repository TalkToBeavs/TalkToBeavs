import React, { useState, useRef } from 'react'
import {
    Avatar,
    Flex,
    Stack,
    IconButton,
    Button,
    Input,
    Box,
    Heading,
    Badge,
    Center,
    AvatarBadge,
    Divider,
    Text,
    FormControl,
    Icon,
    useColorModeValue,
    useColorMode,
    useMediaQuery,
} from '@chakra-ui/react';
import { RiSendPlaneFill } from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function TextChat() {
    const navigate = useNavigate()
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const { colorMode } = useColorMode()
    const [input, setInput] = React.useState('')
    const messages = useSelector((state) => state.chat.messages)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.data)
    const messageBox = React.useRef(null)
    const endOfMessages = React.useRef(null)

    React.useEffect(() => {

        if (!user) {
            navigate('/home')
        }

        dispatch({ type: 'chat/join', payload: { username: user?.email || "Anonymous" } })

    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        // setMessages([...messages, input])
        dispatch({ type: 'chat/addMessage', payload: { message: input, username: user?.email || "Anonymous" } })
        setInput('')
    }

    const showMessages = () => {
        const notMeMessages = [...messages, {
            username: "Anonymous",
            message: "Hello"
        }]
        return notMeMessages.map((message, index) => {
            const isMe = message.username === user?.email
            return (
                <Box
                    key={index}
                    display="flex"
                    flexDirection={isMe ? 'row-reverse' : 'row'}
                    alignItems="flex-end"
                    mb={4}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems={isMe ? 'flex-end' : 'flex-start'}
                        mx={4}
                    >
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color={colorMode === 'light' ? 'gray.500' : 'gray.400'}
                        >
                            {message.username}
                        </Text>
                        <Box display="flex" flexDirection={"row"} alignItems="center" mb={1}>
                            <Avatar
                                size="sm"
                                mr={2}
                                name={message.username}
                                src="https://bit.ly/broken-link"
                            />
                            <Text
                                fontSize="sm"

                                color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                                p={2}
                                borderRadius="md"
                            >
                                {message.message}
                            </Text>
                        </Box>
                    </Box>
                </Box>


            )
        })
    }

    // React.useEffect(() => {
    //     messageBox.current.classList.remove('invisible')
    //     messageBox.current.scrollTop = messageBox.current.scrollHeight
    // }, [messages])

    return (
        <Box
            minH={isMobile ? 'calc(100vh - 80px)' : 'calc(100vh)'}
            maxW="100vw"
            display="flex"
            flexDirection="column"
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
            transition="background-color 200ms"
        >
            <Box
                id="msg-box"
                p={6}
                pb={0}
                flex={1}
                overflowY="scroll"
                ref={messageBox}
                className="invisible"
                css={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {showMessages()}
                <Box ref={endOfMessages} id="jimmyjohnson">
                    {/* scroll target empty div */}
                </Box>
            </Box>
            <FormControl p={16} zIndex={3} as="form" display="flex" alignItems="centre" onSubmit={handleSubmit}>
                <Input
                    position="sticky"
                    bottom={0}
                    h={isMobile ? '50px' : '100px'}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <IconButton
                    ml={2}
                    type="submit"
                    icon={<Icon as={RiSendPlaneFill} />}
                    _focus={{ boxShadow: 'none' }}
                    size={isMobile ? 'md' : 'lg'}
                    w={isMobile ? '50px' : '100px'}
                    isRound
                />
                <Button hidden type="submit" >
                    send
                </Button>
            </FormControl>
        </Box>
    )
}
