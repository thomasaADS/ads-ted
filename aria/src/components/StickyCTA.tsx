import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StickyCTAProps {
  text: string;
  onClick: () => void;
}

export const StickyCTA = ({ text, onClick }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <Button 
        onClick={onClick}
        size="lg"
        className="shadow-strong hover:shadow-hover transition-all hover:scale-105 px-8"
      >
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
