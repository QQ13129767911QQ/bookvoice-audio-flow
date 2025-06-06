
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, FileText, FileAudio, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FileUploadProps {
  collapsed: boolean;
  onUploadStart: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ collapsed, onUploadStart }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);
      
      toast({
        title: "开始处理",
        description: `正在上传并处理 ${file.name}...`,
      });

      // Simulate file processing
      setTimeout(() => {
        setIsUploading(false);
        onUploadStart();
        
        // Store file info in localStorage
        const existingBooks = JSON.parse(localStorage.getItem('bookvoice_books') || '[]');
        const newBook = {
          id: Date.now(),
          title: file.name.replace(/\.[^/.]+$/, ""),
          author: "未知作者",
          status: 'processing',
          progress: 0,
          category: '其他',
          uploadedAt: new Date().toISOString()
        };
        localStorage.setItem('bookvoice_books', JSON.stringify([...existingBooks, newBook]));
      }, 1000);
    }
  }, [onUploadStart]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/epub+zip': ['.epub'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <Button
          size="sm"
          className="w-10 h-10 p-0 bg-primary-600 hover:bg-primary-700"
          disabled={isUploading}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
        ${isDragActive 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="space-y-3">
        <div className="flex justify-center">
          {isUploading ? (
            <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-900">
            {isUploading ? '正在上传...' : '上传文档'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {isDragActive ? '松开上传文件' : '拖拽文件或点击选择'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            支持 PDF, EPUB, TXT
          </p>
        </div>
      </div>
      
      {/* Supported formats icons */}
      <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-1">
          <FileText className="w-3 h-3 text-red-500" />
          <span className="text-xs text-gray-500">PDF</span>
        </div>
        <div className="flex items-center space-x-1">
          <FileAudio className="w-3 h-3 text-blue-500" />
          <span className="text-xs text-gray-500">EPUB</span>
        </div>
        <div className="flex items-center space-x-1">
          <FileText className="w-3 h-3 text-green-500" />
          <span className="text-xs text-gray-500">TXT</span>
        </div>
      </div>
    </div>
  );
};
