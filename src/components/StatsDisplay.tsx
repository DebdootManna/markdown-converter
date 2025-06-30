
import React from 'react';
import { getWordCount, getCharacterCount } from '@/utils/markdownConverter';

interface StatsDisplayProps {
  text: string;
}

export const StatsDisplay = ({ text }: StatsDisplayProps) => {
  const wordCount = getWordCount(text);
  const charCount = getCharacterCount(text);

  return (
    <div className="flex gap-4 text-sm text-muted-foreground">
      <span>{wordCount} words</span>
      <span>{charCount} chars</span>
    </div>
  );
};
