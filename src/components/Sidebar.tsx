import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, User, Crown, Menu, X, FolderPlus } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onViewChange: (view: 'welcome' | 'processing' | 'player') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  onViewChange
}) => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const books = [
    { id: '1', title: '三体', author: '刘慈欣' },
    { id: '2', title: '活着', author: '余华' },
    { id: '3', title: '原则', author: '瑞·达利欧' },
    { id: '4', title: '思考，快与慢', author: '丹尼尔·卡尼曼' },
    { id: '5', title: '人类简史', author: '尤瓦尔·赫拉利' },
    { id: '6', title: '百年孤独', author: '加西亚·马尔克斯' },
    { id: '7', title: '1984', author: '乔治·奥威尔' },
    { id: '8', title: '小王子', author: '安托万·德·圣-埃克苏佩里' },
    { id: '9', title: '解忧杂货店', author: '东野圭吾' },
    { id: '10', title: '穷查理宝典', author: '查理·芒格' },
    { id: '11', title: 'Sapiens', author: 'Yuval Noah Harari' },
    { id: '12', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: '13', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: '14', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: '15', 'title': 'Pride and Prejudice', author: 'Jane Austen' },
    { id: '16', title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: '17', title: 'Brave New World', author: 'Aldous Huxley' },
    { id: '18', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: '19', title: 'Fahrenheit 451', author: 'Ray Bradbury' },
    { id: '20', title: 'Moby Dick', author: 'Herman Melville' },
  ];

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      console.log('Creating folder:', newFolderName);
      // Here you can add logic to handle folder creation
      setIsCreatingFolder(false);
      setNewFolderName('');
    }
  };

  const handleCancelCreateFolder = () => {
    setIsCreatingFolder(false);
    setNewFolderName('');
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shadow-sm h-full`}>
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
        <div className="px-4 pb-4 space-y-2">
          {!isCreatingFolder ? (
            <Button variant="outline" className="w-full justify-center text-sm font-normal" onClick={() => setIsCreatingFolder(true)}>
              <FolderPlus className="w-4 h-4 mr-2" />
              新建文件
            </Button>
          ) : (
            <div className="space-y-2">
              <Input 
                type="text"
                placeholder="文件夹名称..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
              />
              <div className="flex items-center justify-end space-x-2">
                <Button variant="ghost" size="sm" onClick={handleCancelCreateFolder}>取消</Button>
                <Button size="sm" onClick={handleCreateFolder}>确认</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {!collapsed && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              我的书库
            </h3>
            
            <div className="space-y-2">
              {books.map(book => (
                <Card 
                  key={book.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 hover:border-primary-200"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{book.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{book.author}</p>
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
        </div>
      )}
    </div>
  );
};
