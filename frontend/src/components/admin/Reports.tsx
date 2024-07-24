import { Badge, Box, Button, Flex, HStack, Text, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import UserOptionsModal from '../custom/UserOptionsModal';

interface Report {
  id: number;
  type: string;
  title: string; // Will be things such as "Hate Speech", "Against Community Guidelines"
  reasoning: string;
  userReportingId: number;
  userReportedId: number;
  postReportedId?: number;
}
interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
}
interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
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
const users: User[] = [
  {
    id: 1,
    username: 'alice_smith',
    email: 'alice.smith@example.com',
    isActive: true,
  },
  {
    id: 2,
    username: 'bob_jones',
    email: 'bob.jones@example.com',
    isActive: true,
  },
  {
    id: 3,
    username: 'carol_white',
    email: 'carol.white@example.com',
    isActive: true,
  },
  {
    id: 4,
    username: 'dave_black',
    email: 'dave.black@example.com',
    isActive: false,
  },
  {
    id: 5,
    username: 'eve_green',
    email: 'eve.green@example.com',
    isActive: true,
  },
  {
    id: 6,
    username: 'frank_blue',
    email: 'frank.blue@example.com',
    isActive: true,
  },
  {
    id: 7,
    username: 'grace_red',
    email: 'grace.red@example.com',
    isActive: false,
  },
  {
    id: 8,
    username: 'heidi_yellow',
    email: 'heidi.yellow@example.com',
    isActive: true,
  },
  {
    id: 9,
    username: 'ivan_purple',
    email: 'ivan.purple@example.com',
    isActive: true,
  },
  {
    id: 10,
    username: 'judy_orange',
    email: 'judy.orange@example.com',
    isActive: false,
  },
];
const posts: Post[] = [
  {
    id: 1,
    title: 'Exploring TypeScript',
    content:
      'TypeScript is a superset of JavaScript that provides static typing. It helps in catching errors early and improving code quality.',
    authorId: 1,
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-02T10:00:00Z'),
    isPublished: true,
  },
  {
    id: 2,
    title: 'Understanding Chakra UI',
    content:
      'Chakra UI is a simple, modular, and accessible component library for React applications. It provides a set of reusable components and hooks.',
    authorId: 2,
    createdAt: new Date('2024-01-03T11:00:00Z'),
    updatedAt: new Date('2024-01-04T11:00:00Z'),
    isPublished: true,
  },
  {
    id: 3,
    title: 'Introduction to Web Design',
    content:
      'Web design encompasses many different skills and disciplines in the production and maintenance of websites. It involves graphic design, user experience design, and more.',
    authorId: 3,
    createdAt: new Date('2024-01-05T12:00:00Z'),
    updatedAt: new Date('2024-01-06T12:00:00Z'),
    isPublished: false,
  },
  {
    id: 4,
    title: 'Why Use Figma?',
    content:
      'Figma is a powerful design tool that allows for collaborative design in real-time. It’s widely used for UI/UX design and prototyping.',
    authorId: 4,
    createdAt: new Date('2024-01-07T13:00:00Z'),
    updatedAt: new Date('2024-01-08T13:00:00Z'),
    isPublished: true,
  },
  {
    id: 5,
    title: 'Getting Started with React',
    content:
      'React is a JavaScript library for building user interfaces. It allows developers to create single-page applications with a component-based architecture.',
    authorId: 5,
    createdAt: new Date('2024-01-09T14:00:00Z'),
    updatedAt: new Date('2024-01-10T14:00:00Z'),
    isPublished: true,
  },
  {
    id: 6,
    title: 'The Benefits of Static Typing',
    content:
      'Static typing helps developers catch errors at compile time, leading to more robust and maintainable code. TypeScript is a popular choice for static typing in JavaScript.',
    authorId: 6,
    createdAt: new Date('2024-01-11T15:00:00Z'),
    updatedAt: new Date('2024-01-12T15:00:00Z'),
    isPublished: false,
  },
  {
    id: 7,
    title: 'Advanced CSS Techniques',
    content:
      'CSS has evolved significantly with new features and techniques. Learn about Flexbox, Grid, and custom properties to create advanced layouts.',
    authorId: 7,
    createdAt: new Date('2024-01-13T16:00:00Z'),
    updatedAt: new Date('2024-01-14T16:00:00Z'),
    isPublished: true,
  },
  {
    id: 8,
    title: 'Building Accessible Web Applications',
    content:
      'Accessibility is crucial in web design to ensure that applications are usable by everyone, including those with disabilities. Learn about ARIA roles, semantic HTML, and more.',
    authorId: 8,
    createdAt: new Date('2024-01-15T17:00:00Z'),
    updatedAt: new Date('2024-01-16T17:00:00Z'),
    isPublished: true,
  },
  {
    id: 9,
    title: 'JavaScript ES6 Features',
    content:
      'ES6 introduced several new features to JavaScript, including arrow functions, classes, and template literals. Understanding these features can help you write cleaner and more efficient code.',
    authorId: 9,
    createdAt: new Date('2024-01-17T18:00:00Z'),
    updatedAt: new Date('2024-01-18T18:00:00Z'),
    isPublished: false,
  },
  {
    id: 10,
    title: 'Best Practices for Code Reviews',
    content:
      'Code reviews are essential for maintaining code quality. Learn best practices for providing constructive feedback and ensuring that code is both efficient and readable.',
    authorId: 10,
    createdAt: new Date('2024-01-19T19:00:00Z'),
    updatedAt: new Date('2024-01-20T19:00:00Z'),
    isPublished: true,
  },
];

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
        user={getUser(selectedReport?.userReportedId)}
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
