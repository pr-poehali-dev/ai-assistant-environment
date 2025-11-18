import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeEditorProps {
  initialValue?: string;
  language?: string;
  fileName?: string;
}

export const CodeEditor = ({ 
  initialValue = '', 
  language = 'typescript',
  fileName = 'index.tsx'
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialValue);
  const [openTabs, setOpenTabs] = useState([{ name: fileName, language }]);
  const [activeTab, setActiveTab] = useState(fileName);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setCode(initialValue);
  }, [initialValue]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const closeTab = (tabName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs(tabs => tabs.filter(t => t.name !== tabName));
    if (activeTab === tabName && openTabs.length > 1) {
      const idx = openTabs.findIndex(t => t.name === tabName);
      const nextTab = openTabs[idx === 0 ? 1 : idx - 1];
      setActiveTab(nextTab.name);
    }
  };

  const getLanguageIcon = (lang: string) => {
    if (lang.includes('javascript') || lang.includes('typescript')) return 'FileCode';
    if (lang.includes('json')) return 'Braces';
    if (lang.includes('css')) return 'Palette';
    if (lang.includes('html')) return 'Code';
    return 'FileText';
  };

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--vscode-editor))]">
      <div className="flex items-center justify-between border-b border-border bg-[hsl(var(--vscode-sidebar))]">
        <div className="flex items-center flex-1 overflow-x-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-9 bg-transparent rounded-none border-0 space-x-0">
              {openTabs.map(tab => (
                <TabsTrigger
                  key={tab.name}
                  value={tab.name}
                  className="relative h-9 px-4 rounded-none border-r border-border data-[state=active]:bg-[hsl(var(--vscode-editor))] data-[state=active]:border-t-2 data-[state=active]:border-t-primary font-mono text-xs group"
                >
                  <Icon name={getLanguageIcon(tab.language)} size={14} className="mr-2" />
                  {tab.name}
                  <button
                    onClick={(e) => closeTab(tab.name, e)}
                    className="ml-2 opacity-0 group-hover:opacity-100 hover:bg-accent rounded p-0.5 transition-opacity"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-1 px-2">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Icon name="Split" size={14} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Icon name="MoreVertical" size={14} />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            lineNumbers: 'on',
            rulers: [80, 120],
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
            tabSize: 2,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'all',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            contextmenu: true,
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: 'on',
            snippetSuggestions: 'top',
            bracketPairColorization: {
              enabled: true
            }
          }}
        />
      </div>
    </div>
  );
};
