"use client";

import React, { useState } from 'react';
import { usePlayer } from '@/hooks/use-player';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Play, Pause, SkipBack, SkipForward,
  BookOpen, Clock, Zap, ListMusic, Mic2
} from 'lucide-react';

export const GlobalPlayer: React.FC = () => {
  const {
    currentBook, isPlaying, togglePlayPause,
    currentTime, duration, seek,
  } = usePlayer();
  
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playbackSpeeds = [1, 1.25, 1.5, 2];
  
  const handleToggleSpeed = () => {
    const currentIndex = playbackSpeeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % playbackSpeeds.length;
    setPlaybackSpeed(playbackSpeeds[nextIndex]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentBook) {
    return null;
  }

  return (
    <div className="h-20 bg-white border-t border-gray-200 px-6 flex items-center shrink-0">
      {/* Book Info */}
      <div className="flex items-center gap-4 w-1/4">
        <BookOpen className="w-10 h-10 text-gray-400" />
        <div>
          <p className="font-semibold truncate">{currentBook.title}</p>
          <p className="text-sm text-gray-500">{currentBook.author}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700"
          >
            {isPlaying ?
              <Pause className="w-5 h-5 text-white" /> :
              <Play className="w-5 h-5 text-white ml-0.5" />
            }
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
        <div className="w-full max-w-xl flex items-center gap-2">
          <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={(value) => seek(value[0])}
            className="w-full"
          />
          <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Other controls */}
      <div className="w-1/4 flex justify-end items-center gap-2">
        <Button variant="ghost" onClick={handleToggleSpeed} className="h-auto">
          <span className="text-xs font-semibold">{playbackSpeed.toFixed(2)}x</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Mic2 className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ListMusic className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}; 