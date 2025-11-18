import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const activities = [
  { id: 'explorer', icon: 'FolderOpen', label: 'Explorer' },
  { id: 'search', icon: 'Search', label: 'Search' },
  { id: 'git', icon: 'GitBranch', label: 'Source Control' },
  { id: 'debug', icon: 'Bug', label: 'Run and Debug' },
  { id: 'extensions', icon: 'Package', label: 'Extensions' },
  { id: 'ai', icon: 'Sparkles', label: 'AI Assistant' },
];

export const ActivityBar = ({ activeView, onViewChange }: ActivityBarProps) => {
  return (
    <div className="w-12 bg-[hsl(var(--vscode-activitybar))] flex flex-col items-center py-2 border-r border-border">
      <TooltipProvider delayDuration={300}>
        {activities.map((activity) => (
          <Tooltip key={activity.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`w-10 h-10 mb-1 ${
                  activeView === activity.id
                    ? 'bg-accent border-l-2 border-l-primary'
                    : 'hover:bg-accent/50'
                }`}
                onClick={() => onViewChange(activity.id)}
              >
                <Icon 
                  name={activity.icon} 
                  size={20} 
                  className={activity.id === 'ai' ? 'text-primary' : ''}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{activity.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>

      <div className="flex-1" />

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="w-10 h-10 mb-1">
              <Icon name="User" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Account</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <Icon name="Settings" size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
