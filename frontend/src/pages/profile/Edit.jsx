import React from 'react'
import { Box, Flex, Avatar, Heading, Divider, useEditableControls } from '@chakra-ui/react'

export default function Edit() {
      return (
            <Box w='100%' h='100%' py={8}>
                  <Flex direction='column' align='center' justify='center' w='100%' h='100%'>
                        <Avatar size='2xl' name='name' src='https://bit.ly/sage-adebayo' mb={4} />
                        <Heading as='h1' size='2xl' mb={4}>
                              Name
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
                  </Flex>
            </Box>

      )
}

