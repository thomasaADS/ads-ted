import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import type { CampaignStatsDaily } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/skeleton';

interface MetricTimeseriesChartProps {
  data: CampaignStatsDaily[];
  loading?: boolean;
  title?: string;
}

type ChartType = 'line' | 'bar';
type MetricType = 'spend' | 'impressions' | 'clicks' | 'leads' | 'revenue';

export function MetricTimeseriesChart({
  data,
  loading = false,
  title = 'ביצועים לאורך זמן',
}: MetricTimeseriesChartProps) {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [primaryMetric, setPrimaryMetric] = useState<MetricType>('spend');
  const [secondaryMetric, setSecondaryMetric] = useState<MetricType | 'none'>('leads');

  // Transform data for chart
  const chartData = data.map((stat) => ({
    date: new Date(stat.date).toLocaleDateString('he-IL', { month: 'short', day: 'numeric' }),
    fullDate: stat.date,
    spend: Number(stat.spend),
    impressions: stat.impressions,
    clicks: stat.clicks,
    leads: stat.leads,
    revenue: stat.revenue || 0,
  }));

  const formatValue = (value: number, metric: MetricType) => {
    if (metric === 'spend' || metric === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    if (metric === 'impressions' || metric === 'clicks' || metric === 'leads') {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
      }
      if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return value.toString();
    }
    return value.toString();
  };

  const getMetricLabel = (metric: MetricType) => {
    const labels: Record<MetricType, string> = {
      spend: 'הוצאה',
      impressions: 'חשיפות',
      clicks: 'קליקים',
      leads: 'לידים',
      revenue: 'הכנסה',
    };
    return labels[metric];
  };

  const getMetricColor = (metric: MetricType) => {
    const colors: Record<MetricType, string> = {
      spend: '#3b82f6',
      impressions: '#8b5cf6',
      clicks: '#10b981',
      leads: '#f59e0b',
      revenue: '#ef4444',
    };
    return colors[metric];
  };

  if (loading) {
    return (
      <Card className="p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-[400px] w-full" />
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-center py-12 text-muted-foreground">
          <p>אין נתונים להצגה</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex gap-2 flex-wrap">
          <Select value={chartType} onValueChange={(value) => setChartType(value as ChartType)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">קו</SelectItem>
              <SelectItem value="bar">עמודות</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={primaryMetric}
            onValueChange={(value) => setPrimaryMetric(value as MetricType)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spend">הוצאה</SelectItem>
              <SelectItem value="impressions">חשיפות</SelectItem>
              <SelectItem value="clicks">קליקים</SelectItem>
              <SelectItem value="leads">לידים</SelectItem>
              <SelectItem value="revenue">הכנסה</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={secondaryMetric}
            onValueChange={(value) => setSecondaryMetric(value as MetricType | 'none')}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">ללא</SelectItem>
              <SelectItem value="spend">הוצאה</SelectItem>
              <SelectItem value="impressions">חשיפות</SelectItem>
              <SelectItem value="clicks">קליקים</SelectItem>
              <SelectItem value="leads">לידים</SelectItem>
              <SelectItem value="revenue">הכנסה</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            {secondaryMetric !== 'none' && <YAxis yAxisId="right" orientation="right" />}
            <Tooltip
              formatter={(value: number, name: string) => [
                formatValue(value, name as MetricType),
                getMetricLabel(name as MetricType),
              ]}
            />
            <Legend
              formatter={(value) => getMetricLabel(value as MetricType)}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={primaryMetric}
              stroke={getMetricColor(primaryMetric)}
              strokeWidth={2}
              name={primaryMetric}
            />
            {secondaryMetric !== 'none' && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey={secondaryMetric}
                stroke={getMetricColor(secondaryMetric)}
                strokeWidth={2}
                name={secondaryMetric}
              />
            )}
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatValue(value, name as MetricType),
                getMetricLabel(name as MetricType),
              ]}
            />
            <Legend
              formatter={(value) => getMetricLabel(value as MetricType)}
            />
            <Bar dataKey={primaryMetric} fill={getMetricColor(primaryMetric)} name={primaryMetric} />
            {secondaryMetric !== 'none' && (
              <Bar dataKey={secondaryMetric} fill={getMetricColor(secondaryMetric)} name={secondaryMetric} />
            )}
          </BarChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}



