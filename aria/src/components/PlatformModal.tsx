import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { CheckCircle2, Image, Zap, Users, Search, Music, Briefcase, Twitter, Camera, Pin, Newspaper, BarChart3, Car, Mail, MessageSquare, Target, DollarSign, Lightbulb, LucideIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { platformConfig } from '@/lib/api';

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    id: string;
    name: string;
    icon: React.ReactNode;
  };
}

export const PlatformModal = ({ isOpen, onClose, platform }: PlatformModalProps) => {
  const { t } = useTranslation();

  const iconMap: Record<string, LucideIcon> = {
    Users, Search, Music, Briefcase, Twitter, Camera, Pin, Newspaper, BarChart3, Car, Mail, MessageSquare
  };

  const config = platformConfig[platform.id as keyof typeof platformConfig];
  const IconComponent = config ? iconMap[config.iconName] : Users;

  const getPlatformData = (platformId: string) => {
    const data: Record<string, any> = {
      meta: {
        gradient: 'gradient-purple-blue',
        formats: ['פיד', 'סטורי', 'ריל', 'קרוסלה'],
        sizes: ['1080x1080', '1080x1920', '1200x628'],
        steps: [
          t('platformModal.meta.step1'),
          t('platformModal.meta.step2'),
          t('platformModal.meta.step3'),
        ],
      },
      google: {
        gradient: 'gradient-fire',
        formats: ['חיפוש', 'תצוגה', 'וידאו', 'שופינג'],
        sizes: ['300x250', '728x90', '1200x628', '300x600'],
        steps: [
          t('platformModal.google.step1'),
          t('platformModal.google.step2'),
          t('platformModal.google.step3'),
        ],
      },
      tiktok: {
        gradient: 'gradient-sunset',
        formats: ['פיד', 'TopView', 'מודעות Spark'],
        sizes: ['1080x1920', '720x1280'],
        steps: [
          t('platformModal.tiktok.step1'),
          t('platformModal.tiktok.step2'),
          t('platformModal.tiktok.step3'),
        ],
      },
      linkedin: {
        gradient: 'gradient-primary',
        formats: ['תמונה בודדת', 'קרוסלה', 'וידאו', 'מסמך'],
        sizes: ['1200x627', '1200x1200'],
        steps: [
          t('platformModal.linkedin.step1'),
          t('platformModal.linkedin.step2'),
          t('platformModal.linkedin.step3'),
        ],
      },
    };

    return data[platformId] || {
      gradient: 'gradient-primary',
      formats: ['סטנדרטי'],
      sizes: ['1200x628'],
      steps: [
        t('platformModal.default.step1'),
        t('platformModal.default.step2'),
        t('platformModal.default.step3'),
      ],
    };
  };

  const data = getPlatformData(platform.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className={`w-14 h-14 rounded-full ${config?.gradient || 'bg-primary'} flex items-center justify-center ${config?.glowColor || 'shadow-primary/50'} shadow-2xl animate-glow`}>
              {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
            </div>
            <span className="gradient-text">{platform.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Supported Formats */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {t('platformModal.formats.title')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.formats.map((format: string) => (
                <Badge key={format} variant="secondary" className="text-sm">
                  {format}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommended Sizes */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Image className="h-5 w-5 text-primary" />
              {t('platformModal.sizes.title')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.sizes.map((size: string) => (
                <Badge key={size} variant="outline" className="text-sm">
                  {size}
                </Badge>
              ))}
            </div>
          </div>

          {/* Publishing Steps */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              {t('platformModal.steps.title')}
            </h3>
            <div className="space-y-3">
              {data.steps.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          {config?.bestPractices && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                {t('platformModal.bestPractices.title')}
              </h3>
              <div className="space-y-2">
                {config.bestPractices.map((practice: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-success/5 border border-success/20">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audience Tips */}
          {config?.audienceTips && (
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {t('platformModal.audienceTips.title')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {config.audienceTips.map((tip: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm py-2 px-3">
                    {tip}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Budget Guide */}
          {config?.budgetGuide && (
            <div className="p-5 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                {t('platformModal.budget.title')}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-xs text-muted-foreground mb-1">{t('platformModal.budget.min')}</p>
                  <p className="text-2xl font-bold text-primary">${config.budgetGuide.min}</p>
                </div>
                <div className="p-3 rounded-lg bg-background/50">
                  <p className="text-xs text-muted-foreground mb-1">{t('platformModal.budget.recommended')}</p>
                  <p className="text-2xl font-bold text-primary">${config.budgetGuide.recommended}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic">{config.budgetGuide.note}</p>
            </div>
          )}

          {/* Example Preview */}
          <div className={`p-6 rounded-lg ${data.gradient} text-white shadow-strong`}>
            <p className="text-sm font-medium mb-2">{t('platformModal.preview.title')}</p>
            <div className="glass-card rounded-lg p-4 border border-white/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-white/30" />
                <div>
                  <div className="h-3 w-24 bg-white/40 rounded mb-1" />
                  <div className="h-2 w-16 bg-white/30 rounded" />
                </div>
              </div>
              <div className="h-40 bg-white/30 rounded mb-3" />
              <div className="h-3 w-full bg-white/40 rounded mb-2" />
              <div className="h-3 w-3/4 bg-white/30 rounded" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
