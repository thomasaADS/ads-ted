import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { DollarSign, Eye, MousePointerClick, Users, TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';
import type { CampaignAnalytics, CampaignStatsDaily } from '@/lib/analytics';
import { fetchCampaignById, fetchCampaignDailyStats } from '@/lib/analytics';
import { MetricTimeseriesChart } from './MetricTimeseriesChart';
import { format } from 'date-fns';
import { he } from 'date-fns/locale/he';

interface CampaignDetailsDrawerProps {
  campaignId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dateRange?: { start: Date; end: Date };
}

export function CampaignDetailsDrawer({
  campaignId,
  open,
  onOpenChange,
  dateRange,
}: CampaignDetailsDrawerProps) {
  const [campaign, setCampaign] = useState<CampaignAnalytics | null>(null);
  const [dailyStats, setDailyStats] = useState<CampaignStatsDaily[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && campaignId) {
      loadCampaignDetails();
    } else {
      setCampaign(null);
      setDailyStats([]);
    }
  }, [open, campaignId, dateRange]);

  const loadCampaignDetails = async () => {
    if (!campaignId) return;

    setLoading(true);
    try {
      const [campaignData, statsData] = await Promise.all([
        fetchCampaignById(campaignId),
        fetchCampaignDailyStats(
          campaignId,
          dateRange || {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date(),
          }
        ),
      ]);

      setCampaign(campaignData);
      setDailyStats(statsData);
    } catch (error) {
      console.error('Error loading campaign details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      paused: 'secondary',
      completed: 'outline',
      deleted: 'destructive',
    };

    const labels: Record<string, string> = {
      active: 'פעיל',
      paused: 'מושהה',
      completed: 'הושלם',
      deleted: 'נמחק',
    };

    return (
      <Badge variant={variants[status] || 'secondary'}>
        {labels[status] || status}
      </Badge>
    );
  };

  const getPlatformLabel = (platform?: string) => {
    const labels: Record<string, string> = {
      facebook: 'פייסבוק',
      google: 'גוגל',
      tiktok: 'טיקטוק',
      linkedin: 'לינקדאין',
      taboola: 'טאבולה',
      outbrain: 'אאוטבריין',
    };
    return labels[platform || ''] || platform || 'אחר';
  };

  // Calculate metrics from daily stats
  const metrics = dailyStats.reduce(
    (acc, stat) => ({
      impressions: acc.impressions + stat.impressions,
      clicks: acc.clicks + stat.clicks,
      spend: acc.spend + stat.spend,
      leads: acc.leads + stat.leads,
      purchases: acc.purchases + (stat.purchases || 0),
      revenue: acc.revenue + (stat.revenue || 0),
    }),
    { impressions: 0, clicks: 0, spend: 0, leads: 0, purchases: 0, revenue: 0 }
  );

  const ctr = metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0;
  const cpc = metrics.clicks > 0 ? metrics.spend / metrics.clicks : 0;
  const cpl = metrics.leads > 0 ? metrics.spend / metrics.leads : 0;
  const roas = metrics.spend > 0 && metrics.revenue > 0 ? metrics.revenue / metrics.spend : 0;

  const kpiCards = [
    { label: 'סה"כ הוצאה', value: formatCurrency(metrics.spend), icon: DollarSign, color: 'text-blue-600' },
    { label: 'חשיפות', value: formatNumber(metrics.impressions), icon: Eye, color: 'text-purple-600' },
    { label: 'קליקים', value: formatNumber(metrics.clicks), icon: MousePointerClick, color: 'text-green-600' },
    { label: 'לידים', value: formatNumber(metrics.leads), icon: Users, color: 'text-orange-600' },
    { label: 'CPC', value: formatCurrency(cpc), icon: Target, color: 'text-red-600' },
    { label: 'CPL', value: formatCurrency(cpl), icon: Zap, color: 'text-yellow-600' },
    { label: 'CTR', value: ctr.toFixed(2) + '%', icon: TrendingUp, color: 'text-indigo-600' },
    { label: 'ROAS', value: roas.toFixed(2) + 'x', icon: BarChart3, color: 'text-pink-600' },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          {loading ? (
            <>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </>
          ) : campaign ? (
            <>
              <SheetTitle className="text-2xl">{campaign.name}</SheetTitle>
              <SheetDescription>
                <div className="flex items-center gap-4 mt-2">
                  {getStatusBadge(campaign.status)}
                  <span>{getPlatformLabel(campaign.platform)}</span>
                  {campaign.country && <span>• {campaign.country}</span>}
                </div>
                {campaign.start_date && campaign.end_date && (
                  <div className="mt-2 text-sm">
                    {format(new Date(campaign.start_date), 'dd/MM/yyyy', { locale: he })} -{' '}
                    {format(new Date(campaign.end_date), 'dd/MM/yyyy', { locale: he })}
                  </div>
                )}
              </SheetDescription>
            </>
          ) : null}
        </SheetHeader>

        {loading ? (
          <div className="mt-6 space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : campaign ? (
          <div className="mt-6 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kpiCards.map((kpi, index) => {
                const Icon = kpi.icon;
                return (
                  <Card key={index} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${kpi.color}`} />
                      <p className="text-xs text-muted-foreground">{kpi.label}</p>
                    </div>
                    <p className="text-lg font-bold">{kpi.value}</p>
                  </Card>
                );
              })}
            </div>

            {/* Daily Trend Chart */}
            <MetricTimeseriesChart
              data={dailyStats}
              title="ביצועים יומיים"
              loading={loading}
            />

            {/* Daily Stats Table */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">סטטיסטיקות יומיות</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-right p-2">תאריך</th>
                      <th className="text-right p-2">חשיפות</th>
                      <th className="text-right p-2">קליקים</th>
                      <th className="text-right p-2">הוצאה</th>
                      <th className="text-right p-2">לידים</th>
                      <th className="text-right p-2">CTR</th>
                      {dailyStats.some(s => s.revenue) && (
                        <th className="text-right p-2">הכנסה</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {dailyStats.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center p-4 text-muted-foreground">
                          אין נתונים
                        </td>
                      </tr>
                    ) : (
                      [...dailyStats].reverse().map((stat) => {
                        const dayCTR = stat.impressions > 0 
                          ? (stat.clicks / stat.impressions) * 100 
                          : 0;
                        return (
                          <tr key={stat.id} className="border-b">
                            <td className="p-2">
                              {format(new Date(stat.date), 'dd/MM/yyyy', { locale: he })}
                            </td>
                            <td className="p-2">{formatNumber(stat.impressions)}</td>
                            <td className="p-2">{formatNumber(stat.clicks)}</td>
                            <td className="p-2">{formatCurrency(stat.spend)}</td>
                            <td className="p-2">{formatNumber(stat.leads)}</td>
                            <td className="p-2">{dayCTR.toFixed(2)}%</td>
                            {dailyStats.some(s => s.revenue) && (
                              <td className="p-2">
                                {stat.revenue ? formatCurrency(stat.revenue) : '-'}
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

