import { useState, useEffect, useMemo } from 'react';
import { TopNav } from '@/components/TopNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, RefreshCw } from 'lucide-react';
import { DashboardSummaryCards } from '@/components/analytics/DashboardSummaryCards';
import { CampaignFilters } from '@/components/analytics/CampaignFilters';
import { CampaignsTable } from '@/components/analytics/CampaignsTable';
import { CampaignDetailsDrawer } from '@/components/analytics/CampaignDetailsDrawer';
import { MetricTimeseriesChart } from '@/components/analytics/MetricTimeseriesChart';
import { Skeleton } from '@/components/ui/skeleton';
import {
  fetchCampaignsWithMetrics,
  calculateAggregatedKPIs,
  fetchDailyStatsForCampaigns,
  seedDemoData,
  type AnalyticsFilters,
  type CampaignMetrics,
  type AdPlatform,
} from '@/lib/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ChatWidget } from '@/components/ChatWidget';

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<CampaignMetrics[]>([]);
  const [kpis, setKpis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<AnalyticsFilters>({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
  });

  // Get available platforms and countries from campaigns
  const availablePlatforms = useMemo(() => {
    const platforms = new Set<AdPlatform>();
    campaigns.forEach((c) => {
      if (c.platform) platforms.add(c.platform);
    });
    return Array.from(platforms);
  }, [campaigns]);

  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    campaigns.forEach((c) => {
      if (c.country) countries.add(c.country);
    });
    return Array.from(countries);
  }, [campaigns]);

  // Load data
  useEffect(() => {
    // Allow loading even without user for demo purposes
    loadData();
  }, [filters]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [campaignsData, kpisData] = await Promise.all([
        fetchCampaignsWithMetrics(filters),
        calculateAggregatedKPIs(filters),
      ]);

      setCampaigns(campaignsData);
      setKpis(kpisData);
    } catch (error) {
      console.error('Error loading analytics data:', error);
      toast.error('שגיאה בטעינת נתונים');
    } finally {
      setLoading(false);
    }
  };

  const handleCampaignClick = (campaign: CampaignMetrics) => {
    setSelectedCampaignId(campaign.id);
    setDrawerOpen(true);
  };

  const handleSeedData = async () => {
    try {
      await seedDemoData();
      toast.success('נתוני דמו נוצרו בהצלחה!');
      await loadData();
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error('שגיאה ביצירת נתוני דמו');
    }
  };

  // Get aggregated daily stats for all campaigns (for main chart)
  const [aggregatedDailyStats, setAggregatedDailyStats] = useState<any[]>([]);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    if (campaigns.length > 0 && filters.dateRange) {
      loadAggregatedStats();
    }
  }, [campaigns, filters.dateRange]);

  const loadAggregatedStats = async () => {
    if (!filters.dateRange) return;

    setChartLoading(true);
    try {
      const campaignIds = campaigns.map((c) => c.id);
      const dailyStats = await fetchDailyStatsForCampaigns(campaignIds, filters.dateRange);

      // Aggregate by date
      const aggregated = dailyStats.reduce((acc, stat) => {
        const date = stat.date;
        const existing = acc.find((a) => a.date === date);

        if (existing) {
          existing.impressions += stat.impressions;
          existing.clicks += stat.clicks;
          existing.spend += stat.spend;
          existing.leads += stat.leads;
          existing.revenue = (existing.revenue || 0) + (stat.revenue || 0);
        } else {
          acc.push({
            date,
            impressions: stat.impressions,
            clicks: stat.clicks,
            spend: stat.spend,
            leads: stat.leads,
            revenue: stat.revenue || 0,
          });
        }

        return acc;
      }, [] as any[]);

      setAggregatedDailyStats(aggregated.sort((a, b) => a.date.localeCompare(b.date)));
    } catch (error) {
      console.error('Error loading aggregated stats:', error);
    } finally {
      setChartLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <TopNav />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                לוח בקרה אנליטי
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              ניתוח ביצועים מקיף לכל הקמפיינים שלך
            </p>
          </div>
          {campaigns.length === 0 && (
            <Button onClick={handleSeedData} variant="outline">
              <RefreshCw className="w-4 h-4 ml-2" />
              צור נתוני דמו
            </Button>
          )}
        </div>

        {/* Filters */}
        <CampaignFilters
          filters={filters}
          onFiltersChange={setFilters}
          availablePlatforms={availablePlatforms}
          availableCountries={availableCountries}
        />

        {/* KPI Cards */}
        <div className="mb-8">
          <DashboardSummaryCards kpis={kpis} loading={loading} />
        </div>

        {/* Main Chart */}
        <div className="mb-8">
          {chartLoading ? (
            <Card className="p-6">
              <Skeleton className="h-8 w-48 mb-4" />
              <Skeleton className="h-[400px] w-full" />
            </Card>
          ) : (
            <MetricTimeseriesChart
              data={aggregatedDailyStats.map((s) => ({
                id: s.date,
                campaign_id: '',
                date: s.date,
                impressions: s.impressions,
                clicks: s.clicks,
                spend: s.spend,
                leads: s.leads,
                revenue: s.revenue,
                created_at: '',
                updated_at: '',
              }))}
              title="ביצועים כוללים - כל הקמפיינים"
              loading={chartLoading}
            />
          )}
        </div>

        {/* Campaigns Table */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">קמפיינים</h2>
          <CampaignsTable
            campaigns={campaigns}
            loading={loading}
            onCampaignClick={handleCampaignClick}
          />
        </Card>

        {/* Campaign Details Drawer */}
        <CampaignDetailsDrawer
          campaignId={selectedCampaignId}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          dateRange={filters.dateRange}
        />
      </main>

      <ChatWidget />
    </div>
  );
}

