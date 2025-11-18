import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', monospace",
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#007acc',
        selection: '#264f78',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    term.writeln('Welcome to WebIDE Terminal v1.0.0');
    term.writeln('Type "help" for available commands');
    term.write('\r\n$ ');

    let currentLine = '';

    term.onData((data) => {
      const code = data.charCodeAt(0);

      if (code === 13) {
        term.write('\r\n');
        handleCommand(currentLine.trim());
        currentLine = '';
        term.write('$ ');
      } else if (code === 127) {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      } else if (code >= 32) {
        currentLine += data;
        term.write(data);
      }
    });

    const handleCommand = (cmd: string) => {
      if (!cmd) return;

      switch (cmd.toLowerCase()) {
        case 'help':
          term.writeln('Available commands:');
          term.writeln('  help     - Show this help message');
          term.writeln('  clear    - Clear terminal');
          term.writeln('  ls       - List files');
          term.writeln('  pwd      - Print working directory');
          term.writeln('  echo     - Echo text');
          term.writeln('  date     - Show current date');
          break;
        case 'clear':
          term.clear();
          break;
        case 'ls':
          term.writeln('src/');
          term.writeln('package.json');
          term.writeln('README.md');
          break;
        case 'pwd':
          term.writeln('/workspace/my-project');
          break;
        case 'date':
          term.writeln(new Date().toString());
          break;
        default:
          if (cmd.startsWith('echo ')) {
            term.writeln(cmd.slice(5));
          } else {
            term.writeln(`Command not found: ${cmd}`);
          }
      }
    };

    const handleResize = () => {
      fitAddon.fit();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, []);

  const handleClear = () => {
    xtermRef.current?.clear();
  };

  const handleKill = () => {
    xtermRef.current?.write('^C\r\n$ ');
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--vscode-panel))]">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Terminal" size={14} className="text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-wide">Terminal</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleClear}
            title="Clear"
          >
            <Icon name="Trash2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleKill}
            title="Kill Terminal"
          >
            <Icon name="X" size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" title="Split Terminal">
            <Icon name="SplitSquareHorizontal" size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" title="New Terminal">
            <Icon name="Plus" size={14} />
          </Button>
        </div>
      </div>
      <div ref={terminalRef} className="flex-1 p-2 overflow-hidden" />
    </div>
  );
};
