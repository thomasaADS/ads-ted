import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { AnimatedParticles } from '@/components/AnimatedParticles';
import { FloatingShapes } from '@/components/FloatingShapes';
import { ChatWidget } from '@/components/ChatWidget';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  MessageSquare,
  Layout,
  Wand2,
} from 'lucide-react';

const HomeAlt = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stats = [
    { value: '10K+', label: 'קמפיינים פעילים', icon: Zap },
    { value: '5M$', label: 'תקציב מנוהל', icon: TrendingUp },
    { value: '250%', label: 'ROI ממוצע', icon: Target },
    { value: '4 דקות', label: 'זמן יצירה', icon: Clock },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'יצירה חכמה',
      description: 'בינה מלאכותית מתקדמת שיוצרת תוכן ממוטב לכל פלטפורמה',
    },
    {
      icon: Target,
      title: 'מיקוד מדויק',
      description: 'הגדרות קהל יעד חכמות שמביאות את הלקוחות הנכונים',
    },
    {
      icon: Globe,
      title: 'כל הפלטפורמות',
      description: 'כיסוי מלא של Meta, Google, TikTok, LinkedIn ועוד',
    },
    {
      icon: BarChart3,
      title: 'מעקב בזמן אמת',
      description: 'דשבורד מתקדם עם תובנות ישימות לשיפור מתמיד',
    },
  ];

  const testimonials = [
    {
      name: 'דנה לוי',
      role: 'מנכ"ל',
      company: 'StartHub',
      text: 'חסכנו 80% מהזמן ביצירת קמפיינים והתוצאות השתפרו פי 3',
      rating: 5,
    },
    {
      name: 'רון כהן',
      role: 'מנהל שיווק',
      company: 'TechFlow',
      text: 'הפלטפורמה הכי אינטואיטיבית שעבדתי איתה. תוצאות מיידיות!',
      rating: 5,
    },
    {
      name: 'מיכל אברהם',
      role: 'מייסדת',
      company: 'EcoStyle',
      text: 'השקנו 12 קמפיינים ב-5 דקות. פשוט מהפכני!',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'סטרטר',
      price: '$99',
      period: 'לחודש',
      features: [
        '5 קמפיינים בחודש',
        '3 פלטפורמות',
        'תמיכה בסיסית',
        'אנליטיקס בסיסי',
      ],
    },
    {
      name: 'פרו',
      price: '$299',
      period: 'לחודש',
      features: [
        'קמפיינים ללא הגבלה',
        'כל הפלטפורמות',
        'תמיכה 24/7',
        'אנליטיקס מתקדם',
        'A/B Testing',
      ],
      popular: true,
    },
    {
      name: 'אנטרפרייז',
      price: 'מותאם',
      period: 'מחיר אישי',
      features: [
        'הכל מ-Pro',
        'מנהל חשבון ייעודי',
        'API מלא',
        'הכשרות צוות',
        'SLA מובטח',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background Elements */}
      <AnimatedParticles />
      <FloatingShapes />
      
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />

      {/* Hero Section - Like Original with Stars */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb]">
        {/* Animated Stars Background */}
        <div className="absolute inset-0 opacity-60">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>
        
        {/* Animated gradient orbs for depth */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center space-y-8">
            {/* Top Badge */}
            <div className="inline-block animate-bounce-in">
              <Badge 
                className="text-[17px] font-medium px-7 py-3 border-2 hover:scale-105 transition-transform cursor-default" 
                style={{ 
                  color: '#00C4B4',
                  borderColor: '#00C4B4',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                השדרוג שהשיווק שלך חיכה לו
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-[64px] font-bold leading-[1.15] animate-fade-in text-white drop-shadow-2xl">
              מוכן לראות מה זה שיווק
              <br />
              שעובד באמת?
            </h1>

            {/* Subheading */}
            <p className="text-2xl leading-[1.6] mx-auto max-w-4xl animate-slide-up text-white/95 drop-shadow-lg flex items-center justify-center gap-3" style={{ animationDelay: '0.2s' }}>
              <Zap className="w-7 h-7" />
              AI חכם שמביא את המספרים הנכונים, בזמן הנכון, לקהל הנכון.
            </p>

            {/* Second Subheading */}
            <p className="text-xl leading-[1.6] mx-auto max-w-3xl text-white/90 font-medium">
              תן ל-<span className="font-bold text-cyan-300">AdSync</span> להרים את הביצועים שלך —
              <br />
              ותראה איך השיווק שלך סוף סוף עובד בשבילך, לא להפך.
            </p>

            {/* Value Props */}
            <div className="flex flex-wrap gap-4 justify-center pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Badge 
                className="text-sm px-5 py-2.5 font-medium border-0 inline-flex items-center gap-2"
                style={{
                  background: 'rgba(0, 196, 180, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white'
                }}
              >
                <BarChart3 className="w-4 h-4" />
                כל הפלטפורמות
              </Badge>
              <Badge 
                className="text-sm px-5 py-2.5 font-medium border-0 inline-flex items-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white'
                }}
              >
                <Target className="w-4 h-4" />
                קריאטיבים מותאמים אישית
              </Badge>
              <Badge 
                className="text-sm px-5 py-2.5 font-medium border-0 inline-flex items-center gap-2"
                style={{
                  background: 'rgba(122, 62, 250, 0.2)',
                  backdropFilter: 'blur(10px)',
                  color: 'white'
                }}
              >
                <Zap className="w-4 h-4" />
                תוצאות תוך 3 דקות
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8 animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-xl px-14 py-8 rounded-[20px] font-bold border-0 hover:opacity-95 transition-all hover:scale-105 shadow-2xl group relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #00C4B4 0%, #7A3EFA 100%)',
                  color: 'white'
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  יצור קמפיין עכשיו
                </span>
              </Button>
              <Button
                size="lg"
                onClick={() => navigate('/how-it-works')}
                className="text-lg px-12 py-8 rounded-[20px] font-semibold border-2 hover:scale-105 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white'
                }}
              >
                <Target className="w-5 h-5" />
                איך זה עובד?
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Builder CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 bg-card/90 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all hover-lift">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-right">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Layout className="w-8 h-8" />
                  אין לך אתר? בנה דף נחיתה תוך 5 דקות
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  סוכן AI חכם שיוצר דפי נחיתה מקצועיים + תמונות ייחודיות עם AI!
                </p>
                <Button
                  size="lg"
                  onClick={() => navigate('/landing-page-builder')}
                  className="gradient-boosti-cta text-white hover:scale-105 transition-transform shadow-lg text-lg px-8 py-6 group"
                >
                  <Wand2 className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                  בנה דף נחיתה עם AI
                </Button>
              </div>
              <div className="w-48 h-48 rounded-2xl gradient-boosti-hero flex items-center justify-center shadow-2xl">
                <Layout className="w-24 h-24 text-white opacity-50" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section - Grid Layout */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">למה אדסינק?</h2>
            <p className="text-xl text-muted-foreground">
              כל מה שצריך כדי להצליח בשיווק דיגיטלי
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials - Carousel Style */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <Users className="w-3 h-3 mr-1" />
              מה הלקוחות שלנו אומרים
            </Badge>
            <h2 className="text-4xl font-bold">סיפורי הצלחה</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">תמחור פשוט ושקוף</h2>
            <p className="text-xl text-muted-foreground">
              בחר את התוכנית המתאימה לך
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 ${
                  plan.popular
                    ? 'border-primary border-2 shadow-lg scale-105'
                    : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="mb-4">הכי פופולרי</Badge>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground"> {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/brief')}
                >
                  התחל עכשיו
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <MessageSquare className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              צור את הקמפיין הראשון שלך בפחות מדקה. ללא כרטיס אשראי.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/brief')}
                className="text-lg px-8"
              >
                יצירת קמפיין חינם
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <ChatWidget />
      </div>
    </div>
  );
};

export default HomeAlt;
