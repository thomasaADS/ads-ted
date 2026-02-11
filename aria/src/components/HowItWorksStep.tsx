import { ReactNode } from 'react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  time: string;
  icon: ReactNode;
}

export const HowItWorksStep = ({ number, title, description, time, icon }: HowItWorksStepProps) => {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-2">{description}</p>
        <p className="text-sm text-primary font-medium">{time}</p>
      </div>
    </div>
  );
};
