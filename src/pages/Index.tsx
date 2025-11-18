import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import Editor from '@/components/Editor';
import FileTree, { FileNode } from '@/components/FileTree';
import { Terminal } from '@/components/Terminal';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const initialFiles: FileNode[] = [
  {
    name: 'src',
    path: '/src',
    type: 'folder',
    children: [
      { name: 'App.tsx', path: '/src/App.tsx', type: 'file' },
      { name: 'index.tsx', path: '/src/index.tsx', type: 'file' },
      { name: 'styles.css', path: '/src/styles.css', type: 'file' },
    ],
  },
  {
    name: 'public',
    path: '/public',
    type: 'folder',
    children: [
      { name: 'index.html', path: '/public/index.html', type: 'file' },
    ],
  },
  { name: 'package.json', path: '/package.json', type: 'file' },
  { name: 'README.md', path: '/README.md', type: 'file' },
];

const fileContents: Record<string, string> = {
  '/src/App.tsx': `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Web IDE</h1>
      <p>Start editing to see changes!</p>
    </div>
  );
}

export default App;`,
  '/src/index.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  '/src/styles.css': `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #1e1e1e;
  color: #d4d4d4;
}

.App {
  padding: 2rem;
}

h1 {
  color: #007acc;
  margin-bottom: 1rem;
}`,
  '/public/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web IDE App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  '/package.json': `{
  "name": "web-ide-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
  '/README.md': `# Web IDE Project

This is a sample project created in Web IDE.

## Features
- Monaco Editor integration
- Terminal support
- File management
- Live preview

## Getting Started
Edit files in the editor and see changes instantly!`,
};

