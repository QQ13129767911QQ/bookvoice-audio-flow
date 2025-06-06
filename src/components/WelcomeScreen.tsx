
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Clock, Headphones, FileText, Zap, Star } from 'lucide-react';

interface WelcomeScreenProps {
  onViewChange: (view: 'welcome' | 'processing' | 'player') => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onViewChange }) => {
  const features = [
    {
      icon: <FileText className="w-8 h-8 text-primary-600" />,
      title: "多格式支持",
      description: "支持 PDF、EPUB、TXT 等主流文档格式"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "AI 智能摘要",
      description: "自动提取核心内容，生成3000-4000字精华讲稿"
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary-600" />,
      title: "高质量语音",
      description: "专业中文TTS技术，自然流畅的语音播报"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary-600" />,
      title: "碎片化学习",
      description: "20-40分钟精华音频，适合通勤、运动等场景"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "上传文档",
      description: "拖拽或选择PDF/EPUB/TXT文件"
    },
    {
      step: "2",
      title: "AI 处理",
      description: "自动解析文本并生成音频摘要"
    },
    {
      step: "3",
      title: "开始收听",
      description: "播放音频同时查看同步逐字稿"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">AI 音频书生成器</span>
            </div>
            
            <h1 className="text-5xl font-bold leading-tight">
              20分钟，听完一本书
            </h1>
            
            <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
              上传任意PDF/EPUB/TXT文档，AI自动生成高质量音频摘要，
              让你在碎片时间高效吸收书籍精华
            </p>
            
            <div className="flex items-center justify-center space-x-4 pt-4">
              <Button 
                size="lg" 
                className="bg-white text-primary-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium"
                onClick={() => onViewChange('processing')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                开始体验
              </Button>
              <div className="text-sm text-primary-200">
                免费试用 • 无需注册
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么选择 BookVoice？</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              结合前沿AI技术与用户体验设计，为知识工作者打造的高效学习工具
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">使用步骤</h2>
            <p className="text-lg text-gray-600">
              简单三步，将任意文档转化为高质量音频摘要
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-600 text-white rounded-full text-lg font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            开始你的高效学习之旅
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            立即上传你的第一本书，体验AI驱动的知识获取新方式
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium"
            onClick={() => onViewChange('processing')}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            立即开始
          </Button>
        </div>
      </div>
    </div>
  );
};
