
import { User, Post, Story } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'John Doe',
  avatar: 'https://picsum.photos/id/64/200/200',
  isOnline: true
};

export const INITIAL_STORIES: Story[] = [
  { id: '1', userId: 'u1', userName: 'Alice Smith', userAvatar: 'https://picsum.photos/id/1/100/100', previewImage: 'https://picsum.photos/id/10/200/300' },
  { id: '2', userId: 'u2', userName: 'Bob Johnson', userAvatar: 'https://picsum.photos/id/2/100/100', previewImage: 'https://picsum.photos/id/11/200/300' },
  { id: '3', userId: 'u3', userName: 'Charlie Brown', userAvatar: 'https://picsum.photos/id/3/100/100', previewImage: 'https://picsum.photos/id/12/200/300' },
  { id: '4', userId: 'u4', userName: 'Diana Prince', userAvatar: 'https://picsum.photos/id/4/100/100', previewImage: 'https://picsum.photos/id/13/200/300' },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: 'Alice Smith',
    userAvatar: 'https://picsum.photos/id/1/100/100',
    content: 'Just finished a hike! The view from the top was absolutely breathtaking. Nature is amazing! 🌲🏔️',
    image: 'https://picsum.photos/id/15/800/600',
    likes: 42,
    comments: [],
    timestamp: '2h ago'
  },
  {
    id: 'p2',
    userId: 'u2',
    userName: 'Bob Johnson',
    userAvatar: 'https://picsum.photos/id/2/100/100',
    content: 'Anyone have recommendations for a good Italian restaurant downtown? Thinking of taking the family out tonight.',
    likes: 12,
    comments: [
      {
        id: 'c1',
        userId: 'u3',
        userName: 'Charlie Brown',
        userAvatar: 'https://picsum.photos/id/3/100/100',
        content: 'Check out Luigi\'s Place! Best pasta in town.',
        timestamp: '1h ago'
      }
    ],
    timestamp: '4h ago'
  }
];

export const CONTACTS: User[] = [
  { id: 'u1', name: 'Alice Smith', avatar: 'https://picsum.photos/id/1/100/100', isOnline: true },
  { id: 'u2', name: 'Bob Johnson', avatar: 'https://picsum.photos/id/2/100/100', isOnline: true },
  { id: 'u3', name: 'Charlie Brown', avatar: 'https://picsum.photos/id/3/100/100', isOnline: false },
  { id: 'u4', name: 'Diana Prince', avatar: 'https://picsum.photos/id/4/100/100', isOnline: true },
  { id: 'u5', name: 'Edward Norton', avatar: 'https://picsum.photos/id/5/100/100', isOnline: false },
];
