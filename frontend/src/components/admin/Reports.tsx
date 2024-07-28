import { Badge, Box, Button, Flex, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import UserOptionsModal from '../custom/UserOptionsModal';

import { posts } from '../../data/Posts';
import { Report, reports } from '../../data/Reports';
import { users } from '../../data/Users';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const { isOpen: userIsOpen, onOpen: userOnOpen, onClose: userOnClose } = useDisclosure();

  const getReportedByUsername = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user == undefined) {
      return 'unknown';
    } else {
      return user.username;
    }
  };
  const getUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user == undefined) {
      return null;
    } else {
      return user;
    }
  };

  const getPostTitle = (id: number) => {
    const post = posts.find((post) => post.id === id);
    if (post == undefined) {
      return null;
    } else {
      return post.title;
    }
  };
  const getPostContent = (id: number) => {
    const post = posts.find((post) => post.id === id);
    if (post == undefined) {
      return null;
    } else {
      return post.content;
    }
  };

  return (
    <Flex>
      <UserOptionsModal
        isOpen={userIsOpen}
        onClose={userOnClose}
        user={selectedReport != null ? getUser(selectedReport?.userReportedId) : null}
      />
      {/* List of Reports */}
      <Box
        w='300px'
        p='4'
        borderRight='1px'
        borderColor='gray.200'
        overflowY='scroll'
        maxHeight='90vh'
      >
        <VStack spacing='4' align='stretch'>
          {reports.map((report) => (
            <Box
              key={report.id}
              p='4'
              borderRadius='md'
              cursor='pointer'
              onClick={() => setSelectedReport(report)}
              border={selectedReport?.id === report.id ? '2px' : '1px'}
              borderColor={selectedReport?.id === report.id ? 'orange.500' : 'gray.200'}
              _hover={{ shadow: 'lg' }}
            >
              <Badge fontSize='small'>{report.type}</Badge>
              <Text fontSize='lg' fontWeight='bold'>
                {report.id}. {report.title}
              </Text>
              <HStack>
                <Text fontSize='small' fontWeight='thin'>
                  Reported by: {getReportedByUsername(report.userReportingId)}
                </Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

      {/* Report Details */}
      <Box flex='1' p='4'>
        {selectedReport ? (
          <>
            <Text fontSize='2xl' fontWeight='bold'>
              {selectedReport.title}
            </Text>
            <Text mt='4'>{selectedReport.reasoning}</Text>
            {selectedReport.type == 'Post' ? (
              <>
                <Text fontSize='xl' fontWeight='bold'>
                  Post Content:
                </Text>
                <Box border='1px' p='5px' borderRadius='md' mt='4'>
                  <Text fontSize='lg' fontWeight='bold'>
                    {getPostTitle(selectedReport?.postReportedId)}
                  </Text>
                  <Text>{getPostContent(selectedReport?.postReportedId)}</Text>
                </Box>
              </>
            ) : (
              <></>
            )}
            <Text mt='4' fontWeight='semibold'>
              Reported by: {getReportedByUsername(selectedReport.userReportingId)}
            </Text>
            <HStack spacing='4' mt='6'>
              {selectedReport.type == 'Post' ? (
                <Button colorScheme='red'>Delete Post</Button>
              ) : (
                <></>
              )}
              <Button colorScheme='orange' onClick={() => userOnOpen()}>
                User Options
              </Button>
              <Button colorScheme='green' onClick={() => userOnOpen()}>
                Ignore
              </Button>
            </HStack>
          </>
        ) : (
          <Text>Select a report to see the details</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Reports;
