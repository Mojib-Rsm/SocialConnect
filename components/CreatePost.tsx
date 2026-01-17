
import React, { useState } from 'react';
import { Video, Image as ImageIcon, Smile, Wand2, Loader2, Send } from 'lucide-react';
import { CURRENT_USER } from '../constants';
import { Post } from '../types';
import { generatePostIdea } from '../services/gemini';

interface CreatePostProps {
  onPost: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPosting) return;

    setIsPosting(true);
    const newPost: Post = {
      id: Date.now().toString(),
      userId: CURRENT_USER.id,
      userName: CURRENT_USER.name,
      userAvatar: CURRENT_USER.avatar,
      content: input,
      likes: 0,
      comments: [],
      timestamp: 'Just now'
    };

    try {
      await onPost(newPost);
      setInput('');
    } finally {
      setIsPosting(false);
    }
  };

  const handleAIGenerate = async () => {
    setIsGenerating(true);
    const moods = ['inspiring', 'funny', 'thoughtful', 'excited'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const idea = await generatePostIdea(randomMood);
    setInput(idea);
    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full mb-4">
      <div className="flex items-center space-x-3 mb-3">
        <img src={CURRENT_USER.avatar} alt="Me" className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90" />
        <div className="flex-1 bg-[#F0F2F5] rounded-full px-4 py-2 hover:bg-gray-200 transition cursor-pointer flex items-center justify-between">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPosting}
            placeholder={`What's on your mind, ${CURRENT_USER.name.split(' ')[0]}?`}
            className="bg-transparent outline-none w-full text-[17px] text-gray-700 disabled:opacity-50"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleAIGenerate}
              disabled={isGenerating || isPosting}
              title="Help me write with AI"
              className="p-1.5 hover:bg-gray-300 rounded-full text-[#1877F2] transition disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
            </button>
            {input.trim() && (
              <button 
                onClick={handleSubmit}
                disabled={isPosting}
                className="p-1.5 hover:bg-gray-300 rounded-full text-[#1877F2] transition disabled:opacity-50"
              >
                {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      <hr className="border-gray-200 mb-2" />

      <div className="flex items-center justify-between">
        <PostAction Icon={Video} text="Live Video" color="text-[#f3425f]" />
        <PostAction Icon={ImageIcon} text="Photo/Video" color="text-[#45bd62]" />
        <PostAction Icon={Smile} text="Feeling/Activity" color="text-[#f7b928]" />
      </div>
    </div>
  );
};

const PostAction: React.FC<{ Icon: any; text: string; color: string }> = ({ Icon, text, color }) => (
  <div className="flex items-center justify-center space-x-2 flex-1 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition">
    <Icon className={`w-6 h-6 ${color}`} />
    <span className="text-gray-500 font-semibold text-[15px]">{text}</span>
  </div>
);

export default CreatePost;
