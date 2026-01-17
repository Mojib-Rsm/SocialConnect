
import React from 'react';
import { 
  Users, 
  Store, 
  Monitor, 
  History, 
  Bookmark, 
  Users2, 
  Calendar, 
  ChevronDown,
  UserCircle
} from 'lucide-react';
import { CURRENT_USER } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <div className="py-4 space-y-1">
      <SidebarRow src={CURRENT_USER.avatar} title={CURRENT_USER.name} />
      <SidebarRow Icon={Users2} title="Friends" color="text-[#1877F2]" />
      <SidebarRow Icon={Users} title="Groups" color="text-[#2ABBA7]" />
      <SidebarRow Icon={Store} title="Marketplace" color="text-[#1877F2]" />
      <SidebarRow Icon={Monitor} title="Watch" color="text-[#1877F2]" />
      <SidebarRow Icon={History} title="Memories" color="text-[#1877F2]" />
      <SidebarRow Icon={Bookmark} title="Saved" color="text-[#C2410C]" />
      <SidebarRow Icon={Calendar} title="Events" color="text-[#E11D48]" />
      <SidebarRow Icon={ChevronDown} title="See more" isGrey />

      <hr className="my-4 border-gray-300 mx-4" />

      <div className="px-4 mb-2">
        <h3 className="text-gray-500 font-semibold">Your Shortcuts</h3>
      </div>
      <SidebarRow src="https://picsum.photos/id/20/100/100" title="React Developers" />
      <SidebarRow src="https://picsum.photos/id/21/100/100" title="Tailwind CSS Lovers" />
      <SidebarRow src="https://picsum.photos/id/22/100/100" title="AI Researchers" />
    </div>
  );
};

const SidebarRow: React.FC<{ src?: string; Icon?: any; title: string; color?: string; isGrey?: boolean }> = ({ src, Icon, title, color, isGrey }) => (
  <div className="flex items-center space-x-3 p-2 mx-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-all">
    {src ? (
      <img src={src} alt={title} className="w-9 h-9 rounded-full object-cover" />
    ) : (
      <div className={`p-1 ${isGrey ? 'bg-gray-300 rounded-full' : ''}`}>
        <Icon className={`w-6 h-6 ${color || 'text-gray-700'}`} />
      </div>
    )}
    <span className="font-medium text-[15px]">{title}</span>
  </div>
);

export default Sidebar;
