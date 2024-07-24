import { WarningIcon } from '@chakra-ui/icons';
import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React from 'react';
import { FaCog, FaUsers } from 'react-icons/fa';

import Reports from '../../components/admin/Reports';

const Admin: React.FC = () => {
  return (
    <Box ml='200px' p='4'>
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
            <Text>Users (To be Implemented...)</Text>
          </TabPanel>
          <TabPanel>
            <Text>Settings (To be Implemented...)</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Admin;
