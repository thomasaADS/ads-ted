import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatWidget } from "@/components/ChatWidget";
import { 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  Filter,
  Search,
  ArrowUpDown,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Campaign {
  id: string;
  name: string;
  brand: string;
  status: 'active' | 'draft' | 'completed' | 'paused';
  budget: string;
  spent: string;
  impressions: number;
  clicks: number;
  conversions: number;
  platform: string[];
  createdAt: Date;
  objective: string;
}

export default function MyCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'draft' | 'completed' | 'paused'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with real data from Supabase later
  useEffect(() => {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'קמפיין קיץ 2025',
        brand: 'העסק שלי',
        status: 'active',
        budget: '5000₪',
        spent: '2340₪',
        impressions: 45000,
        clicks: 1200,
        conversions: 85,
        platform: ['Facebook', 'Google'],
        createdAt: new Date('2025-01-15'),
        objective: 'הגעה ללקוחות חדשים',
      },
      {
        id: '2',
        name: 'מבצע מיוחד',
        brand: 'שרברבות תל אביב',
        status: 'draft',
        budget: '3000₪',
        spent: '0₪',
        impressions: 0,
        clicks: 0,
        conversions: 0,
        platform: ['Meta'],
        createdAt: new Date('2025-01-20'),
        objective: 'מכירות',
      },
    ];
    setCampaigns(mockCampaigns);
  }, []);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Campaign['status']) => {
    const variants = {
      active: 'default',
      draft: 'secondary',
      completed: 'outline',
      paused: 'destructive',
    };
    const labels = {
      active: 'פעיל',
      draft: 'טיוטה',
      completed: 'הושלם',
      paused: 'מושהה',
    };
    return <Badge variant={variants[status] as any}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Star background */}
      <div className="stars-layer-1"></div>
      <div className="stars-layer-2"></div>
      <div className="stars-layer-3"></div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            הקמפיינים שלי
          </h1>
          <p className="text-muted-foreground text-lg">
            נהל את כל הקמפיינים שלך במקום אחד
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="חפש קמפיין..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {(['all', 'active', 'draft', 'completed', 'paused'] as const).map((f) => (
              <Button
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? 'הכל' : f === 'active' ? 'פעיל' : f === 'draft' ? 'טיוטה' : f === 'completed' ? 'הושלם' : 'מושהה'}
              </Button>
            ))}
          </div>

          <Button onClick={() => navigate('/brief')} className="gap-2">
            <Plus className="h-4 w-4" />
            קמפיין חדש
          </Button>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mb-4">
              <BarChart3 className="w-16 h-16 mx-auto text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">אין קמפיינים עדיין</h3>
            <p className="text-muted-foreground mb-6">
              התחל ליצור את הקמפיין הראשון שלך עכשיו!
            </p>
            <Button onClick={() => navigate('/brief')} size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              צור קמפיין ראשון
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                  </div>
                  {getStatusBadge(campaign.status)}
                </div>

                {/* Platforms */}
                <div className="flex gap-2 mb-4">
                  {campaign.platform.map((p) => (
                    <Badge key={p} variant="outline">{p}</Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-border">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {campaign.impressions.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">חשיפות</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {campaign.clicks.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">קליקים</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {campaign.conversions}
                    </div>
                    <div className="text-xs text-muted-foreground">המרות</div>
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">תקציב: {campaign.budget}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    נוצל: {campaign.spent}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Eye className="h-4 w-4" />
                    צפה
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Edit className="h-4 w-4" />
                    ערוך
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}

