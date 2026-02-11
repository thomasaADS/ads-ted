import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export const BeforeAfter = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t('beforeAfter.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* After */}
          <div className="relative group">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-success text-success-foreground shadow-lg">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {t('beforeAfter.after.label')}
            </Badge>
            <Card className="p-8 gradient-strategy shadow-glow hover:shadow-strong transition-all duration-500 border-2 border-primary/50 animate-glow h-full">
              <h3 className="text-xl font-bold mb-6 text-primary-foreground">
                {t('beforeAfter.after.title')}
              </h3>
              <div className="space-y-4 text-primary-foreground/90">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.after.point1')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.after.point2')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.after.point3')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.after.point4')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.after.point5')}</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-primary-foreground/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">$0.85</div>
                    <div className="text-sm text-primary-foreground/70">{t('beforeAfter.metrics.cpc')} (-73%)</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">3.2%</div>
                    <div className="text-sm text-primary-foreground/70">{t('beforeAfter.metrics.ctr')} (+300%)</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Before */}
          <div className="relative group">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-destructive text-destructive-foreground shadow-lg">
              <XCircle className="h-3 w-3 mr-1" />
              {t('beforeAfter.before.label')}
            </Badge>
            <Card className="p-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500 border-2 border-destructive/20 h-full">
              <h3 className="text-xl font-bold mb-6 text-muted-foreground">
                {t('beforeAfter.before.title')}
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.before.point1')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.before.point2')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.before.point3')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.before.point4')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{t('beforeAfter.before.point5')}</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-destructive">$3.20</div>
                    <div className="text-sm text-muted-foreground">{t('beforeAfter.metrics.cpc')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-destructive">0.8%</div>
                    <div className="text-sm text-muted-foreground">{t('beforeAfter.metrics.ctr')}</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
