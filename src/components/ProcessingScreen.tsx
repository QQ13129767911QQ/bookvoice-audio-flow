import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, FileText, Brain, Headphones, RefreshCw } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "文档解析",
      description: "正在提取文本内容，识别文档结构...",
      duration: 2000
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI 摘要生成",
      description: "使用GPT模型分析内容，生成核心要点...",
      duration: 4000
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "语音合成",
      description: "将文本转换为高质量中文语音...",
      duration: 3000
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "同步处理",
      description: "生成逐字稿时间轴，完成最终处理...",
      duration: 1000
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Calculate current step based on progress
        const stepProgress = newProgress / 100 * steps.length;
        const newCurrentStep = Math.floor(stepProgress);
        
        if (newCurrentStep !== currentStep && newCurrentStep < steps.length) {
          setCurrentStep(newCurrentStep);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStep, onComplete, steps.length]);

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
      <Card className="w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">正在处理您的文档</h2>
          <p className="text-gray-600">请稍等，AI正在为您生成音频摘要...</p>
        </div>

        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">整体进度</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Progress */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div 
                key={index}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-primary-50 border border-primary-200' : 
                  isCompleted ? 'bg-green-50 border border-green-200' : 
                  'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`flex-shrink-0 ${
                  isCompleted ? 'text-green-600' :
                  isActive ? 'text-primary-600' :
                  'text-gray-400'
                }`}>
                  {isCompleted ? 
                    <CheckCircle className="w-6 h-6" /> : 
                    isActive ? 
                      <div className="relative">
                        {step.icon}
                        <div className="absolute inset-0 animate-pulse">
                          {step.icon}
                        </div>
                      </div> :
                      <Circle className="w-6 h-6" />
                  }
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${
                    isCompleted ? 'text-green-900' :
                    isActive ? 'text-primary-900' :
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${
                    isCompleted ? 'text-green-600' :
                    isActive ? 'text-primary-600' :
                    'text-gray-400'
                  }`}>
                    {isCompleted ? '已完成' : 
                     isActive ? step.description : 
                     '等待中...'}
                  </p>
                </div>

                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Estimated time */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            预计还需 {Math.max(1, Math.ceil((100 - progress) / 10))} 分钟
          </p>
        </div>
      </Card>
    </div>
  );
};