export default function Index() {
  const [selectedFile, setSelectedFile] = useState<string | null>('/src/App.tsx');
  const [openTabs, setOpenTabs] = useState<string[]>(['/src/App.tsx']);
  const [activeTab, setActiveTab] = useState<string>('/src/App.tsx');
  const [editorContent, setEditorContent] = useState<Record<string, string>>(fileContents);

  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path]);
    }
    setActiveTab(path);
  };

  const handleTabClose = (path: string) => {
    const newTabs = openTabs.filter(tab => tab !== path);
    setOpenTabs(newTabs);
    if (activeTab === path && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const getFileLanguage = (path: string): string => {
    const ext = path.split('.').pop()?.toLowerCase();
    const langMap: Record<string, string> = {
      tsx: 'typescript',
      ts: 'typescript',
      jsx: 'javascript',
      js: 'javascript',
      json: 'json',
      css: 'css',
      html: 'html',
      md: 'markdown',
      py: 'python',
    };
    return langMap[ext || ''] || 'plaintext';
  };

  const getFileName = (path: string) => path.split('/').pop() || path;

  const getFileIcon = (path: string) => {
    const ext = path.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      tsx: 'FileCode',
      ts: 'FileCode',
      jsx: 'FileCode',
      js: 'FileCode',
      json: 'Braces',
      css: 'Palette',
      html: 'Code2',
      md: 'FileText',
      py: 'FileCode',
    };
    return iconMap[ext || ''] || 'File';
  };

  return (
    <div className="h-screen flex flex-col bg-[hsl(var(--vscode-bg))] text-[hsl(var(--vscode-text))]">
      <div className="h-12 bg-[hsl(var(--vscode-panel))] border-b border-[hsl(var(--vscode-border))] flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Code2" size={20} className="text-[hsl(var(--vscode-accent))]" />
          <span className="font-semibold text-sm">Web IDE</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="GitBranch" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Search" size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-12 bg-[hsl(var(--vscode-sidebar))] border-r border-[hsl(var(--vscode-border))] flex flex-col items-center py-2 gap-1">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-[hsl(var(--vscode-accent))] hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="Files" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="Search" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="GitBranch" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="Bug" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="Box" size={20} />
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="User" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-[hsl(var(--vscode-panel))]">
            <Icon name="Settings" size={20} />
          </Button>
        </div>

        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={15} minSize={10}>
            <div className="h-full bg-[hsl(var(--vscode-sidebar))] border-r border-[hsl(var(--vscode-border))]">
              <div className="p-3 border-b border-[hsl(var(--vscode-border))]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--vscode-text-muted))]">
                    Explorer
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Icon name="FilePlus" size={12} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Icon name="FolderPlus" size={12} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Icon name="RotateCw" size={12} />
                    </Button>
                  </div>
                </div>
              </div>
              <FileTree
                files={initialFiles}
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onCreateFile={() => {}}
                onDeleteFile={() => {}}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={60}>
            <div className="h-full flex flex-col bg-[hsl(var(--vscode-bg))]">
              {openTabs.length > 0 ? (
                <>
                  <div className="flex items-center bg-[hsl(var(--vscode-panel))] border-b border-[hsl(var(--vscode-border))] overflow-x-auto">
                    {openTabs.map(tab => (
                      <div
                        key={tab}
                        className={`flex items-center gap-2 px-3 py-2 border-r border-[hsl(var(--vscode-border))] cursor-pointer group min-w-0 ${
                          activeTab === tab
                            ? 'bg-[hsl(var(--vscode-bg))] text-[hsl(var(--vscode-text))]'
                            : 'hover:bg-[hsl(var(--vscode-bg))]/50 text-[hsl(var(--vscode-text-muted))]'
                        }`}
                        onClick={() => setActiveTab(tab)}
                      >
                        <Icon name={getFileIcon(tab)} size={14} className="shrink-0" />
                        <span className="text-xs truncate">{getFileName(tab)}</span>
                        <button
                          className="shrink-0 opacity-0 group-hover:opacity-100 hover:bg-[hsl(var(--vscode-panel))] rounded p-0.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTabClose(tab);
                          }}
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <Editor
                      value={editorContent[activeTab] || ''}
                      onChange={(value) => {
                        if (value !== undefined) {
                          setEditorContent(prev => ({ ...prev, [activeTab]: value }));
                        }
                      }}
                      language={getFileLanguage(activeTab)}
                      path={activeTab}
                    />
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[hsl(var(--vscode-text-muted))]">
                  <div className="text-center">
                    <Icon name="FileCode" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Выберите файл для редактирования</p>
                  </div>
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={25} minSize={15}>
            <Tabs defaultValue="terminal" className="h-full flex flex-col">
              <TabsList className="w-full justify-start rounded-none border-b border-[hsl(var(--vscode-border))] bg-[hsl(var(--vscode-panel))] h-10">
                <TabsTrigger value="terminal" className="text-xs">
                  <Icon name="Terminal" size={14} className="mr-1.5" />
                  Terminal
                </TabsTrigger>
                <TabsTrigger value="problems" className="text-xs">
                  <Icon name="AlertCircle" size={14} className="mr-1.5" />
                  Problems
                </TabsTrigger>
                <TabsTrigger value="output" className="text-xs">
                  <Icon name="ListTree" size={14} className="mr-1.5" />
                  Output
                </TabsTrigger>
                <TabsTrigger value="debug" className="text-xs">
                  <Icon name="Bug" size={14} className="mr-1.5" />
                  Debug
                </TabsTrigger>
              </TabsList>
              <TabsContent value="terminal" className="flex-1 m-0 border-0 p-0">
                <Terminal />
              </TabsContent>
              <TabsContent value="problems" className="flex-1 m-0 p-4">
                <div className="text-[hsl(var(--vscode-text-muted))] text-sm">
                  Нет проблем в этом workspace
                </div>
              </TabsContent>
              <TabsContent value="output" className="flex-1 m-0 p-4">
                <div className="text-[hsl(var(--vscode-text-muted))] text-sm font-mono">
                  Output console...
                </div>
              </TabsContent>
              <TabsContent value="debug" className="flex-1 m-0 p-4">
                <div className="text-[hsl(var(--vscode-text-muted))] text-sm">
                  Debug console
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="h-6 bg-[hsl(var(--vscode-accent))] flex items-center justify-between px-3 text-xs text-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Icon name="GitBranch" size={12} />
            <span>main</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="AlertCircle" size={12} />
            <span>0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="AlertTriangle" size={12} />
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>UTF-8</span>
          <span>LF</span>
          <span>TypeScript React</span>
          <div className="flex items-center gap-1.5">
            <Icon name="Zap" size={12} />
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
}