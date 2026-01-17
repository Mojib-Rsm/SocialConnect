
import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, X } from 'lucide-react';
import { Post } from '../types';
import { analyzePostSentiment } from '../services/gemini';

interface PostCardProps {
  post: Post;
  onLike: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getSentiment = async () => {
      if (post.content.length > 10) {
        const emoji = await analyzePostSentiment(post.content);
        setSentiment(emoji);
      }
    };
    getSentiment();
  }, [post.content]);

  const handleLike = () => {
    if (!isLiked) {
      onLike();
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm w-full overflow-hidden border border-gray-200 sm:border-none">
      {/* Header */}
      <div className="flex items-center justify-between p-3 px-4">
        <div className="flex items-center space-x-3">
          <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90" />
          <div>
            <h4 className="font-semibold text-[15px] hover:underline cursor-pointer">{post.userName}</h4>
            <div className="flex items-center text-gray-500 text-[13px]">
              <span>{post.timestamp}</span>
              <span className="mx-1">•</span>
              <span className="text-[10px]">🌍</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </div>
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <X className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        <p className="text-[15px] leading-relaxed text-gray-900 whitespace-pre-wrap">
          {post.content} {sentiment && <span className="ml-1" title="AI sentiment">{sentiment}</span>}
        </p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mt-2 w-full overflow-hidden bg-gray-100">
          <img src={post.image} alt="Post content" className="w-full object-contain max-h-[600px] mx-auto" />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-gray-500 text-[14px]">
        <div className="flex items-center space-x-1">
          <div className="bg-[#1877F2] rounded-full p-1 shadow-sm">
            <ThumbsUp className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="hover:underline cursor-pointer">{post.likes + (isLiked ? 1 : 0)}</span>
        </div>
        <div className="flex space-x-3">
          <span className="hover:underline cursor-pointer">{post.comments.length} comments</span>
          <span className="hover:underline cursor-pointer">8 shares</span>
        </div>
      </div>

      <hr className="mx-4 border-gray-200" />

      {/* Actions */}
      <div className="flex items-center justify-around p-1 mx-2">
        <InteractionButton 
          Icon={ThumbsUp} 
          text="Like" 
          onClick={handleLike} 
          active={isLiked}
          color={isLiked ? "text-[#1877F2]" : "text-gray-600"} 
        />
        <InteractionButton Icon={MessageSquare} text="Comment" />
        <InteractionButton Icon={Share2} text="Share" />
      </div>

      {/* Comments Preview */}
      {post.comments.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-3">
          {post.comments.map(comment => (
            <div key={comment.id} className="flex space-x-2">
              <img src={comment.userAvatar} className="w-8 h-8 rounded-full" alt={comment.userName} />
              <div className="bg-[#F0F2F5] p-2 px-3 rounded-2xl max-w-[90%]">
                <span className="font-semibold text-[13px] block hover:underline cursor-pointer">{comment.userName}</span>
                <p className="text-[13px] text-gray-800">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const InteractionButton: React.FC<{ Icon: any; text: string; onClick?: () => void; color?: string; active?: boolean }> = ({ Icon, text, onClick, color, active }) => (
  <button 
    onClick={onClick}
    className={`flex items-center justify-center space-x-2 flex-1 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition font-semibold text-[14px] ${color || 'text-gray-600'}`}
  >
    <Icon className={`w-5 h-5 ${active ? 'fill-[#1877F2]' : ''}`} />
    <span>{text}</span>
  </button>
);

export default PostCard;
