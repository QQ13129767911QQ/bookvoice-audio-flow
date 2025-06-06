
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, BookOpen, User, Crown, Menu, X, Search, Filter } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onViewChange: (view: 'welcome' | 'processing' | 'player') => void;
  onBookSelect: (book: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onViewChange,
  onBookSelect
}) => {
  const [books] = useState([
    { id: 1, title: '原则', author: 'Ray Dalio', status: 'completed', duration: '35分钟', category: '商业' },
    { id: 2, title: '思考，快与慢', author: 'Daniel Kahneman', status: 'processing', progress: 75, category: '心理学' },
    { id: 3, title: 'JavaScript高级程序设计', author: 'Matt Frisbie', status: 'completed', duration: '42分钟', category: '技术' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const categories = ['全部', '商业', '心理学', '技术', '哲学'];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BookVoice</h1>
                <p className="text-xs text-gray-500">20分钟，听完一本书</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="p-4">
        <FileUpload 
          collapsed={collapsed}
          onUploadStart={() => onViewChange('processing')}
        />
      </div>

      {!collapsed && (
        <>
          {/* Search and Filter */}
          <div className="px-4 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索书籍..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Book Library */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              我的书库 ({books.length})
            </h3>
            
            <div className="space-y-3">
              {books.map(book => (
                <Card 
                  key={book.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 hover:border-primary-200"
                  onClick={() => {
                    onBookSelect(book);
                    if (book.status === 'completed') {
                      onViewChange('player');
                    }
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{book.title}</h4>
                        <p className="text-xs text-gray-500 truncate">{book.author}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">
                        {book.category}
                      </span>
                    </div>
                    
                    {book.status === 'processing' ? (
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-primary-600">处理中...</span>
                          <span className="text-xs text-gray-500">{book.progress}%</span>
                        </div>
                        <Progress value={book.progress} className="h-1" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium">已完成</span>
                        <span className="text-xs text-gray-500">{book.duration}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">用户</p>
                <p className="text-xs text-gray-500">免费版 • 本月还剩 2 次</p>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white">
              <Crown className="w-4 h-4 mr-2" />
              升级到 Pro
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
