"use client";

import React, { useState, useMemo, useEffect } from 'react';

// Simplified book type for the player
interface Book {
  id: string;
  title: string;
  author: string;
  duration: number; // in seconds
  // Ideally, you'd have an audio source URL here
  // audioSrc: string; 
}

interface PlayerState {
  currentBook: Book | null;
  isPlaying: boolean;
  currentTime: number;
}

interface PlayerContextValue extends PlayerState {
  duration: number;
  playBook: (book: Book) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  skip: (seconds: number) => void;
}

const PlayerContext = React.createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentBook: null,
    isPlaying: false,
    currentTime: 0,
  });
  
  const { currentBook, isPlaying, currentTime } = playerState;
  const duration = currentBook?.duration || 0;

  // Effect to handle time progression
  useEffect(() => {
    if (isPlaying && currentBook) {
      const timer = setInterval(() => {
        setPlayerState(prev => {
          if (prev.currentTime >= duration) {
            return { ...prev, isPlaying: false, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime + 1 };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentBook, duration]);

  const playBook = (book: Book) => {
    setPlayerState({
      currentBook: book,
      isPlaying: true,
      currentTime: 0,
    });
  };

  const togglePlayPause = () => {
    if (!currentBook) return;
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const seek = (time: number) => {
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  };
  
  const skip = (seconds: number) => {
     seek(Math.max(0, Math.min(duration, currentTime + seconds)));
  };

  const value = useMemo(() => ({
    currentBook,
    isPlaying,
    currentTime,
    duration,
    playBook,
    togglePlayPause,
    seek,
    skip
  }), [playerState]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
} 