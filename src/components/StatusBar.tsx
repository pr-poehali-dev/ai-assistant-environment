import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export const StatusBar = () => {
  return (
    <div className="h-6 bg-[hsl(var(--vscode-statusbar))] border-t border-border flex items-center justify-between px-3 text-xs text-white">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="h-5 px-2 text-xs text-white hover:bg-white/10">
          <Icon name="GitBranch" size={12} className="mr-1" />
          main
        </Button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          <Icon name="CloudOff" size={12} className="inline mr-1" />
          0 ⚠ 0
        </button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          <Icon name="Radio" size={12} className="inline mr-1" />
          Live Server: 5173
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          Ln 24, Col 16
        </button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          Spaces: 2
        </button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          UTF-8
        </button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          LF
        </button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          TypeScript JSX
        </button>
        
        <button className="hover:bg-white/10 px-2 py-0.5 rounded transition-colors">
          <Icon name="Bell" size={12} />
        </button>
      </div>
    </div>
  );
};
