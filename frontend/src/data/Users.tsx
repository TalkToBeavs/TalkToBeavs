export interface User {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  profilePicture: string;
}

export const users: User[] = [
  {
    id: 1,
    username: 'alice_smith',
    email: 'alice.smith@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 2,
    username: 'bob_jones',
    email: 'bob.jones@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 3,
    username: 'carol_white',
    email: 'carol.white@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 4,
    username: 'dave_black',
    email: 'dave.black@example.com',
    isActive: false,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 5,
    username: 'eve_green',
    email: 'eve.green@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 6,
    username: 'frank_blue',
    email: 'frank.blue@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 7,
    username: 'grace_red',
    email: 'grace.red@example.com',
    isActive: false,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 8,
    username: 'heidi_yellow',
    email: 'heidi.yellow@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 9,
    username: 'ivan_purple',
    email: 'ivan.purple@example.com',
    isActive: true,
    profilePicture: 'https://bit.ly/broken-link',
  },
  {
    id: 10,
    username: 'judy_orange',
    email: 'judy.orange@example.com',
    isActive: false,
    profilePicture: 'https://bit.ly/broken-link',
  },
];
