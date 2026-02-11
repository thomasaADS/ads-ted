import { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2, Plus, Minus, Clock, Smartphone, DollarSign, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export const FAQ = ({ items }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const icons = [Clock, Smartphone, DollarSign, Rocket];

  const getGradientBorder = (index: number) => {
    const gradients = [
      'border-l-4 border-l-primary',
      'border-l-4 border-l-secondary',
      'border-l-4 border-l-purple',
      'border-l-4 border-l-coral',
      'border-l-4 border-l-success',
      'border-l-4 border-l-accent',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index}
            className={cn(
              "rounded-lg overflow-hidden bg-card shadow-card hover:shadow-hover transition-all duration-300 border-2",
              getGradientBorder(index),
              isOpen ? 'shadow-glow scale-[1.02]' : 'hover:scale-[1.01]'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-transparent hover:to-primary/5 transition-all group"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 flex-1">
                <HelpCircle className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all duration-300",
                  isOpen ? "text-primary scale-110 rotate-180" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className={cn(
                  "font-bold pr-4 transition-colors",
                  isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                )}>
                  {item.question}
                </span>
              </div>
              <ChevronDown 
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-all duration-300 flex-shrink-0",
                  isOpen && "transform rotate-180 text-primary scale-110"
                )}
              />
            </button>
            
            {isOpen && (
              <div className="px-6 pb-5 animate-slide-up">
                <div className="pl-8 text-muted-foreground border-l-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-r-lg">
                  {item.answer.split('\n').map((line, i) => (
                    line.trim() && (
                      <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
