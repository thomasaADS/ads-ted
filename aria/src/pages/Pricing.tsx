import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { ChatWidget } from '@/components/ChatWidget';
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'סטרטר',
      price: billingPeriod === 'monthly' ? '$99' : '$79',
      period: billingPeriod === 'monthly' ? 'לחודש' : 'לחודש (חיוב שנתי)',
      description: 'מושלם לעסקים קטנים שרוצים להתחיל',
      icon: Zap,
      features: [
        '5 קמפיינים בחודש',
        '3 פלטפורמות',
        'תמיכה בסיסית',
        'אנליטיקס בסיסי',
      ],
      cta: 'התחל עכשיו',
      popular: false,
    },
    {
      name: 'פרו',
      price: billingPeriod === 'monthly' ? '$299' : '$249',
      period: billingPeriod === 'monthly' ? 'לחודש' : 'לחודש (חיוב שנתי)',
      description: 'הבחירה הכי פופולרית לעסקים בצמיחה',
      icon: Sparkles,
      features: [
        'קמפיינים ללא הגבלה',
        'כל הפלטפורמות',
        'תמיכה 24/7',
        'אנליטיקס מתקדם',
        'A/B Testing',
      ],
      cta: 'התחל עכשיו',
      popular: true,
    },
    {
      name: 'אנטרפרייז',
      price: 'מותאם',
      period: 'לפי צרכים',
      description: 'פתרון מותאם לארגונים גדולים',
      icon: Crown,
      features: [
        'הכל מ-Pro',
        'מנהל חשבון ייעודי',
        'API מלא',
        'הכשרות צוות',
        'SLA מובטח',
      ],
      cta: 'התחל עכשיו',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Star Background - same as home */}
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      <div className="stars-layer-3"></div>

      <Navbar />

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
            תמחור שקוף וגמיש
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            בחר את התוכנית שמתאימה לך
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            התחל חינם, שדרג כשאתה מוכן. ללא הפתעות.
          </p>

          {/* Billing Period Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              חודשי
            </button>
            <Badge variant="secondary" className="animate-pulse">
              20%- שנתי
            </Badge>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              שנתי
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`p-8 relative hover:scale-105 transition-transform ${
                  plan.popular ? 'ring-2 ring-primary shadow-2xl' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                    <Sparkles className="w-4 h-4 inline ml-1" />
                    הכי פופולרי
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.price !== 'מותאם' && (
                      <span className="text-sm text-muted-foreground mr-2">{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => navigate('/brief')}
                  className={`w-full gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Features Image */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8 gradient-text flex items-center justify-center gap-3">
            <BarChart3 className="w-10 h-10" />
            הפלטפורמה שלנו בפעולה
          </h2>
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop"
            alt="Digital Marketing Analytics Dashboard"
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full"
          />
          <p className="text-center text-muted-foreground mt-4 text-lg">
            דשבורד מתקדם לניהול ומעקב אחר כל הקמפיינים שלך במקום אחד
          </p>
        </div>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
