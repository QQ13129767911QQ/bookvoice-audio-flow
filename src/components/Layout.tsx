
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

export const Layout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<'welcome' | 'processing' | 'player'>('welcome');
  const [currentBook, setCurrentBook] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar 
        collapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onViewChange={setCurrentView}
        onBookSelect={setCurrentBook}
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
