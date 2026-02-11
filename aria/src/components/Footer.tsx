import { useTranslation } from '@/hooks/useTranslation';
import { Sparkles, Facebook, Instagram, Linkedin, Mail, Phone, Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { label: t('footer.about'), href: '/about' },
    { label: t('footer.contact'), href: '#' },
    { label: t('footer.privacy'), href: '/privacy' },
    { label: t('footer.terms'), href: '/terms' },
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: 'https://facebook.com/adsync', 
      label: 'Facebook',
      color: 'hover:text-blue-600'
    },
    { 
      icon: Instagram, 
      href: 'https://instagram.com/adsync', 
      label: 'Instagram',
      color: 'hover:text-pink-600'
    },
    { 
      icon: Linkedin, 
      href: 'https://linkedin.com/company/adsync', 
      label: 'LinkedIn',
      color: 'hover:text-blue-700'
    },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4 gradient-text">AdSync</h3>
            <p className="text-sm text-muted-foreground mb-4">
              פלטפורמת AI מתקדמת ליצירת קמפיינים מנצחים תוך דקות
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">קישורים מהירים</h4>
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">צור קשר</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@adsync.com" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@adsync.com
              </a>
              <a href="tel:+972123456789" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" />
                072-123-4567
              </a>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-4">בנה את האתר שלך</h4>
            <a
              href="/landing-page-builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-lg transition-all"
            >
              <Sparkles className="h-4 w-4" />
              בנה דף נחיתה עם AI
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                Made in Israel
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
