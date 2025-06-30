
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { 
  Copy, 
  Clipboard, 
  Download, 
  Upload, 
  RotateCcw, 
  FileText, 
  Moon, 
  Sun,
  Trash2,
  Undo2,
  Redo2
} from 'lucide-react';
import { convertMarkdownToText } from '@/utils/markdownConverter';
import { Header } from '@/components/Header';
import { FileUploader } from '@/components/FileUploader';
import { StatsDisplay } from '@/components/StatsDisplay';

const Index = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [plainText, setPlainText] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const plainTextRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample markdown for demo
  const sampleMarkdown = `# Welcome to Markdown Converter

This is a **powerful** tool for converting *Markdown* to plain text.

## Features Include:
- Real-time conversion
- File upload support
- One-click copying
- Mac-optimized shortcuts

### Code Example:
\`\`\`javascript
const convert = (markdown) => {
  return convertToPlainText(markdown);
};
\`\`\`

> This tool is perfect for Mac users working with Google Docs!

[Learn more about Markdown](https://daringfireball.net/projects/markdown/)

| Feature | Status |
|---------|--------|
| Conversion | ✅ |
| File Support | ✅ |
| Mobile Ready | ✅ |`;

  // Convert markdown to plain text
  const handleConversion = useCallback((text: string) => {
    setIsProcessing(true);
    try {
      const converted = convertMarkdownToText(text);
      setPlainText(converted);
    } catch (error) {
      toast({
        title: "Conversion Error",
        description: "Failed to convert markdown. Please check your input.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Handle markdown input change
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setMarkdownText(newText);
    
    // Add to history if it's different from current
    if (newText !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newText);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    
    handleConversion(newText);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, type: 'markdown' | 'plain') => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type === 'markdown' ? 'Markdown' : 'Plain text'} copied to clipboard.`
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  // Paste from clipboard
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setMarkdownText(text);
      handleConversion(text);
      
      // Add to history
      const newHistory = [...history, text];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      toast({
        title: "Pasted!",
        description: "Text pasted from clipboard."
      });
    } catch (error) {
      toast({
        title: "Paste Failed",
        description: "Failed to paste from clipboard.",
        variant: "destructive"
      });
    }
  };

  // Download as text file
  const downloadAsText = () => {
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Text file downloaded successfully."
    });
  };

  // Clear all text
  const clearAll = () => {
    setMarkdownText('');
    setPlainText('');
    setHistory(['']);
    setHistoryIndex(0);
    toast({
      title: "Cleared",
      description: "All text cleared."
    });
  };

  // Load sample text
  const loadSample = () => {
    setMarkdownText(sampleMarkdown);
    handleConversion(sampleMarkdown);
    
    const newHistory = [...history, sampleMarkdown];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    toast({
      title: "Sample Loaded",
      description: "Sample markdown loaded successfully."
    });
  };

  // Undo/Redo functionality
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const text = history[newIndex];
      setMarkdownText(text);
      handleConversion(text);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const text = history[newIndex];
      setMarkdownText(text);
      handleConversion(text);
    }
  };

  // Handle file upload
  const handleFileUpload = (content: string) => {
    setMarkdownText(content);
    handleConversion(content);
    
    const newHistory = [...history, content];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // Mac: Cmd key, Windows/Linux: Ctrl key
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
      
      if (ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              redo();
            } else {
              e.preventDefault();
              undo();
            }
            break;
          case 'v':
            if (document.activeElement === markdownRef.current) {
              // Let default paste work, then trigger conversion
              setTimeout(() => {
                const text = markdownRef.current?.value || '';
                handleConversion(text);
              }, 0);
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [historyIndex, history]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Control Panel */}
        <Card className="p-6 mb-8 shadow-lg">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button onClick={pasteFromClipboard} variant="outline" size="sm">
                <Clipboard className="w-4 h-4 mr-2" />
                Paste
              </Button>
              <Button onClick={loadSample} variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Load Sample
              </Button>
              <FileUploader onFileLoad={handleFileUpload} />
              <Button onClick={clearAll} variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
            
            <div className="flex gap-2 items-center">
              <Button 
                onClick={undo} 
                variant="outline" 
                size="sm"
                disabled={historyIndex <= 0}
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button 
                onClick={redo} 
                variant="outline" 
                size="sm"
                disabled={historyIndex >= history.length - 1}
              >
                <Redo2 className="w-4 h-4" />
              </Button>
              
              <Separator orientation="vertical" className="h-6" />
              
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
                <Moon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Card>

        {/* Main Converter Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Markdown Input */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Markdown Input
              </h2>
              <StatsDisplay text={markdownText} />
            </div>
            
            <Textarea
              ref={markdownRef}
              value={markdownText}
              onChange={handleMarkdownChange}
              placeholder="Paste your Markdown here..."
              className="min-h-[400px] font-mono text-sm resize-none"
            />
            
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={() => copyToClipboard(markdownText, 'markdown')}
                variant="outline"
                size="sm"
                disabled={!markdownText}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Markdown
              </Button>
            </div>
          </Card>

          {/* Plain Text Output */}
          <Card className="p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Plain Text Output
                {isProcessing && (
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
              </h2>
              <StatsDisplay text={plainText} />
            </div>
            
            <Textarea
              ref={plainTextRef}
              value={plainText}
              readOnly
              placeholder="Converted text will appear here..."
              className="min-h-[400px] bg-muted/30 resize-none"
            />
            
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={() => copyToClipboard(plainText, 'plain')}
                variant="default"
                size="sm"
                disabled={!plainText}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              <Button 
                onClick={downloadAsText}
                variant="outline"
                size="sm"
                disabled={!plainText}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </Card>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown,.txt"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const content = event.target?.result as string;
                handleFileUpload(content);
              };
              reader.readAsText(file);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Index;
