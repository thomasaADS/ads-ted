import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Eye, MousePointerClick, DollarSign, Plus, FileText, Sparkles, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ChatWidget } from "@/components/ChatWidget";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface Campaign {
  id: string;
  brand_name: string;
  platforms: string[];
  objective: string;
  budget: number;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "קמפיינים שנוצרו",
      value: campaigns.length.toString(),
      change: "+100%",
      icon: FileText,
      color: "text-accent",
    },
    {
      label: "פלטפורמות בשימוש",
      value: new Set(campaigns.flatMap(c => c.platforms || [])).size.toString(),
      change: "+20%",
      icon: MousePointerClick,
      color: "text-success",
    },
    {
      label: "תקציב כולל",
      value: `$${campaigns.reduce((sum, c) => sum + (c.budget || 0), 0).toLocaleString()}`,
      change: "+15%",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "מטרות שונות",
      value: new Set(campaigns.map(c => c.objective)).size.toString(),
      change: "+10%",
      icon: TrendingUp,
      color: "text-muted-foreground",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between animate-fade-in">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl gradient-boosti-cta">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-bold gradient-text">
                לוח הבקרה שלך
              </h1>
            </div>
            <p className="text-muted-foreground text-lg mt-2">
              כל הקמפיינים שלך במקום אחד - ניהול, ניטור והמשך יצירה
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => navigate('/analytics')} 
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-transform shadow-lg px-6 py-6 text-lg"
            >
              <BarChart3 className="w-5 h-5 ml-2" />
              אנליטיקס
            </Button>
            <Button 
              onClick={() => navigate('/brief')} 
              size="lg"
              className="gradient-boosti-cta text-white hover:scale-105 transition-transform shadow-lg px-6 py-6 text-lg"
            >
              <Plus className="w-5 h-5 ml-2" />
              צור קמפיין חדש
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label} 
                className="p-6 hover-lift animate-fade-in bg-card/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} bg-gradient-to-br shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge 
                    variant={stat.change.startsWith("+") ? "default" : "secondary"}
                    className="text-sm px-3 py-1"
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {stat.value}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Campaigns */}
        <Card className="bg-card/80 backdrop-blur-sm border-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">הקמפיינים שלי</h2>
            </div>
            
            {campaigns.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-b from-muted/30 to-transparent rounded-2xl">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 animate-ping">
                    <FileText className="w-20 h-20 text-primary opacity-20" />
                  </div>
                  <FileText className="w-20 h-20 text-primary relative" />
                </div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  הגיע הזמן להתחיל
                </h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  עוד לא יצרת קמפיינים. הסוכן החכם שלנו מחכה לעזור לך ליצור את הקמפיין המושלם הראשון שלך
                </p>
                <Button 
                  onClick={() => navigate('/brief')}
                  size="lg"
                  className="gradient-boosti-cta text-white hover:scale-105 transition-transform shadow-lg px-8 py-6 text-lg"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  בואו ניצור קמפיין ביחד!
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <Card
                    key={campaign.id}
                    className="p-6 bg-gradient-to-r from-card to-muted/20 hover:from-primary/5 hover:to-accent/5 transition-all cursor-pointer border-2 hover:border-primary/30 hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate('/generate', { state: { campaign } })}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg gradient-boosti-hero">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold">{campaign.brand_name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(campaign.platforms || []).map((platform) => (
                            <Badge 
                              key={platform} 
                              variant="secondary"
                              className="text-sm px-3 py-1"
                            >
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${campaign.budget}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {campaign.objective}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {new Date(campaign.created_at).toLocaleDateString('he-IL')}
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="default"
                        className="gradient-primary hover:scale-105 transition-transform"
                      >
                        <Eye className="w-4 h-4 ml-2" />
                        צפה בקמפיין
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Card>
      </main>
      
      <ChatWidget />
    </div>
  );
}
