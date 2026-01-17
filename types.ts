
export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  previewImage: string;
}
