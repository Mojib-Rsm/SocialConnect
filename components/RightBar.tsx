
import React from 'react';
import { Video, Search, MoreHorizontal, Gift } from 'lucide-react';
import { CONTACTS } from '../constants';

const RightBar: React.FC = () => {
  return (
    <div className="py-4 px-2">
      {/* Sponsored */}
      <div className="mb-4">
        <h3 className="text-gray-500 font-semibold mb-3">Sponsored</h3>
        <div className="space-y-4">
          <AdItem 
            src="https://picsum.photos/id/26/150/150" 
            title="Master React in 30 Days" 
            domain="reactacademy.com" 
          />
          <AdItem 
            src="https://picsum.photos/id/27/150/150" 
            title="Gemini AI for Developers" 
            domain="google.ai" 
          />
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Birthdays */}
      <div className="mb-4">
        <h3 className="text-gray-500 font-semibold mb-3">Birthdays</h3>
        <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <div className="text-blue-500">
            <Gift className="w-8 h-8" />
          </div>
          <span className="text-[14px] leading-snug">
            <span className="font-bold">Bob Johnson</span> and <span className="font-bold">2 others</span> have birthdays today.
          </span>
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-500 font-semibold">Contacts</h3>
          <div className="flex space-x-2 text-gray-500">
            <div className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"><Video className="w-4 h-4" /></div>
            <div className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"><Search className="w-4 h-4" /></div>
            <div className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"><MoreHorizontal className="w-4 h-4" /></div>
          </div>
        </div>
        
        <div className="space-y-1">
          {CONTACTS.map(contact => (
            <div key={contact.id} className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer relative group">
              <div className="relative">
                <img src={contact.avatar} alt={contact.name} className="w-9 h-9 rounded-full" />
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <span className="font-medium text-[15px]">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdItem: React.FC<{ src: string; title: string; domain: string }> = ({ src, title, domain }) => (
  <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition">
    <img src={src} className="w-28 h-28 object-cover rounded-lg" alt="Ad" />
    <div>
      <h4 className="font-semibold text-sm leading-tight mb-1">{title}</h4>
      <span className="text-xs text-gray-500">{domain}</span>
    </div>
  </div>
);

export default RightBar;
