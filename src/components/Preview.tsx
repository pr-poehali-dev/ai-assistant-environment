import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Preview = () => {
  const [url, setUrl] = useState('http://localhost:5173');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--vscode-editor))]">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-[hsl(var(--vscode-sidebar))]">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="ArrowLeft" size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="ArrowRight" size={14} />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-7 w-7"
          onClick={handleRefresh}
        >
          <Icon 
            name="RotateCw" 
            size={14} 
            className={isRefreshing ? 'animate-spin' : ''}
          />
        </Button>
        
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-7 flex-1 font-mono text-xs bg-[hsl(var(--vscode-panel))]"
        />
        
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="ExternalLink" size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Icon name="MoreVertical" size={14} />
        </Button>
      </div>

      <div className="flex-1 bg-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Globe" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Live Preview</h3>
            <p className="text-gray-600 text-sm">
              Your application will appear here in real-time as you code. 
              Start by creating a new file or editing existing ones.
            </p>
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon name="Zap" size={16} className="text-yellow-500" />
                <span>Auto-refresh on save</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon name="Smartphone" size={16} className="text-blue-500" />
                <span>Responsive preview modes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon name="Eye" size={16} className="text-green-500" />
                <span>Instant hot reload</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-1.5 border-t border-border bg-[hsl(var(--vscode-sidebar))] flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            Connected
          </span>
          <span>React 18.2.0</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <Icon name="Tablet" size={12} />
          </Button>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <Icon name="Smartphone" size={12} />
          </Button>
          <Button variant="ghost" size="icon" className="h-5 w-5">
            <Icon name="Monitor" size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
};
