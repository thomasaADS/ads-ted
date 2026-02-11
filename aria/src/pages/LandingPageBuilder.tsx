import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import LandingPageAgent from '@/components/LandingPageAgent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChatWidget } from '@/components/ChatWidget';
import { Wand2, Layout, Palette, Sparkles, ArrowRight, CheckCircle2, Eye, Image as ImageIcon, Target, Zap, Clock } from 'lucide-react';

interface PageData {
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;
  colorScheme?: string;
  style?: string;
  heroImage?: string;
  ctaText?: string;
}

export default function LandingPageBuilder() {
  const navigate = useNavigate();
  const [showAgent, setShowAgent] = useState(false);
  const [generatedPage, setGeneratedPage] = useState<PageData | null>(null);

  const handleAgentComplete = (data: PageData) => {
    setGeneratedPage(data);
    setShowAgent(false);
  };

  if (showAgent) {
    return <LandingPageAgent onComplete={handleAgentComplete} />;
  }

  if (generatedPage) {
    // Preview the generated landing page
    return (
      <div className="min-h-screen">
        <Navbar />
        
        {/* Generated Landing Page Preview */}
        <div className="pt-20">
          {/* Hero Section */}
          <section 
            className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
            style={{
              background: generatedPage.colorScheme === 'כחול וסגול' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : generatedPage.colorScheme === 'ירוק וכחול'
                ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                : generatedPage.colorScheme === 'כתום וורוד'
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : generatedPage.colorScheme === 'שחור וזהב'
                ? 'linear-gradient(135deg, #000000 0%, #b8860b 100%)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            }}
          >
            {generatedPage.heroImage && (
              <div className="absolute inset-0">
                <img 
                  src={generatedPage.heroImage} 
                  alt="Hero" 
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
              </div>
            )}
            
            <div className="relative z-10 text-center text-white px-6 max-w-5xl">
              <Badge className="mb-6 text-lg px-6 py-2 bg-white/20 backdrop-blur-md border-white/30">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                {generatedPage.industry}
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
                {generatedPage.businessName}
              </h1>
              
              <p className="text-2xl mb-8 drop-shadow-lg">
                הפתרון המושלם ל{generatedPage.targetAudience}
              </p>
              
              <Button 
                size="lg"
                className="text-xl px-12 py-7 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-full shadow-2xl"
              >
                {generatedPage.mainGoal} <ArrowRight className="mr-2 w-6 h-6" />
              </Button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-5xl font-bold text-center mb-16">למה לבחור בנו?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Zap, title: 'מהיר ויעיל', desc: 'תוצאות מיידיות שחוסכות לך זמן' },
                  { icon: Target, title: 'מדויק ומקצועי', desc: 'פתרונות מותאמים אישית לצרכים שלך' },
                  { icon: '💪', title: 'אמין ובטוח', desc: 'השירות הכי מהימן בשוק' }
                ].map((feature, idx) => (
                  <Card key={idx} className="p-8 text-center hover:shadow-xl transition-shadow">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-lg">{feature.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6">מוכנים להתחיל?</h2>
              <p className="text-2xl mb-10">הצטרפו אלינו עוד היום וגלו את ההבדל!</p>
              
              <Button 
                size="lg"
                className="text-xl px-12 py-7 bg-white text-purple-600 hover:bg-gray-100 font-bold rounded-full shadow-2xl"
              >
                {generatedPage.mainGoal} עכשיו! <Sparkles className="mr-2 w-6 h-6" />
              </Button>
            </div>
          </section>

          {/* Edit Controls */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-2xl px-8 py-4 flex gap-4 z-50">
            <Button onClick={() => setShowAgent(true)} variant="outline">
              ערוך את הדף
            </Button>
            <Button onClick={() => setGeneratedPage(null)} variant="outline">
              צור דף חדש
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              פרסם את הדף
            </Button>
          </div>
        </div>
        
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-lg px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Wand2 className="w-5 h-5 mr-2 inline" />
              חדש! AI Image Generator
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              בונה דפי נחיתה AI
            </h1>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              צור דף נחיתה מקצועי בדקות עם סוכן AI חכם
              <br />
              <span className="text-xl text-purple-600 font-semibold">+ יצירת תמונות מדהימות בבינה מלאכותית!</span>
            </p>
          </div>

          <Card className="p-10 mb-8 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl hover:scale-105 transition-transform">
                <Wand2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold mb-3">סוכן AI חכם</h3>
                <p className="text-gray-600 text-lg">AI שואל שאלות ויוצר את הדף המושלם</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:scale-105 transition-transform">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-3">AI Image Generator</h3>
                <p className="text-gray-600 text-lg">יצירת תמונות ייחודיות עם Stable Diffusion</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl hover:scale-105 transition-transform">
                <Palette className="w-16 h-16 mx-auto mb-4 text-cyan-600" />
                <h3 className="text-2xl font-bold mb-3">התאמה מלאה</h3>
                <p className="text-gray-600 text-lg">כל פרט מותאם לעסק שלך</p>
              </div>
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setShowAgent(true)}
                className="text-2xl px-16 py-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-2xl hover:shadow-glow-colored hover:scale-105 transition-all"
              >
                <Sparkles className="w-7 h-7 mr-3 animate-pulse" />
                יאללה, בואו ניצור דף נחיתה!
              </Button>
              <p className="text-gray-500 mt-4 text-lg flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                לוקח בערך 2-3 דקות
              </p>
            </div>
          </Card>

          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: ImageIcon, title: 'יצירת תמונות AI', desc: 'תאר מה שאתה רוצה והAI יצור תמונה מושלמת', color: 'text-blue-600' },
              { icon: Target, title: 'ממוקד בתוצאות', desc: 'כל דף מותאם להשגת המטרה שלך', color: 'text-purple-600' },
              { icon: Layout, title: 'רספונסיבי לחלוטין', desc: 'נראה מעולה בכל מכשיר', color: 'text-green-600' },
              { icon: Zap, title: 'מהיר וקל', desc: 'מענה לשאלות פשוטות ודף מוכן תוך דקות', color: 'text-orange-600' }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color.split('-')[1]}-50 to-${feature.color.split('-')[1]}-100 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
      <ChatWidget />
    </div>
  );
}
