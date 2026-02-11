import { ReactNode, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Target, TrendingUp, Zap, Rocket, Sparkles, FileText, Workflow, Bot, BarChart4, LineChart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  details: string;
  cta: string;
  onCtaClick: () => void;
}

export const ServiceCard = ({ icon, title, description, details, cta, onCtaClick }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getGradientClass = () => {
    if (title.includes('אסטרטגיה') || title.includes('Strategy'))
      return 'hover:gradient-strategy hover:text-primary-foreground hover:border-primary';
    if (title.includes('קמפיינים') || title.includes('Campaigns'))
      return 'hover:gradient-campaigns hover:text-primary-foreground hover:border-secondary';
    if (title.includes('תוכן') || title.includes('Content'))
      return 'hover:gradient-content hover:text-primary-foreground hover:border-coral';
    if (title.includes('אוטומציה') || title.includes('Automation'))
      return 'hover:gradient-automation hover:text-primary-foreground hover:border-purple';
    if (title.includes('מדידה') || title.includes('Analytics'))
      return 'hover:gradient-analytics hover:text-primary-foreground hover:border-success';
    return 'hover:gradient-primary hover:text-primary-foreground hover:border-primary';
  };

  const getIconColorClass = () => {
    if (title.includes('אסטרטגיה') || title.includes('Strategy')) return 'text-primary group-hover:text-white';
    if (title.includes('קמפיינים') || title.includes('Campaigns')) return 'text-secondary group-hover:text-white';
    if (title.includes('תוכן') || title.includes('Content')) return 'text-coral group-hover:text-white';
    if (title.includes('אוטומציה') || title.includes('Automation')) return 'text-purple group-hover:text-white';
    if (title.includes('מדידה') || title.includes('Analytics')) return 'text-success group-hover:text-white';
    return 'text-primary group-hover:text-white';
  };

  return (
    <Card 
      className={`p-6 transition-all duration-500 hover:shadow-glow hover:scale-105 cursor-pointer group border-2 overflow-hidden relative hover-tilt ${getGradientClass()}`}
      onClick={() => setIsExpanded(!isExpanded)}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className={`${getIconColorClass()} group-hover:scale-125 transition-all duration-500 flex-shrink-0 icon-rotate-hover`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-current">
              {title}
            </h3>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
            ) : (
              <ChevronDown className="h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110" />
            )}
          </div>
          <p className="mb-4 transition-colors group-hover:text-current/90">{description}</p>
          
          {isExpanded && (
            <div className="animate-slide-up">
              <p className="text-sm text-foreground mb-4 pb-4 border-b border-border">
                {details}
              </p>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onCtaClick();
                }}
                className="w-full"
                size="lg"
              >
                {cta}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
