import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface UserOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Report {
  id: number;
  type: string;
  title: string; // Will be things such as "Hate Speech", "Against Community Guidelines"
  reasoning: string;
  userReportingId: number;
  userReportedId: number;
  postReportedId?: number;
}
const reports: Report[] = [
  {
    id: 1,
    type: 'Post',
    title: 'Offensive Language in Post',
    reasoning: 'The content of the post includes language that is offensive and discriminatory.',
    userReportingId: 1, // User ID of the person reporting
    userReportedId: 2, // User ID of the person being reported
    postReportedId: 1, // ID of the post being reported
  },
  {
    id: 2,
    type: 'Post',
    title: 'Inappropriate Content',
    reasoning: 'The post contains content that violates community guidelines.',
    userReportingId: 3,
    userReportedId: 4,
    postReportedId: 2,
  },
  {
    id: 3,
    type: 'Post',
    title: 'Repeated Content',
    reasoning: 'The user has posted the same content repeatedly, which is considered spam.',
    userReportingId: 5,
    userReportedId: 6,
    postReportedId: 3,
  },
  {
    id: 4,
    type: 'Post',
    title: 'Personal Attacks',
    reasoning: 'The post includes personal attacks and harassment towards other users.',
    userReportingId: 7,
    userReportedId: 8,
    postReportedId: 4,
  },
  {
    id: 5,
    type: 'Post',
    title: 'Racist Comments',
    reasoning: 'The post contains racist comments that are harmful and unacceptable.',
    userReportingId: 9,
    userReportedId: 10,
    postReportedId: 5,
  },
  {
    id: 6,
    type: 'User',
    title: 'Repeated Offense',
    reasoning:
      'The user has a history of violating community guidelines and should be reviewed for possible suspension.',
    userReportingId: 4,
    userReportedId: 2, // User being reported
    postReportedId: undefined, // Not associated with a specific post
  },
  {
    id: 7,
    type: 'User',
    title: 'Misconduct Behavior',
    reasoning: 'The user has been involved in multiple reports and shows misconduct behavior.',
    userReportingId: 6,
    userReportedId: 7,
    postReportedId: undefined,
  },
  {
    id: 8,
    type: 'Post',
    title: 'Targeted Bullying',
    reasoning: 'The post targets specific users with bullying behavior.',
    userReportingId: 6,
    userReportedId: 7,
    postReportedId: 8,
  },
  {
    id: 9,
    type: 'Post',
    title: 'Discriminatory Remarks',
    reasoning: 'The post contains discriminatory remarks against a specific group.',
    userReportingId: 8,
    userReportedId: 9,
    postReportedId: 9,
  },
  {
    id: 10,
    type: 'User',
    title: 'Unauthorized Content Sharing',
    reasoning: 'The user frequently shares unauthorized content and infringes on copyright.',
    userReportingId: 10,
    userReportedId: 1,
    postReportedId: undefined,
  },
];

const UserOptionsModal: React.FC<UserOptionsModalProps> = ({ isOpen, onClose, user }) => {
  const [suspensionMenuOpen, setSuspensionMenuOpen] = useState(false);

  const suspensionOptions = [
    { label: '1 Day', value: 1 },
    { label: '3 Days', value: 3 },
    { label: '1 Week', value: 7 },
    { label: '1 Month', value: 30 },
  ];

  const handleSuspend = () => {
    // Logic to suspend the user
    console.log('User suspended');
    setSuspensionMenuOpen(false);
    onClose();
  };

  const handleBan = () => {
    // Logic to ban the user
    console.log('User banned');
    onClose();
  };

  const handleEmail = () => {
    // Logic to email the user
    console.log('User emailed');
    onClose();
  };
  console.log('User:', user);

  if (user == null) {
    return <></>;
  }

  const getTotalReports = () => {
    const count = reports.filter((element) => element.userReportedId === user.id).length;

    return count;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose(), setSuspensionMenuOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Management Options</ModalHeader>
        <ModalBody>
          {user && (
            <>
              <Text>User: {user.username}</Text>
              <Text>Total Reports: {getTotalReports()}</Text>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={suspensionMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              colorScheme='blue'
              mr={3}
              onClick={() => {
                setSuspensionMenuOpen(!suspensionMenuOpen);
              }}
            >
              Suspend
            </MenuButton>
            <MenuList>
              {suspensionOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => {
                    handleSuspend(option.value);
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Button colorScheme='red' mr={3} onClick={handleBan}>
            Ban
          </Button>
          <Button colorScheme='teal' onClick={handleEmail}>
            Email
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserOptionsModal;
