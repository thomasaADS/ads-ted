import { useTranslation } from '@/hooks/useTranslation';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface PlatformGuideProps {
  platform: string;
}

const platformGuides: Record<string, { steps: string[]; url: string }> = {
  meta: {
    steps: [
      'עברו למנהל המודעות של פייסבוק',
      'צרו קמפיין חדש',
      'הדביקו את הכותרת והתיאור שלכם',
      'העלו את התמונה שנוצרה',
      'הגדירו את הקהל והתקציב',
    ],
    url: 'https://business.facebook.com/adsmanager',
  },
  google: {
    steps: [
      'פתחו את Google Ads',
      'צרו מודעה חדשה',
      'העתיקו את הכותרות והתיאורים',
      'העלו את התמונות שלכם',
      'הגדירו מיקוד קהל',
    ],
    url: 'https://ads.google.com',
  },
  tiktok: {
    steps: [
      'עברו למנהל המודעות של TikTok',
      'צרו קמפיין חדש',
      'העלו וידאו אנכי או תמונה',
      'הוסיפו כיתוב והאשטגים',
      'הגדירו קהל ותקציב',
    ],
    url: 'https://ads.tiktok.com',
  },
  linkedin: {
    steps: [
      'פתחו את מנהל הקמפיינים של LinkedIn',
      'צרו קמפיין חדש',
      'הדביקו את הטקסט המקצועי',
      'העלו תמונה',
      'הגדירו מיקוד B2B',
    ],
    url: 'https://www.linkedin.com/campaignmanager',
  },
};

export const PlatformGuide = ({ platform }: PlatformGuideProps) => {
  const { t } = useTranslation();
  const guide = platformGuides[platform] || platformGuides.meta;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {t('generate.howToPublish')}
          <ExternalLink className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('generate.howToPublish')} - {t(`platform.${platform}`)}
          </DialogTitle>
          <DialogDescription>
            {t('generate.followSteps')}
          </DialogDescription>
        </DialogHeader>
        <ol className="list-decimal list-inside space-y-2">
          {guide.steps.map((step, index) => (
            <li key={index} className="text-sm">
              {step}
            </li>
          ))}
        </ol>
        <Button asChild className="w-full">
          <a href={guide.url} target="_blank" rel="noopener noreferrer">
            {t('generate.openAdsManager')} {t(`platform.${platform}`)}
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
