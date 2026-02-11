import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Option {
  id: string;
  label: string;
  description: string;
  result: string;
}

interface InteractiveEngagementProps {
  title: string;
  subtitle: string;
  options: Option[];
  onComplete: (selectedId: string) => void;
}

export const InteractiveEngagement = ({ title, subtitle, options, onComplete }: InteractiveEngagementProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const { t } = useTranslation();

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleSubmit = () => {
    if (selected) {
      setShowResult(true);
      setTimeout(() => {
        onComplete(selected);
      }, 2000);
    }
  };

  const selectedOption = options.find(opt => opt.id === selected);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>

      {!showResult ? (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {options.map((option) => (
              <Card
                key={option.id}
                className={`p-6 cursor-pointer transition-all hover:shadow-hover ${
                  selected === option.id 
                    ? 'border-primary border-2 bg-primary/5' 
                    : 'border-border'
                }`}
                onClick={() => handleSelect(option.id)}
                role="radio"
                aria-checked={selected === option.id}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option.id);
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    selected === option.id 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                  }`}>
                    {selected === option.id && (
                      <Check className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{option.label}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={!selected}
              size="lg"
              className="px-12"
            >
              {t('cta.button')}
            </Button>
          </div>
        </>
      ) : (
        <Card className="p-8 text-center animate-scale-in shadow-hover">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h4 className="text-xl font-bold mb-2">{t('engagement.perfect')}</h4>
          <p className="text-muted-foreground text-lg">
            {selectedOption?.result}
          </p>
        </Card>
      )}
    </div>
  );
};
