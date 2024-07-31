import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Switch,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleMaintenanceModeChange = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  return (
    <Box p='4'>
      <VStack spacing='6' align='stretch'>
        <Heading size='lg'>Admin Settings</Heading>

        {/* Maintenance Mode Section */}
        <Box>
          <Heading size='md' mb='4'>
            Maintenance Mode
          </Heading>
          <FormControl display='flex' alignItems='center' mb='4'>
            <FormLabel htmlFor='maintenance-mode' mb='0'>
              Enable Maintenance Mode
            </FormLabel>
            <Switch
              id='maintenance-mode'
              isChecked={maintenanceMode}
              onChange={handleMaintenanceModeChange}
            />
          </FormControl>
        </Box>
        <HStack spacing='4' mt='6'>
          <Button
            colorScheme='red'
            onClick={() => {
              console.log('Apply Clicked');
            }}
          >
            Cancel
          </Button>
          <Button
            colorScheme='green'
            onClick={() => {
              console.log('Apply Clicked');
            }}
          >
            Apply
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Settings;
