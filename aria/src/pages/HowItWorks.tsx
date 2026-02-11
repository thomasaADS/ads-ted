import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ChatWidget } from '@/components/ChatWidget';
import { useScrollAnimation, useScrollProgress } from '@/hooks/useScrollAnimation';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  FileText,
  Rocket,
  ChevronDown,
  CreditCard,
} from 'lucide-react';

// Individual step component with scroll animation
function StepSection({ step, index }: { step: any; index: number }) {
  const { ref, inView } = useScrollAnimation({ threshold: 0.3 });
  const isEven = index % 2 === 0;
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        setParallaxOffset(scrollProgress * 50 - 25);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={ref}
      className={`min-h-screen flex items-center py-20 px-4 ${
        index % 2 === 0 ? 'bg-gradient-to-br from-white to-blue-50' : 'bg-gradient-to-br from-purple-50 to-pink-50'
      }`}
    >
      <div className="container mx-auto max-w-7xl">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}>
          {/* Content Side */}
          <div className={`${isEven ? '' : 'md:col-start-2'} ${inView ? 'scroll-slide-right in-view' : 'scroll-slide-right'}`}>
            {/* Step Number Badge */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`section-badge ${inView ? 'in-view' : ''} relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-2xl`}>
                <span className="text-3xl font-bold text-white relative z-10">{step.number}</span>
              </div>
              <Badge className="text-base px-4 py-2 bg-white border-2 border-purple-200">
                <step.icon className="w-5 h-5 mr-2 inline" />
                {step.duration}
              </Badge>
            </div>

            {/* Title */}
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {step.title}
            </h2>

            {/* Description */}
            <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
              {step.description}
            </p>

            {/* Features List with Stagger Animation */}
            <div className="space-y-4 mb-8">
              {step.features.map((feature: string, idx: number) => (
                <div
                  key={idx}
                  className={`stagger-item ${inView ? 'in-view' : ''} flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button (only on last step) */}
            {index === 2 && (
              <Button
                size="lg"
                onClick={() => window.location.href = '/brief'}
                className="text-xl px-12 py-7 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all"
              >
                <Rocket className="w-6 h-6 mr-2" />
                בואו נתחיל!
              </Button>
            )}
          </div>

          {/* Image Side with Parallax */}
          <div className={`${isEven ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'} ${inView ? 'scroll-zoom-in in-view' : 'scroll-zoom-in'}`}>
            <Card className="magazine-card overflow-hidden shadow-2xl border-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${
                    index === 0
                      ? '1552664730-d307ca884978' // Business meeting/team work
                      : index === 1
                      ? '1677442136019-21780ecad995' // AI/Technology/Neural network
                      : '1551288049-bebda4e6c651' // Analytics/Dashboard/Success
                  }?w=900&h=700&fit=crop&q=90`}
                  alt={step.title}
                  className="w-full h-full object-cover parallax-image"
                  style={{ '--parallax-offset': `${parallaxOffset}px` } as any}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-500/30"></div>
                
                {/* Floating Icon */}
                <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center shadow-xl animate-float">
                  <step.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Scroll Indicator */}
        {index < 2 && (
          <div className={`flex justify-center mt-16 ${inView ? 'scroll-fade-in in-view' : 'scroll-fade-in'}`}>
            <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
              <span className="text-sm">המשך לחלק הבא</span>
              <ChevronDown className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function HowItWorks() {
  const navigate = useNavigate();
  const progress = useScrollProgress();
  const { ref: heroRef, inView: heroInView } = useScrollAnimation({ threshold: 0.5 });

  const steps = [
    {
      number: 1,
      icon: FileText,
      title: 'ספר לנו על העסק שלך',
      description: 'שאלות קצרות ופשוטות - 2 דקות של שיחה וה-AI מבין בדיוק מה אתה צריך',
      duration: '2 דקות',
      features: [
        'פרטי העסק והמותג המדויקים',
        'קהל יעד וממקדקדת גיאוגרפית',
        'מטרות קמפיין ממוקדות תוצאות',
        'בחירת פלטפורמות מועדפות',
      ],
    },
    {
      number: 2,
      icon: Sparkles,
      title: 'בינה מלאכותית עובדת',
      description: 'טכנולוגיה מתקדמת של GPT-4 ו-DALL-E יוצרת קופי, תמונות ואסטרטגיה מלאה',
      duration: '3-5 דקות',
      features: [
        'כתיבת קופי ברמה מקצועית',
        'יצירת תמונות בעיצוב מותאם',
        'אופטימיזציה לכל פלטפורמה',
        'בניית אסטרטגיה מבוססת נתונים',
      ],
    },
    {
      number: 3,
      icon: Zap,
      title: 'קבל קמפיינים מוכנים',
      description: 'תוך דקות קבל +20 וריאציות של קמפיינים מוכנים לפרסום - העתק, הדבק, תעוף!',
      duration: 'מיידי',
      features: [
        'קופי מנצח לכל פלטפורמה',
        'תמונות מדהימות שנוצרו ב-AI',
        'המלצות תקציב חכמות',
        'העלאה ישירה לפייסבוק/גוגל',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${progress}%` }}
      />

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>

        <div className={`container mx-auto max-w-5xl px-4 text-center relative z-10 ${heroInView ? 'scroll-fade-in in-view' : 'scroll-fade-in'}`}>
          <Badge className="mb-8 text-xl px-8 py-4 bg-white/20 backdrop-blur-md border-white/30 text-white">
            <Sparkles className="w-5 h-5 mr-2 inline animate-pulse" />
            איך זה עובד
          </Badge>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 drop-shadow-2xl leading-tight">
            מקמפיין לתוצאות<br />
            ב-3 צעדים פשוטים
          </h1>

          <p className="text-2xl md:text-3xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            גלה איך AdSync הופך רעיונות לקמפיינים מנצחים תוך דקות
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-2xl px-14 py-8 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all"
            >
              <Rocket className="w-7 h-7 mr-3" />
              בואו ננסה!
            </Button>
            <Button
              size="lg"
              onClick={() => {
                document.querySelector('section:nth-of-type(2)')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xl px-12 py-8 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 font-semibold rounded-2xl"
            >
              גלול למטה לגלות
              <ChevronDown className="w-6 h-6 mr-3 animate-bounce" />
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <div className="w-8 h-12 border-2 border-white/50 rounded-full p-2">
              <div className="w-2 h-3 bg-white/70 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Sections */}
      {steps.map((step, index) => (
        <StepSection key={step.number} step={step} index={index} />
      ))}

      {/* Final CTA Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="scroll-fade-in in-view">
            <Rocket className="w-20 h-20 mx-auto mb-8 text-white drop-shadow-2xl animate-float" />
            <h2 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-xl">
              מוכנים להתחיל?
            </h2>
            <p className="text-2xl mb-12 text-white/95 leading-relaxed">
              הצטרף ל-10,000+ עסקים שכבר משתמשים ב-AdSync
              <br />
              ותראה תוצאות תוך דקות!
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="text-2xl px-16 py-8 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-2xl shadow-2xl hover:scale-110 transition-all"
            >
              <Sparkles className="w-7 h-7 mr-3" />
              יצירת קמפיין חינם
            </Button>
            <div className="mt-6 flex items-center justify-center gap-6 text-white/80">
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                ללא כרטיס אשראי
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                תוצאות מיידיות
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                100% בחינם
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
}
