export function convertMarkdownToText(markdown: string): string {
  if (!markdown) return '';

  let text = markdown;

  // Remove YAML front matter
  text = text.replace(/^---[\s\S]*?---\n?/m, '');

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, '');

  // Remove code blocks (fenced and indented)
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/~~~[\s\S]*?~~~/g, '');
  text = text.replace(/^    .+$/gm, ''); // Indented code blocks

  // Remove inline code
  text = text.replace(/`([^`]+)`/g, '$1');

  // Remove headers (# ## ### etc.)
  text = text.replace(/^#{1,6}\s+(.+)$/gm, '$1');

  // Remove horizontal rules
  text = text.replace(/^[-*_]{3,}\s*$/gm, '');

  // Remove emphasis (bold, italic, strikethrough)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '$1'); // Bold italic
  text = text.replace(/___(.+?)___/g, '$1'); // Bold italic
  text = text.replace(/\*\*(.+?)\*\*/g, '$1'); // Bold
  text = text.replace(/__(.+?)__/g, '$1'); // Bold
  text = text.replace(/\*(.+?)\*/g, '$1'); // Italic
  text = text.replace(/_(.+?)_/g, '$1'); // Italic
  text = text.replace(/~~(.+?)~~/g, '$1'); // Strikethrough

  // Remove links but keep link text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');
  text = text.replace(/^\s*\[[^\]]+\]:\s*.+$/gm, ''); // Reference definitions

  // Remove images but keep alt text
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  text = text.replace(/!\[([^\]]*)\]\[[^\]]*\]/g, '$1');

  // Handle lists
  text = text.replace(/^[\s]*[-*+]\s+(.+)$/gm, '$1'); // Unordered lists
  text = text.replace(/^[\s]*\d+\.\s+(.+)$/gm, '$1'); // Ordered lists

  // Remove blockquotes
  text = text.replace(/^>\s+(.+)$/gm, '$1');
  text = text.replace(/^>\s*$/gm, '');

  // Handle tables - convert to simple text
  text = text.replace(/\|(.+)\|/g, (match, content) => {
    return content.split('|').map((cell: string) => cell.trim()).join(' ');
  });
  text = text.replace(/^[-|:\s]+$/gm, ''); // Table separators

  // Remove line breaks in the middle of sentences
  text = text.replace(/([^.\n])\n([a-z])/g, '$1 $2');

  // Clean up multiple spaces
  text = text.replace(/[ \t]+/g, ' ');

  // Clean up multiple line breaks
  text = text.replace(/\n{3,}/g, '\n\n');

  // Remove leading/trailing whitespace from lines
  text = text.split('\n').map(line => line.trim()).join('\n');

  // Remove empty lines at start and end
  text = text.trim();

  return text;
}

export function getWordCount(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function getCharacterCount(text: string): number {
  return text.length;
}

export function getCharacterCountNoSpaces(text: string): number {
  return text.replace(/\s/g, '').length;
}
