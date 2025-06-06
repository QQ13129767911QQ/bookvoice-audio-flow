
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
  Clock
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

      <div className="flex-1 flex">
        {/* Audio Controls */}
        <div className="w-96 bg-white border-r border-gray-200 p-6 flex flex-col">
          <Card className="p-6 space-y-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">音频控制</h3>
              <div className="text-sm text-gray-500">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>00:00</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm">
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button 
                onClick={handlePlayPause}
                className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-700"
              >
                {isPlaying ? 
                  <Pause className="w-5 h-5 text-white" /> : 
                  <Play className="w-5 h-5 text-white ml-0.5" />
                }
              </Button>
              
              <Button variant="outline" size="sm">
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">音量</span>
              </div>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>

            {/* Playback Speed */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">播放速度</span>
              </div>
              <div className="flex space-x-1">
                {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <Button
                    key={speed}
                    variant={playbackSpeed === speed ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setPlaybackSpeed(speed)}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Transcript */}
        <div className="flex-1 p-6">
          <Card className="h-full p-6">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">同步逐字稿</h3>
                <div className="text-sm text-gray-500">
                  当前播放: 第 {currentSentence + 1} 段
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                {transcript.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      index === currentSentence
                        ? 'bg-primary-50 border-l-4 border-primary-500 shadow-sm'
                        : 'hover:bg-gray-50'
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
          </Card>
        </div>
      </div>
    </div>
  );
};
