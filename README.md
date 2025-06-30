
# Markdown to Plain Text Converter

A powerful, Mac-optimized web application for converting Markdown text to clean plain text. Perfect for users who need to quickly strip formatting from Markdown content for use in Google Docs, email, or other plain text environments.

![Markdown Converter](https://img.shields.io/badge/Type-Web%20Application-blue)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## Features

### Core Functionality
- **Real-time Conversion**: Instantly converts Markdown to plain text as you type
- **File Upload Support**: Upload `.md`, `.markdown`, or `.txt` files directly
- **Drag & Drop**: Intuitive file handling with drag and drop support
- **Copy to Clipboard**: One-click copying for both Markdown input and plain text output
- **Download Output**: Save converted text as `.txt` files

### User Experience
- **Mac-Optimized**: Designed with Mac users in mind, supporting Cmd key shortcuts
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Statistics**: Live word and character count for both input and output
- **Undo/Redo**: Full history tracking with keyboard shortcuts

### Advanced Features
- **Sample Content**: Pre-loaded example to demonstrate functionality
- **File Validation**: Automatic file type and size validation (5MB limit)
- **Error Handling**: Comprehensive error messages and toast notifications
- **Keyboard Shortcuts**: Mac/Windows compatible shortcuts for efficiency

## Supported Markdown Elements

The converter handles a comprehensive range of Markdown syntax:

- **Headers** (H1-H6): `# ## ### #### ##### ######`
- **Text Formatting**: Bold (`**text**`), Italic (`*text*`), Strikethrough (`~~text~~`)
- **Links**: `[text](url)` and reference-style links
- **Images**: `![alt](url)` (preserves alt text)
- **Lists**: Ordered and unordered lists with proper indentation
- **Code Blocks**: Fenced (```) and indented code blocks
- **Inline Code**: `code` snippets
- **Blockquotes**: `> quoted text`
- **Tables**: Converts to space-separated text
- **Horizontal Rules**: `---` or `***`
- **YAML Front Matter**: Automatically removes metadata
- **HTML Comments**: Strips out comments

## Keyboard Shortcuts

### Mac Users
- `Cmd + Z`: Undo
- `Cmd + Shift + Z`: Redo
- `Cmd + V`: Paste (with automatic conversion)

### Windows/Linux Users
- `Ctrl + Z`: Undo
- `Ctrl + Shift + Z`: Redo
- `Ctrl + V`: Paste (with automatic conversion)

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with functional components and hooks
- **TypeScript**: Full type safety and enhanced developer experience
- **Vite**: Lightning-fast build tool and development server

### UI Components
- **shadcn/ui**: High-quality, accessible UI components
- **Radix UI**: Headless UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful, customizable icons

### State Management & Utilities
- **TanStack Query**: Powerful data fetching and state management
- **React Router**: Client-side routing
- **Class Variance Authority**: Type-safe component variants
- **Tailwind Merge**: Intelligent Tailwind class merging

## Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Header.tsx         # Application header with theme toggle
│   ├── FileUploader.tsx   # File upload with drag & drop
│   └── StatsDisplay.tsx   # Word and character count display
├── pages/
│   └── Index.tsx          # Main converter interface
├── utils/
│   └── markdownConverter.ts # Core conversion logic
└── hooks/
    └── use-toast.ts       # Toast notification system
```

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd markdown-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist/` directory.

## Usage Guide

### Basic Conversion
1. Paste or type Markdown text in the left panel
2. View the converted plain text in the right panel in real-time
3. Use the "Copy Text" button to copy the converted output

### File Upload
1. Click "Upload File" or drag and drop a file onto the upload button
2. Supported formats: `.md`, `.markdown`, `.txt`
3. Maximum file size: 5MB

### Sample Content
Click "Load Sample" to see a demonstration of the converter's capabilities with example Markdown content.

### Theme Toggle
Use the sun/moon toggle in the header to switch between light and dark modes.

## Browser Compatibility

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## Performance

- **Conversion Speed**: Real-time processing for files up to 5MB
- **Memory Usage**: Optimized for large documents
- **Mobile Performance**: Responsive design with touch-friendly interfaces

## Contributing

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Prettier for consistent formatting
- Tailwind CSS for styling

### Development Workflow
1. Create feature branch from main
2. Implement changes with proper TypeScript types
3. Test across different browsers and devices
4. Submit pull request with clear description

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions, issues, or feature requests, please open an issue in the project repository.

---

**Built with ❤️ for the developer community**
