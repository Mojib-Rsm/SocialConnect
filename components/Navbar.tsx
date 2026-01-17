
import React from 'react';
import { 
  Search, 
  Home, 
  Tv, 
  ShoppingBag, 
  Users, 
  LayoutGrid, 
  MessageCircle, 
  Bell, 
  ChevronDown,
  Cloud,
  CloudOff,
  RefreshCw
} from 'lucide-react';
import { CURRENT_USER } from '../constants';

interface NavbarProps {
  dbStatus?: 'connected' | 'error' | 'syncing';
}

const Navbar: React.FC<NavbarProps> = ({ dbStatus = 'connected' }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm z-50 px-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center space-x-2">
        <div className="bg-[#1877F2] rounded-full p-1 cursor-pointer">
          <svg viewBox="0 0 36 36" className="w-8 h-8 fill-white">
            <path d="M15 35.8C4.5 33.1-2.4 22.2.3 11.7 3 1.2 13.9-5.7 24.4-3c10.5 2.7 17.4 13.6 14.7 24.1-2.2 8.5-9.3 14.3-17.6 14.7V22h5.1l.9-6h-6v-3.9c0-1.7.5-2.8 2.9-2.8H28V3.9c-.8-.1-3.6-.3-6.8-.3-6.8 0-11.4 4.1-11.4 11.7V16H5v6h4.8v13.8z"></path>
          </svg>
        </div>
        <div className="hidden sm:flex items-center bg-[#F0F2F5] rounded-full px-3 py-2 w-64 group focus-within:ring-2 focus-within:ring-[#1877F2]">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search SocialConnect" 
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>
      </div>

      {/* Center - Icons */}
      <div className="hidden md:flex items-center justify-center flex-1 max-w-[600px] h-full">
        <div className="flex items-center justify-around w-full h-full">
          <NavIcon Icon={Home} active />
          <NavIcon Icon={Tv} />
          <NavIcon Icon={ShoppingBag} />
          <NavIcon Icon={Users} />
          <NavIcon Icon={LayoutGrid} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2">
        {/* DB Sync Status */}
        <div className="hidden sm:flex items-center px-2 py-1 bg-gray-100 rounded-full mr-2" title={`Database Status: ${dbStatus}`}>
          {dbStatus === 'connected' && <Cloud className="w-4 h-4 text-green-500" />}
          {dbStatus === 'syncing' && <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />}
          {dbStatus === 'error' && <CloudOff className="w-4 h-4 text-red-500" />}
        </div>

        <div className="hidden lg:flex items-center space-x-1 p-1 hover:bg-gray-100 rounded-full cursor-pointer pr-3">
          <img src={CURRENT_USER.avatar} alt="Me" className="w-7 h-7 rounded-full" />
          <span className="text-sm font-semibold">{CURRENT_USER.name.split(' ')[0]}</span>
        </div>
        <ActionButton Icon={MessageCircle} />
        <ActionButton Icon={Bell} notificationCount={3} />
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
           <ChevronDown className="w-5 h-5 text-gray-700" />
        </div>
      </div>
    </nav>
  );
};

const NavIcon: React.FC<{ Icon: any; active?: boolean }> = ({ Icon, active }) => (
  <div className={`relative flex items-center justify-center px-8 xl:px-12 h-full cursor-pointer transition-colors ${active ? 'border-b-4 border-[#1877F2]' : 'hover:bg-gray-100 rounded-lg group'}`}>
    <Icon className={`w-6 h-6 ${active ? 'text-[#1877F2]' : 'text-gray-500 group-hover:text-gray-600'}`} />
  </div>
);

const ActionButton: React.FC<{ Icon: any; notificationCount?: number }> = ({ Icon, notificationCount }) => (
  <div className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
    <Icon className="w-5 h-5 text-gray-700" />
    {notificationCount && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
        {notificationCount}
      </span>
    )}
  </div>
);

export default Navbar;
