import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onCloseMobile }) => {
  const navItems = [
    { label: 'Dispatches', icon: '✍️', view: AppView.HOME },
    { label: 'Archive', icon: '🗄️', view: AppView.ARCHIVE },
    { label: 'Checklist Gen', icon: '✅', view: AppView.CHECKLIST_GENERATOR },
    { label: 'LinkedIn Gen', icon: '⚡', view: AppView.LINKEDIN_GENERATOR },
    { label: 'Submit Story', icon: '📮', view: AppView.SUBMIT },
    { label: 'About Me', icon: '👨‍⚕️', view: AppView.ABOUT },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-40 w-64 bg-[#F7F7F5] border-r border-[#E9E9E7] transform transition-transform duration-200 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    md:translate-x-0 md:static md:h-screen
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={onCloseMobile}
        ></div>
      )}

      {/* Sidebar Content */}
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* User/Workspace Profile */}
          <div className="p-4 hover:bg-[#EFEFED] cursor-pointer transition-colors m-2 rounded-md mb-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-rose-600 rounded text-white flex items-center justify-center text-xs font-bold">
                D
              </div>
              <span className="font-semibold text-sm truncate text-[#37352F]">Discharge Hell</span>
              <svg className="w-4 h-4 text-stone-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
            <div className="px-3 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Workspace
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onChangeView(item.view);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-1.5 text-sm rounded-md transition-colors group ${
                  currentView === item.view
                    ? 'bg-[#EFEFED] text-[#37352F] font-medium'
                    : 'text-[#5F5E5B] hover:bg-[#EFEFED]'
                }`}
              >
                <span className="text-lg opacity-80 group-hover:opacity-100">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-2 border-t border-[#E9E9E7]">
            <button className="w-full flex items-center gap-3 px-3 py-1.5 text-sm text-[#5F5E5B] hover:bg-[#EFEFED] rounded-md transition-colors">
              <span className="text-lg">⚙️</span>
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-1.5 text-sm text-[#5F5E5B] hover:bg-[#EFEFED] rounded-md transition-colors">
              <span className="text-lg">📥</span>
              Templates
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;