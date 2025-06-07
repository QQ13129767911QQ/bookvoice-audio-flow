import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePlayer } from '@/hooks/use-player';
import { 
  Download,
  Settings,
  BookOpen
} from 'lucide-react';

export const PlayerScreen: React.FC = () => {
  const { currentBook, currentTime } = usePlayer();
  const [currentSentence, setCurrentSentence] = useState(0);

  // Mock transcript data - In a real app, this would come from the currentBook
  const transcript = [
    { id: 0, time: 0, text: "欢迎收听《原则》音频摘要。本书由瑞·达里奥所著，是一本关于生活和工作原则的经典作品。" },
    { id: 1, time: 15, text: "达里奥在书中分享了他在生活和工作中总结出的一系列原则，这些原则帮助他建立了世界最大的对冲基金之一。" },
    { id: 2, time: 30, text: "第一部分：生活原则。达里奥认为，拥抱现实并与之打交道是成功的关键。" },
    { id: 3, time: 45, text: "他强调要保持极度透明和极度诚实，这样才能建立有意义的人际关系。" },
    { id: 4, time: 60, text: "第二部分：工作原则。创建一个理念至上的环境，让最好的想法胜出。" },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    // Update current sentence based on global currentTime
    const sentenceIndex = transcript.findIndex((item, index) => {
      const nextItem = transcript[index + 1];
      return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
    });
    
    if (sentenceIndex !== -1) {
      setCurrentSentence(sentenceIndex);
    }
  }, [currentTime, transcript]);

  if (!currentBook) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BookOpen className="w-12 h-12 mx-auto text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">请从左侧书库中选择一本书开始播放</h2>
        </div>
      </div>
    )
  }

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
              <h1 className="text-xl font-bold text-gray-900">{currentBook.title}</h1>
              <p className="text-sm text-gray-500">{currentBook.author} • {Math.floor(currentBook.duration / 60)}分钟音频摘要</p>
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
  );
};
