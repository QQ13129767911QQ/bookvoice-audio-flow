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
        relative border rounded-lg p-3 text-center cursor-pointer transition-all duration-200
        flex flex-col items-center justify-center
        ${isDragActive 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-300 bg-gray-50 hover:border-primary-400 hover:bg-gray-100'
        }
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex items-center text-sm font-medium text-gray-800">
        <Plus className="w-4 h-4 mr-2" />
        {isUploading ? '正在上传...' : '上传书籍'}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        PDF、TXT、EPUB、MOBI、AZW、AZW3
      </p>
    </div>
  );
};
