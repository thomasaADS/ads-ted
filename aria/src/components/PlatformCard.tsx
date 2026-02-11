import { ReactNode, useState } from 'react';
import { Card } from './ui/card';
import { PlatformModal } from './PlatformModal';
import { Users, Search, Music, Briefcase, Twitter, Camera, Pin, Newspaper, BarChart3, Car, Mail, MessageSquare, LucideIcon } from 'lucide-react';
import { platformConfig } from '@/lib/api';

interface PlatformCardProps {
  icon: ReactNode;
  name: string;
  id: string;
  className?: string;
}

export const PlatformCard = ({ icon, name, id, className = '' }: PlatformCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconMap: Record<string, LucideIcon> = {
    Users, Search, Music, Briefcase, Twitter, Camera, Pin, Newspaper, BarChart3, Car, Mail, MessageSquare
  };

  const config = platformConfig[id as keyof typeof platformConfig];
  const IconComponent = config ? iconMap[config.iconName] : Users;

  const getGradientClass = () => {
    const gradients: Record<string, string> = {
      meta: 'hover:gradient-purple-blue',
      google: 'hover:gradient-fire',
      tiktok: 'hover:gradient-sunset',
      linkedin: 'hover:gradient-primary',
      twitter: 'hover:gradient-ocean',
      snapchat: 'hover:gradient-fire',
      pinterest: 'hover:gradient-pink-orange',
      taboola: 'hover:gradient-fire',
      outbrain: 'hover:gradient-ocean',
      waze: 'hover:gradient-green-teal',
      email: 'hover:gradient-green-teal',
      sms: 'hover:gradient-pink-orange',
    };
    return gradients[id] || 'hover:gradient-primary';
  };

  return (
    <>
      <Card
        className={`p-6 flex flex-col items-center gap-3 hover:shadow-glow-colored transition-all duration-300 hover:scale-110 hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/50 group overflow-hidden relative ${getGradientClass()} ${className}`}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className={`w-20 h-20 rounded-full ${config?.gradient || 'bg-primary'} flex items-center justify-center ${config?.glowColor || 'shadow-primary/50'} group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500 icon-rotate-hover animate-bounce-in relative z-10`}>
          {IconComponent && <IconComponent className="w-10 h-10 text-white" />}
        </div>
        
        <p className="text-sm font-semibold text-center group-hover:text-primary transition-colors relative z-10">
          {name}
        </p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
          לחצו לפרטים
        </p>
      </Card>

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platform={{ id, name, icon }}
      />
    </>
  );
};
