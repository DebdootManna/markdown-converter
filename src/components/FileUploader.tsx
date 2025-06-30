
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  onFileLoad: (content: string) => void;
}

export const FileUploader = ({ onFileLoad }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file) return;

    // Check file type
    const validTypes = ['text/markdown', 'text/plain', '.md', '.markdown', '.txt'];
    const fileName = file.name.toLowerCase();
    const isValidFile = validTypes.some(type => 
      file.type === type || fileName.endsWith(type.replace('.', ''))
    );

    if (!isValidFile) {
      toast({
        title: "Invalid File Type",
        description: "Please select a .md, .markdown, or .txt file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select a file smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onFileLoad(content);
      toast({
        title: "File Loaded",
        description: `Successfully loaded ${file.name}`,
      });
    };

    reader.onerror = () => {
      toast({
        title: "File Read Error",
        description: "Failed to read the file. Please try again.",
        variant: "destructive"
      });
    };

    reader.readAsText(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input value to allow same file to be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <>
      <Button 
        onClick={handleClick}
        variant="outline" 
        size="sm"
        className={`transition-colors ${isDragOver ? 'bg-primary/10 border-primary' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isDragOver ? 'Drop File' : 'Upload File'}
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </>
  );
};
