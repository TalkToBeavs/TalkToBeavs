import React, { ReactNode, useEffect } from 'react'
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useMediaQuery,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Image,
    DrawerFooter,
    Heading,
} from '@chakra-ui/react'
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi'
import ttb from '../../assets/logo.png'
import { CgProfile } from 'react-icons/cg'
import { SlLogout } from 'react-icons/sl'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import OnlineUser from '../OnlineUser'
import { useDispatch, useSelector } from 'react-redux'

import TalkToBeavs, { TalkToBeavsMobile } from '../text/TalkToBeavs'
import { loadUserData } from '../../redux/slices/UserSlice'


const LinkItems = [
    { name: 'Home', icon: FiHome, link: '/home' },
    { name: 'Profile', icon: CgProfile, link: '/profile' },
    { name: 'Feed', icon: FiCompass, link: '/feed' },
    { name: 'Logout', icon: SlLogout, link: `/logout` },
]

function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.data)

    useEffect(() => {
        if (localStorage.getItem('token')?.includes('@oregonstate.edu')) {
            dispatch(loadUserData(localStorage.getItem('token')))
        } else {
            navigate('/login')
        }
    }, [])

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <>
                {location.pathname !== '/logout' &&
                    location.pathname !== '/login' &&
                    location.pathname !== '/signup' &&
                    !location.pathname.includes("text") &&
                    !location.pathname.includes("video") &&
                    location.pathname !== '/' && (
                        <>
                            <OnlineUser />
                        </>
                    )}
            </>
            <>
                {location.pathname !== '/logout' &&
                    location.pathname !== '/login' &&
                    location.pathname !== '/signup' &&
                    !location.pathname.includes("text") &&
                    !location.pathname.includes("video") &&
                    location.pathname !== '/' && (
                        <SidebarContent
                            onClose={() => onClose}
                            display={{ base: 'none', md: 'block' }}
                        />
                    )}

                <Drawer
                    autoFocus={false}
                    isOpen={isMobile ? isOpen : false}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="xs"
                >
                    <DrawerContent>
                        <SidebarContent onClose={onClose} />
                    </DrawerContent>
                </Drawer>
                {/* mobilenav */}
                {isMobile && <MobileNav onOpen={onOpen} />}

                <Box>{children}</Box>
            </>
        </Box>
    )
}

const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderEndRadius="xl"
            px="4"
            py="4"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            top={0}
            {...rest}
        >
            {/* <Flex h="10" alignItems="center" mx="8" justifyContent="space-between"> */}

            <Image src={ttb} alt="Logo" />

            <CloseButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onClose}
            />
            {/* </Flex> */}
            {LinkItems.map((link, i) => (
                <NavItem key={i} icon={link.icon}>
                    {link}
                </NavItem>
            ))}
            {/* <OnlineUser /> */}
        </Box>
    )
}

const NavItem = ({ icon, children, ...rest }) => {
    const token = localStorage.getItem('token')
    const onid = token?.split('@')[0]
    return (
        <Link
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            to={
                children.link === '/profile'
                    ? children.link + `/${onid}`
                    : children.link
            }
            as={NavLink}
            _activeLink={{
                color: 'orange.500',
            }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                my={4}
                gap={4}
                fontSize={'xl'}
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                    transform: 'scale(1.05)',
                    padding: '1rem',
                    cursor: 'pointer',
                    borderRadius: '0.5rem',
                    bg: 'orange.500',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="24"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children.name}
            </Flex>
        </Link>
    )
}

const MobileNav = ({ onOpen, ...rest }) => {
    const location = useLocation()

    return (
        <Flex
            // display={{ base: "flex", md: "none" }}
            px={{ base: 4, md: 4 }}
            height="20"
            gap={4}
            w="100vw"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-end"
            {...rest}
        >
            {location.pathname.split('/')[1] !== 'home' && (
                <TalkToBeavsMobile />
            )}
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <HStack spacing={{ base: '0', md: '6' }} mx="auto">
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}

                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">Justina Clark</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue(
                                'gray.200',
                                'gray.700'
                            )}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    )
}

export default SidebarWithHeader

