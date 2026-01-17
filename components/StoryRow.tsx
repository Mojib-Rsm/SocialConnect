
import React from 'react';
import { Plus } from 'lucide-react';
import { INITIAL_STORIES, CURRENT_USER } from '../constants';

const StoryRow: React.FC = () => {
  return (
    <div className="flex space-x-2 w-full mb-4 overflow-x-auto pb-2 scrollbar-hide">
      {/* Create Story */}
      <div className="relative h-48 min-w-[110px] w-1/5 bg-white rounded-xl shadow-sm cursor-pointer overflow-hidden group">
        <div className="h-3/4 overflow-hidden">
          <img 
            src={CURRENT_USER.avatar} 
            className="w-full h-full object-cover transition transform duration-200 group-hover:scale-105" 
            alt="My Avatar"
          />
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1877F2] p-1.5 rounded-full border-4 border-white">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-1 w-full text-center">
          <span className="text-[13px] font-semibold text-gray-800">Create story</span>
        </div>
      </div>

      {/* Stories */}
      {INITIAL_STORIES.map(story => (
        <div key={story.id} className="relative h-48 min-w-[110px] w-1/5 rounded-xl shadow-sm cursor-pointer overflow-hidden group">
          <img 
            src={story.previewImage} 
            className="absolute w-full h-full object-cover transition transform duration-200 group-hover:scale-105" 
            alt="Story"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute top-2 left-2 border-4 border-[#1877F2] rounded-full">
            <img src={story.userAvatar} className="w-8 h-8 rounded-full border border-white" alt={story.userName} />
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <span className="text-white text-[13px] font-semibold truncate block drop-shadow-md">
              {story.userName}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoryRow;
