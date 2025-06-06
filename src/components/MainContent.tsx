
import React from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { ProcessingScreen } from './ProcessingScreen';
import { PlayerScreen } from './PlayerScreen';

interface MainContentProps {
  view: 'welcome' | 'processing' | 'player';
  currentBook: any;
  onViewChange: (view: 'welcome' | 'processing' | 'player') => void;
  sidebarCollapsed: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  view,
  currentBook,
  onViewChange,
  sidebarCollapsed
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {view === 'welcome' && <WelcomeScreen onViewChange={onViewChange} />}
      {view === 'processing' && <ProcessingScreen onComplete={() => onViewChange('player')} />}
      {view === 'player' && <PlayerScreen book={currentBook} />}
    </div>
  );
};
