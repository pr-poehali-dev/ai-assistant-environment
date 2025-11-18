import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

interface FileExplorerProps {
  onFileSelect: (file: FileNode) => void;
}

const initialFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'App.tsx',
        type: 'file',
        content: `import { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="App">\n      <h1>Hello World</h1>\n      <button onClick={() => setCount(count + 1)}>\n        Count: {count}\n      </button>\n    </div>\n  );\n}\n\nexport default App;`
      },
      {
        name: 'index.css',
        type: 'file',
        content: `body {\n  margin: 0;\n  font-family: Inter, system-ui, sans-serif;\n  background: #1e1e1e;\n  color: #d4d4d4;\n}\n\n.App {\n  padding: 2rem;\n}`
      },
      {
        name: 'components',
        type: 'folder',
        children: [
          {
            name: 'Button.tsx',
            type: 'file',
            content: `interface ButtonProps {\n  children: React.ReactNode;\n  onClick?: () => void;\n}\n\nexport const Button = ({ children, onClick }: ButtonProps) => {\n  return (\n    <button onClick={onClick}>\n      {children}\n    </button>\n  );\n};`
          }
        ]
      }
    ]
  },
  {
    name: 'package.json',
    type: 'file',
    content: `{\n  "name": "my-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  }\n}`
  },
  {
    name: 'README.md',
    type: 'file',
    content: `# My Project\n\nWelcome to my awesome project!\n\n## Getting Started\n\nRun \`npm install\` and \`npm start\` to begin.`
  }
];

const FileTreeItem = ({ 
  node, 
  level = 0, 
  onSelect,
  selectedFile 
}: { 
  node: FileNode; 
  level?: number; 
  onSelect: (file: FileNode) => void;
  selectedFile: FileNode | null;
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(node);
    }
  };

  const isSelected = selectedFile?.name === node.name;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1 cursor-pointer hover:bg-accent/50 transition-colors ${
          isSelected ? 'bg-accent' : ''
        }`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          <Icon 
            name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
            size={14} 
            className="text-muted-foreground"
          />
        )}
        <Icon
          name={node.type === 'folder' ? 'Folder' : 'FileText'}
          size={16}
          className={node.type === 'folder' ? 'text-blue-400' : 'text-muted-foreground'}
        />
        <span className="text-sm font-mono">{node.name}</span>
      </div>
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <FileTreeItem
              key={idx}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer = ({ onFileSelect }: FileExplorerProps) => {
  const [files] = useState<FileNode[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      setNewFileName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--vscode-sidebar))]">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Explorer
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsCreating(true)}
          >
            <Icon name="FilePlus" size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icon name="FolderPlus" size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icon name="RefreshCw" size={14} />
          </Button>
        </div>
      </div>

      {isCreating && (
        <div className="p-2 border-b border-border">
          <Input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="filename.tsx"
            className="h-7 text-sm font-mono"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFile();
              if (e.key === 'Escape') {
                setIsCreating(false);
                setNewFileName('');
              }
            }}
          />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {files.map((node, idx) => (
          <FileTreeItem
            key={idx}
            node={node}
            onSelect={handleFileSelect}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  );
};
