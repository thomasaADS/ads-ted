import { useEffect, useState } from 'react';
import { TrendingUp, DollarSign, Target, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

export const StatsSection = () => {
  const { t } = useTranslation();
  const campaigns = useCountUp(10000);
  const budget = useCountUp(5);
  const roi = useCountUp(73);
  const time = useCountUp(47);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-glow transition-all hover-lift group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-6 w-6 text-primary group-hover:animate-pulse" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">+{campaigns.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">{t('stats.campaigns')}</div>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-glow transition-all hover-lift group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/10 mb-4 group-hover:scale-110 group-hover:animate-bounce transition-all">
              <DollarSign className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-4xl font-bold text-secondary mb-2">${budget} מיליון+</div>
            <div className="text-sm text-muted-foreground">{t('stats.budget')}</div>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-glow transition-all hover-lift group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4 group-hover:scale-110 transition-transform">
              <Target className="h-6 w-6 text-accent group-hover:animate-pulse" />
            </div>
            <div className="text-4xl font-bold text-accent mb-2">{roi}%</div>
            <div className="text-sm text-muted-foreground">{t('stats.roi')}</div>
          </div>

          <div className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:shadow-glow transition-all hover-lift group">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/10 mb-4 group-hover:scale-110 transition-transform icon-rotate-hover">
              <Zap className="h-6 w-6 text-success" />
            </div>
            <div className="text-4xl font-bold text-success mb-2">{time} שניות</div>
            <div className="text-sm text-muted-foreground">{t('stats.time')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
