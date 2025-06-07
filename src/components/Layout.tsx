import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { usePlayer } from '@/hooks/use-player';

export const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<'welcome' | 'processing' | 'player'>('welcome');
  const { currentBook } = usePlayer();

  return (
    <div className="h-full bg-gray-50 flex w-full">
      <Sidebar 
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onViewChange={setCurrentView}
      />
      <MainContent 
        view={currentView}
        currentBook={currentBook}
        onViewChange={setCurrentView}
        sidebarCollapsed={isSidebarCollapsed}
      />
    </div>
  );
};
