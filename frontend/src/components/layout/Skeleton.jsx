import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiChevronDown, FiCompass, FiHome, FiMenu } from 'react-icons/fi';
import { SlLogout } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ttb from '../../assets/logo.png';
import { loadUserData } from '../../redux/slices/UserSlice';
import { TalkToBeavsMobile } from '../text/TalkToBeavs';
import OnlineUser from './OnlineUser';

const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/home' },
  { name: 'Profile', icon: CgProfile, link: '/profile' },
  { name: 'Feed', icon: FiCompass, link: '/feed' },
  { name: 'Logout', icon: SlLogout, link: `/logout` },
];

function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')?.includes('@oregonstate.edu')) {
      dispatch(loadUserData(localStorage.getItem('token')));
    } else {
      navigate('/login');
    }
  }, []);

  const breakPt = useBreakpointValue({ base: false, md: true });

  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <>
        {location.pathname !== '/logout' &&
          location.pathname !== '/login' &&
          breakPt &&
          location.pathname !== '/signup' &&
          !location.pathname.includes('text') &&
          !location.pathname.includes('video') &&
          location.pathname !== '/' && (
            <>
              <OnlineUser />
            </>
          )}
      </>
      <>
        {location.pathname !== '/logout' &&
          location.pathname !== '/login' &&
          breakPt &&
          location.pathname !== '/signup' &&
          !location.pathname.includes('text') &&
          !location.pathname.includes('video') &&
          location.pathname !== '/' && (
            <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
          )}

        {/* Maybe Allow in the future? */}
        {!isMobile && (
          <Drawer
            autoFocus={true}
            isOpen={isMobile ? isOpen : false}
            placement='right'
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size='lg'
            notOpen={isMobile}
          >
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
        )}
        {/* mobilenav */}
        {isMobile && <MobileNav onOpen={onOpen} />}

        <Box>{children}</Box>
      </>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderEndRadius='xl'
      py='4'
      borderColor={useColorModeValue('gray.200', '#DE6A1F36')}
      w={{ base: 'full', md: 52 }}
      pos='fixed'
      h='full'
      top={0}
      {...rest}
    >
      {/* <Flex h="10" alignItems="center" mx="8" justifyContent="space-between"> */}

      <Image src={ttb} alt='Logo' />

      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      {/* </Flex> */}
      {LinkItems.map((link, i) => (
        <NavItem key={i} icon={link.icon}>
          {link}
        </NavItem>
      ))}
      {/* <OnlineUser /> */}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  const token = localStorage.getItem('token');
  const onid = token?.split('@')[0];
  return (
    <Link
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      to={children.link === '/profile' ? children.link + `/${onid}` : children.link}
      as={NavLink}
      _activeLink={{
        color: 'orange.500',
      }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        my={4}
        gap={4}
        fontSize={'xl'}
        borderRadius='lg'
        role='group'
        cursor='pointer'
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
            mr='4'
            fontSize='24'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children.name}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.data);
  const onid = user?.onid || localStorage.getItem('token')?.split('@')[0];
  const navigate = useNavigate();

  return (
    // display={{ base: "flex", md: "none" }}
    <Flex
      px={{ base: 4, md: 4 }}
      height='20'
      gap={4}
      w='100vw'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-end'
      {...rest}
    >
      <TalkToBeavsMobile />

      {/* // Maybe allow in the future? */}
      <IconButton
        display={!rest.notOpen ? 'none' : 'flex'}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <HStack spacing='8'>
        <Flex alignItems={'center'} mx='auto'>
          <Menu>
            <MenuButton py={2} _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} name={user?.name} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              borderColor={useColorModeValue('gray.900', 'gray.900')}
              boxShadow={'xl'}
              py='1'
              mt='2'
            >
              {['Home', 'Profile', 'Feed', 'Logout'].map((item, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    if (item === 'Logout') {
                      localStorage.removeItem('token');
                      navigate('/login');
                    } else if (item === 'Profile') {
                      navigate(`/profile/${onid}`);
                    } else {
                      navigate(`/${item.toLowerCase()}`);
                    }
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default SidebarWithHeader;
