import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { useNavigate } from 'react-router-dom';
import { ChatWidget } from '@/components/ChatWidget';
import {
  Target,
  Heart,
  Users,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Award,
  Globe,
  Shield,
  Rocket,
  BookOpen,
  BarChart3,
} from 'lucide-react';

export default function About() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const values = [
    {
      icon: Lightbulb,
      title: 'חדשנות',
      description: 'אנחנו תמיד מחפשים דרכים חדשות ויצירתיות לפתור בעיות שיווק',
      color: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      icon: Heart,
      title: 'מחויבות ללקוח',
      description: 'ההצלחה שלך היא ההצלחה שלנו - אנחנו כאן בשבילך',
      color: 'from-pink-500/20 to-red-500/20',
    },
    {
      icon: Target,
      title: 'תוצאות',
      description: 'אנחנו מתמקדים במה שחשוב - להביא לך לקוחות ומכירות',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Zap,
      title: 'מהירות',
      description: 'זמן זה כסף - ליצור קמפיינים תוך דקות במקום שעות',
      color: 'from-purple-500/20 to-pink-500/20',
    },
  ];

  const milestones = [
    { year: '2024', title: 'ייסוד החברה', desc: 'החלום התחיל - ליצור פלטפורמת AI לשיווק' },
    { year: '2024', title: 'השקת Beta', desc: 'משתמשים ראשונים והצלחות מדהימות' },
    { year: '2025', title: 'התרחבות גלובלית', desc: 'כבר משרתים אלפי עסקים בכל העולם' },
    { year: '2025', title: 'חדשנות AI', desc: 'הוספת מחוללי תמונות ודפי נחיתה' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Star Background - same as home */}
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      <div className="stars-layer-3"></div>

      <Navbar />

      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-2xl mb-6 animate-float">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            מי אנחנו?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold text-2xl text-primary">AdSync</span> היא פלטפורמת AI מתקדמת שמהפכת את עולם השיווק הדיגיטלי
          </p>
        </div>

        {/* Story Section */}
        <Card className="p-10 mb-16 bg-gradient-to-br from-purple-50/50 to-blue-50/50 border-2 border-primary/20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 gradient-text flex items-center gap-3">
              <BookOpen className="w-10 h-10" />
              הסיפור שלנו
            </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                כשהקמנו את <span className="font-bold text-primary">AdSync</span> ב-2024, היה לנו חזון ברור: 
                <span className="font-bold"> להפוך שיווק מורכב לפשוט וזמין לכולם.</span>
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                ראינו איך עסקים קטנים ובינוניים מתקשים ליצור קמפיינים איכותיים, 
                משקיעים שעות על עיצוב ותוכן, ולא תמיד מקבלים את התוצאות שהם רוצים.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="font-bold text-primary">החלטנו לשנות את זה!</span> 
                {' '}עם טכנולוגיית AI מתקדמת, פיתחנו פלטפורמה שיוצרת קמפיינים מנצחים תוך דקות.
              </p>
              <div className="flex gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">קמפיינים נוצרו</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">1,000+</div>
                  <div className="text-sm text-muted-foreground">עסקים מרוצים</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-primary">250%</div>
                  <div className="text-sm text-muted-foreground">ROI ממוצע</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop"
                alt="Our Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white p-6 rounded-2xl shadow-2xl">
                <Award className="w-8 h-8 mb-2" />
                <div className="font-bold text-xl">דירוג 4.9/5</div>
                <div className="text-sm">מ-500+ ביקורות</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
            <Globe className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-3xl font-bold mb-4">החזון שלנו</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              להפוך את AdSync לפלטפורמת השיווק המובילה בעולם, 
              שבה כל עסק - קטן כגדול - יכול ליצור קמפיינים מקצועיים ומנצחים בקלות ובמהירות.
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
            <Shield className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-3xl font-bold mb-4">המשימה שלנו</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              לספק לעסקים כלי AI חכמים ומתקדמים שמאפשרים להם להתמקד במה שהם עושים הכי טוב - 
              להוביל את העסק שלהם - בזמן שאנחנו דואגים לשיווק.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            הערכים שמנחים אותנו
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-6 text-center hover:shadow-xl transition-all bg-card/80 backdrop-blur-sm hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} mb-4`}>
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text flex items-center justify-center gap-3">
            <TrendingUp className="w-10 h-10" />
            המסע שלנו
          </h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  {idx !== milestones.length - 1 && (
                    <div className="w-1 flex-1 bg-gradient-to-b from-purple-600 to-blue-600 my-2"></div>
                  )}
                </div>
                <Card className="flex-1 p-6 mb-4">
                  <div className="text-sm font-bold text-primary mb-2">{milestone.year}</div>
                  <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text flex items-center justify-center gap-3">
            <BarChart3 className="w-10 h-10" />
            המספרים מדברים בעד עצמם
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">250%</div>
              <p className="text-muted-foreground">ROI ממוצע</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">+$5M</div>
              <p className="text-muted-foreground">תקציב שוחל</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">+1,000</div>
              <p className="text-muted-foreground">עסקים מרוצים</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">10,000+</div>
              <p className="text-muted-foreground">קמפיינים שנוצרו</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card className="p-12 text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-primary/20">
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            רוצים להצטרף למהפכה?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            צור את הקמפיין הראשון שלך עכשיו וגלה איך AdSync משנה את חוקי המשחק
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate('/brief')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl transition-all gap-2 text-lg px-8 py-6"
            >
              <Sparkles className="h-5 w-5" />
              צור קמפיין חינם
            </Button>
            <Button
              size="lg"
              onClick={() => navigate('/pricing')}
              variant="outline"
              className="gap-2 text-lg px-8 py-6"
            >
              ראה את החבילות
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
