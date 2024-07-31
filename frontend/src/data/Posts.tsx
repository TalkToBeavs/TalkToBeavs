export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export const posts: Post[] = [
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
