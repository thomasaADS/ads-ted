import { Button } from './ui/button';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionChipsProps {
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  selected?: string[];
  multiSelect?: boolean;
  onSelect: (value: string) => void;
  className?: string;
}

export const OptionChips = ({
  options,
  selected = [],
  multiSelect = false,
  onSelect,
  className,
}: OptionChipsProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);

        return (
          <Button
            key={option.value}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(option.value)}
            className={cn(
              'transition-all hover:scale-105 hover:shadow-hover',
              isSelected && 'shadow-glow animate-bounce-in'
            )}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.label}
            {multiSelect && isSelected && (
              <CheckCircle2 className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      })}
    </div>
  );
};
