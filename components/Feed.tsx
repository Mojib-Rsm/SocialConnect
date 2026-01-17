
import React from 'react';
import StoryRow from './StoryRow';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import { Post } from '../types';

interface FeedProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onLikePost: (postId: string) => void;
}

const Feed: React.FC<FeedProps> = ({ posts, onAddPost, onLikePost }) => {
  return (
    <div className="mt-4 flex flex-col items-center">
      {/* Stories */}
      <StoryRow />

      {/* Create Post */}
      <CreatePost onPost={onAddPost} />

      {/* Posts */}
      <div className="w-full space-y-4">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={() => onLikePost(post.id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
