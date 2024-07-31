import { WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { FaCog, FaUsers } from 'react-icons/fa';

import Reports from '../../components/admin/Reports';
import Settings from '../../components/admin/Settings';
import Users from '../../components/admin/Users';

const Admin: React.FC = () => {
  const [isMobile] = useMediaQuery('(max-width: 767px)');

  return (
    <Box ml={isMobile ? '0px' : '200px'} p='4'>
      <Tabs variant='enclosed' colorScheme='orange'>
        <TabList>
          <Tab>
            <Icon as={WarningIcon} mr='2' />
            Reports
          </Tab>
          <Tab>
            <Icon as={FaUsers} mr='2' />
            Users
          </Tab>
          <Tab>
            <Icon as={FaCog} mr='2' />
            Settings
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Reports />
          </TabPanel>
          <TabPanel>
            <Users />
          </TabPanel>
          <TabPanel>
            <Settings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Admin;
