import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Привет! Я твой ИИ-ассистент для разработки. Могу помочь с кодом, объяснить концепции, найти баги и предложить улучшения. Чем могу быть полезен?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        'Вот решение твоей задачи:\n\n```typescript\nconst example = () => {\n  return "Hello, World!";\n};\n```\n\nЭтот код создает простую функцию. Хочешь, чтобы я объяснил подробнее?',
        'Отличный вопрос! Давай разберем по шагам:\n\n1. Сначала нужно импортировать необходимые модули\n2. Затем настроить конфигурацию\n3. И наконец запустить приложение\n\nНужна помощь с конкретным шагом?',
        'Я нашел потенциальную проблему в твоем коде. Посмотри на строку 42 - там может быть утечка памяти. Рекомендую использовать useEffect с cleanup функцией.',
        'Могу предложить несколько вариантов оптимизации:\n\n✓ Использовать мемоизацию для тяжелых вычислений\n✓ Добавить lazy loading для компонентов\n✓ Оптимизировать рендеринг списков\n\nКакой вариант тебя интересует?'
      ];
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { icon: 'Code', label: 'Объяснить код', prompt: 'Объясни, что делает этот код' },
    { icon: 'Bug', label: 'Найти баги', prompt: 'Проверь код на возможные ошибки' },
    { icon: 'Sparkles', label: 'Улучшить', prompt: 'Как можно улучшить этот код?' },
    { icon: 'Lightbulb', label: 'Предложить', prompt: 'Предложи альтернативное решение' },
  ];

  return (
    <div className="h-full flex flex-col bg-[hsl(var(--vscode-sidebar))]">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Sparkles" size={16} className="text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wide">AI Assistant</span>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Icon name="MoreVertical" size={14} />
          </Button>
        </div>
      </div>

      <div className="flex gap-2 p-2 border-b border-border overflow-x-auto">
        {quickActions.map((action, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            className="h-7 text-xs whitespace-nowrap"
            onClick={() => setInput(action.prompt)}
          >
            <Icon name={action.icon} size={12} className="mr-1" />
            {action.label}
          </Button>
        ))}
      </div>

      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'assistant' && (
                <Avatar className="h-7 w-7 bg-primary">
                  <AvatarFallback className="bg-primary text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`flex-1 max-w-[85%] ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-lg p-3'
                    : 'bg-accent/50 rounded-lg p-3'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                <span className="text-xs opacity-60 mt-2 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>

              {msg.role === 'user' && (
                <Avatar className="h-7 w-7 bg-secondary">
                  <AvatarFallback className="bg-secondary text-xs">
                    <Icon name="User" size={14} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-7 w-7 bg-primary">
                <AvatarFallback className="bg-primary text-white text-xs">
                  AI
                </AvatarFallback>
              </Avatar>
              <div className="bg-accent/50 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Спроси что-нибудь..."
            className="flex-1 h-9 text-sm"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="h-9 w-9"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          ИИ может делать ошибки. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
};
