import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useState, useRef } from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  path: string;
}

export default function Editor({ value, onChange, language, path }: EditorProps) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        path={path}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          renderWhitespace: 'selection',
          lineNumbers: 'on',
          folding: true,
          glyphMargin: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          padding: { top: 16, bottom: 16 },
        }}
      />
    </div>
  );
}
