import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  onFileSelect: (path: string) => void;
  selectedFile: string | null;
  onCreateFile: (parentPath: string, name: string) => void;
  onDeleteFile: (path: string) => void;
}

export default function FileTree({ files, onFileSelect, selectedFile, onCreateFile, onDeleteFile }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['/']));

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const getFileIcon = (name: string, type: string) => {
    if (type === 'folder') {
      return expandedFolders.has(name) ? 'FolderOpen' : 'Folder';
    }
    
    const ext = name.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      ts: 'FileCode',
      tsx: 'FileCode',
      js: 'FileCode',
      jsx: 'FileCode',
      json: 'Braces',
      css: 'Palette',
      html: 'Code2',
      md: 'FileText',
      py: 'FileCode',
      txt: 'FileText',
    };
    
    return iconMap[ext || ''] || 'File';
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <div
          className={cn(
            'flex items-center gap-1.5 px-2 py-1 text-sm cursor-pointer hover:bg-[hsl(var(--vscode-panel))] transition-colors',
            isSelected && 'bg-[hsl(var(--vscode-accent))]/20 text-[hsl(var(--vscode-accent))]'
          )}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              onFileSelect(node.path);
            }
          }}
        >
          <Icon 
            name={getFileIcon(node.name, node.type)} 
            size={16} 
            className={cn(
              'shrink-0',
              node.type === 'folder' && 'text-[hsl(var(--vscode-accent))]'
            )}
          />
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto text-[hsl(var(--vscode-text))]">
      <div className="py-2">
        {files.map(file => renderNode(file))}
      </div>
    </div>
  );
}
