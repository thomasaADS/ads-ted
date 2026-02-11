import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  role: 'bot' | 'user';
  content: string | ReactNode;
  isRtl?: boolean;
}

export const ChatBubble = ({ role, content, isRtl = false }: ChatBubbleProps) => {
  const isBot = role === 'bot';

  return (
    <div
      className={cn(
        'flex gap-3 animate-slide-up',
        isBot ? 'justify-start' : 'justify-end',
        isRtl && (isBot ? 'flex-row-reverse' : 'flex-row')
      )}
    >
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center shadow-glow">
          <Bot className="h-5 w-5 text-white" />
        </div>
      )}

      <div
        className={cn(
          'max-w-[80%] px-4 py-3 rounded-2xl shadow-card',
          isBot
            ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20'
            : 'bg-primary text-primary-foreground',
          isBot ? 'rounded-tl-sm' : 'rounded-tr-sm'
        )}
      >
        {typeof content === 'string' ? (
          <p className={cn('text-sm', isBot ? 'text-foreground' : 'text-primary-foreground')}>
            {content}
          </p>
        ) : (
          content
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center shadow-card">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
};
