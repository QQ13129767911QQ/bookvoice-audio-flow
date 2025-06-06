import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Download,
  Settings,
  BookOpen,
  Clock,
  RotateCcw,
  RotateCw,
  Zap
} from 'lucide-react';

interface PlayerScreenProps {
  book: any;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ book }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2400); // 40 minutes in seconds
  const [volume, setVolume] = useState(70);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentSentence, setCurrentSentence] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playbackSpeeds = [1, 1.25, 1.5, 2];

  // Mock transcript data
  const transcript = [
    { id: 0, time: 0, text: "欢迎收听《原则》音频摘要。本书由瑞·达里奥所著，是一本关于生活和工作原则的经典作品。" },
    { id: 1, time: 15, text: "达里奥在书中分享了他在生活和工作中总结出的一系列原则，这些原则帮助他建立了世界最大的对冲基金之一。" },
    { id: 2, time: 30, text: "第一部分：生活原则。达里奥认为，拥抱现实并与之打交道是成功的关键。" },
    { id: 3, time: 45, text: "他强调要保持极度透明和极度诚实，这样才能建立有意义的人际关系。" },
    { id: 4, time: 60, text: "第二部分：工作原则。创建一个理念至上的环境，让最好的想法胜出。" },
    // ... more transcript entries
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime(prev => Math.max(0, Math.min(duration, prev + seconds)));
  };

  const handleToggleSpeed = () => {
    const currentIndex = playbackSpeeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % playbackSpeeds.length;
    setPlaybackSpeed(playbackSpeeds[nextIndex]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleTranscriptClick = (time: number) => {
    setCurrentTime(time);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Update current sentence based on time
          const sentenceIndex = transcript.findIndex((item, index) => {
            const nextItem = transcript[index + 1];
            return newTime >= item.time && (!nextItem || newTime < nextItem.time);
          });
          
          if (sentenceIndex !== -1 && sentenceIndex !== currentSentence) {
            setCurrentSentence(sentenceIndex);
          }
          
          return newTime >= duration ? duration : newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPlaying, duration, transcript, currentSentence]);

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{book?.title || '原则'}</h1>
              <p className="text-sm text-gray-500">Ray Dalio • 35分钟音频摘要</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              下载音频
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              下载文稿
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Combined Player and Transcript */}
        <div className="w-full bg-white p-6 space-y-6">
          <div className="text-center">
            <div className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => handleSkip(-15)}>
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <Button variant="ghost" size="icon" onClick={() => handleSkip(15)}>
              <RotateCw className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-12">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-around">
            <Button variant="ghost" className="flex flex-col h-auto gap-1">
              <Clock className="w-5 h-5" />
              <span className="text-xs">定时关闭</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <SkipBack className="w-6 h-6" />
            </Button>
            
            <Button 
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-primary-600 hover:bg-primary-700"
            >
              {isPlaying ? 
                <Pause className="w-8 h-8 text-white" /> : 
                <Play className="w-8 h-8 text-white ml-1" />
              }
            </Button>
            
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <SkipForward className="w-6 h-6" />
            </Button>

            <Button variant="ghost" onClick={handleToggleSpeed} className="flex flex-col h-auto gap-1">
              <Zap className="w-5 h-5" />
              <span className="text-xs">{playbackSpeed}x 倍速</span>
            </Button>
          </div>
        </div>

        {/* Transcript */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              当前播放: 第 {currentSentence + 1} 段
            </div>
          </div>
          
          <div className="space-y-4">
            {transcript.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  index === currentSentence
                    ? 'bg-white border-l-4 border-primary-500 shadow-sm'
                    : 'hover:bg-white'
                }`}
                onClick={() => handleTranscriptClick(item.time)}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-sm text-gray-500 font-mono mt-1 min-w-[60px]">
                    {formatTime(item.time)}
                  </span>
                  <p className={`text-sm leading-relaxed ${
                    index === currentSentence
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-700'
                  }`}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
