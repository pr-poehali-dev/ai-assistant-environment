import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface FileChange {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'renamed';
  diff: string;
}

export const GitPanel = () => {
  const [commitMessage, setCommitMessage] = useState('');
  const [changes] = useState<FileChange[]>([
    { path: 'src/App.tsx', status: 'modified', diff: '+12 -3' },
    { path: 'src/components/Button.tsx', status: 'added', diff: '+45' },
    { path: 'src/styles/old.css', status: 'deleted', diff: '-23' },
    { path: 'README.md', status: 'modified', diff: '+5 -2' },
  ]);

  const [commits] = useState([
    { hash: 'a3f2b1c', message: 'Add new feature', author: 'You', time: '2 hours ago' },
    { hash: '7d8e9f0', message: 'Fix: resolve bug in auth', author: 'You', time: '5 hours ago' },
    { hash: '1b2c3d4', message: 'Update documentation', author: 'You', time: '1 day ago' },
    { hash: '5e6f7g8', message: 'Initial commit', author: 'You', time: '3 days ago' },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'modified': return { icon: 'FileEdit', color: 'text-yellow-500' };
      case 'added': return { icon: 'FilePlus', color: 'text-green-500' };
      case 'deleted': return { icon: 'FileX', color: 'text-red-500' };
      case 'renamed': return { icon: 'FileEdit', color: 'text-blue-500' };
      default: return { icon: 'File', color: 'text-gray-500' };
    }
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--vscode-sidebar))]">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="GitBranch" size={16} className="text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wide">Source Control</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {changes.length}
        </Badge>
      </div>

      <div className="p-3 space-y-2 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="GitBranch" size={14} />
          <span className="font-mono font-semibold">main</span>
          <Icon name="ArrowUpDown" size={12} className="ml-auto text-muted-foreground" />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
            <Icon name="GitPullRequest" size={12} className="mr-1" />
            Pull
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-8 text-xs">
            <Icon name="Upload" size={12} className="mr-1" />
            Push
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Changes
              </span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Icon name="Plus" size={12} />
                </Button>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Icon name="RotateCcw" size={12} />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              {changes.map((change, idx) => {
                const status = getStatusIcon(change.status);
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent/50 rounded cursor-pointer group"
                  >
                    <Icon name={status.icon} size={14} className={status.color} />
                    <span className="text-sm font-mono flex-1 truncate">{change.path}</span>
                    <span className="text-xs text-muted-foreground">{change.diff}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 opacity-0 group-hover:opacity-100"
                    >
                      <Icon name="Plus" size={12} />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2 block">
              Commit
            </span>
            <Input
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Message (Ctrl+Enter to commit)"
              className="h-20 text-sm font-mono resize-none"
            />
            <Button
              className="w-full mt-2 h-8 text-xs"
              disabled={!commitMessage.trim()}
            >
              <Icon name="GitCommit" size={12} className="mr-1" />
              Commit Changes
            </Button>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                History
              </span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <Icon name="MoreVertical" size={12} />
              </Button>
            </div>

            <div className="space-y-1">
              {commits.map((commit, idx) => (
                <div
                  key={idx}
                  className="px-2 py-2 hover:bg-accent/50 rounded cursor-pointer space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-primary font-mono">{commit.hash}</code>
                    <span className="text-xs text-muted-foreground">{commit.time}</span>
                  </div>
                  <p className="text-sm">{commit.message}</p>
                  <span className="text-xs text-muted-foreground">{commit.author}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-2 border-t border-border flex gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="GitMerge" size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="GitPullRequest" size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="History" size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" className="ml-auto">
          <Icon name="Settings" size={14} />
        </Button>
      </div>
    </div>
  );
};
