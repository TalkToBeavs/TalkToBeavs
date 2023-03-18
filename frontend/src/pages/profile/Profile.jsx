import React, { useEffect } from 'react'
import {
    Box,
    Heading,
    Text,
    Flex,
    Divider,
    Avatar,
    IconButton,
    HStack,
    VStack,
} from '@chakra-ui/react'
import OnlineUser from '../../components/OnlineUser'
import { useParams } from 'react-router-dom'
import Post from '../../components/Post'
import FollowButton from '../../components/FollowButton'
import { useDispatch, useSelector } from 'react-redux'
import useProfile from '../../hooks/useProfile'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import FollowStats from '../../components/text/FollowStats'
import usePosts from '../../hooks/usePosts'
import ProfilePostList from '../../components/card/ProfilePostList'

export default function Profile() {
    const { onid } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.data)
    const profile = useProfile({ onid, user })
    const posts = usePosts({ onid })
    useEffect(() => {
        document.querySelector('title').innerHTML = `${onid}'s Profile`
    }, [onid])

    return (
        profile && (
            <>
                <Box w="100%" h="100%" py={8}>
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        w="100%"
                        h="100%"
                    >
                        <Avatar
                            size="2xl"
                            name={profile.name}
                            src={profile.avatarImg}
                            mb={4}
                        />
                        <FollowButton user={profile} />
                        <Heading as="h1" size="2xl" mb={4}>
                            {profile.name.charAt(0).toUpperCase() +
                                profile.name.slice(1)}
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

                        <FollowStats onid={onid} user={user} />

                        <Divider
                            w={{
                                base: '50%',
                                sm: '60%',
                                md: '50%',
                                lg: '55%',
                            }}
                            mb={4}
                        />
                        <Heading as="h2" size="lg" mt={8} mb={4}>
                            {onid}'s Posts
                            <Divider mt={2} />
                        </Heading>

                        <ProfilePostList posts={posts} />
                    </Flex>
                </Box>
            </>
        )
    )
}
