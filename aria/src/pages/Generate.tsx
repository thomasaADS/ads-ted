import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { VariantCard } from "@/components/VariantCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { generateCampaign, publishToMeta, type AdVariant, type Platform } from "@/lib/api";
import { generateCampaignWithAI } from "@/lib/gemini";

export default function Generate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState<AdVariant[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');

  useEffect(() => {
    const briefData = sessionStorage.getItem("briefData");
    if (!briefData) {
      navigate("/");
      return;
    }

    generateVariants(JSON.parse(briefData));
  }, [navigate]);

  const generateVariants = async (briefData: any) => {
    try {
      setLoading(true);

      // Try to use Gemini AI first, fallback to mock if it fails
      let result;
      try {
        const aiResult = await generateCampaignWithAI({
          brandName: briefData.brandName || "העסק שלך",
          industry: briefData.industry,
          city: briefData.city,
          offer: briefData.offer,
          tone: briefData.tone || 'professional',
          platforms: briefData.platforms || ['meta', 'google'],
          objective: briefData.objective || 'TRAFFIC',
          language: 'he',
        });

        // Add platform and final URL to each variant
        const enhancedVariants = aiResult.variants.map((v: any) => ({
          ...v,
          final_url: briefData.website || briefData.whatsapp || '#',
          utm: {
            source: v.platform,
            medium: 'cpc',
            campaign: `${briefData.brandName}-${briefData.city}`.toLowerCase().replace(/\s+/g, '-'),
            content: `${v.platform}-ai-variant`,
          },
        }));

        setVariants(enhancedVariants);
        toast.success(`נוצרו ${enhancedVariants.length} וריאנטים עם AI`, {
          description: 'המודעות נוצרו על ידי Gemini AI',
        });
      } catch (aiError) {
        console.warn('AI generation failed, using fallback:', aiError);
        
        // Fallback to mock generation
        result = await generateCampaign({
          brand: {
            name: briefData.brandName || "העסק שלך",
            website: briefData.website,
            tone: briefData.tone,
            langs: briefData.languages || ['he'],
            whatsapp: briefData.whatsapp,
          },
          brief: {
            industry: briefData.industry,
            city: briefData.city,
            offer: briefData.offer,
            objective: briefData.objective,
            platforms: briefData.platforms,
          },
        });

        setVariants(result.variants || []);
        toast.success(`נוצרו ${result.variants?.length || 0} וריאנטים!`, {
          description: 'חבר Gemini API כדי לקבל תוכן מותאם אישית',
        });
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("יצירת הוריאנטים נכשלה. אנא נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (variant: AdVariant) => {
    const platformName = variant.platform.charAt(0).toUpperCase() + variant.platform.slice(1);
    const loadingToast = toast.loading(`מפרסם ל-${platformName}...`);
    
    try {
      const result = await publishToMeta(variant);
      toast.success(`המודעה נוצרה כטיוטה ב-${platformName}!`, { id: loadingToast });
      console.log("Publish result:", result);
    } catch (error) {
      console.error("Publish error:", error);
      toast.error("הפרסום נכשל. בדוק את הקונסול לפרטים נוספים.", { id: loadingToast });
    }
  };

  const filteredVariants = selectedPlatform === 'all' 
    ? variants 
    : variants.filter(v => v.platform === selectedPlatform);

  const variantsByPlatform = variants.reduce((acc, v) => {
    acc[v.platform] = (acc[v.platform] || 0) + 1;
    return acc;
  }, {} as Record<Platform, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
        <TopNav />
        <main className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <Sparkles className="w-16 h-16 text-primary opacity-20" />
              </div>
              <Wand2 className="w-16 h-16 text-primary animate-bounce relative z-10" />
            </div>
            <h2 className="text-3xl font-bold mt-8 mb-3 gradient-text">
              <Sparkles className="w-5 h-5 inline ml-1 animate-pulse" />
              הקסם קורה עכשיו...
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              Gemini AI יוצר עבורך קמפיינים מקצועיים וקריאטיביים
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground max-w-md text-center mt-4">
              <p className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                מנתח את פרטי העסק שלך...
              </p>
              <p className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                יוצר כותרות מושכות ותוכן מקצועי...
              </p>
              <p className="flex items-center gap-2 justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
                מתאים לפלטפורמות שונות...
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/brief")}
            className="mb-4 hover-lift"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            חזרה לשאלות
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl gradient-boosti-cta shadow-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold gradient-text">
                <CheckCircle className="w-6 h-6 inline ml-2" />
                הקמפיינים שלך מוכנים
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                {variants.length} וריאציות מודעות מקצועיות: {Object.entries(variantsByPlatform).map(([p, c]) => `${c} ${p}`).join(' · ')}
              </p>
            </div>
          </div>
        </div>

        {/* Platform Filters */}
        <Tabs value={selectedPlatform} onValueChange={(v) => setSelectedPlatform(v as Platform | 'all')} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">הכל ({variants.length})</TabsTrigger>
            {Object.entries(variantsByPlatform).map(([platform, count]) => (
              <TabsTrigger key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)} ({count})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Variants Grid */}
        {filteredVariants.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVariants.map((variant, idx) => (
              <VariantCard
                key={idx}
                variant={variant}
                onRegenerateHeadline={() => {
                  toast.info("תכונת יצירה מחדש בקרוב!");
                }}
                onPublish={() => handlePublish(variant)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              לא נוצרו וריאנטים. אנא נסה שוב.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
