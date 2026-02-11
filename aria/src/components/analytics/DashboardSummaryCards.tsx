import { Card } from '@/components/ui/card';
import { DollarSign, Eye, MousePointerClick, Users, TrendingUp, Target, Zap, BarChart3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface KPIData {
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalLeads: number;
  totalRevenue: number;
  avgCPC: number;
  avgCPL: number;
  avgCTR: number;
  avgROAS: number;
}

interface DashboardSummaryCardsProps {
  kpis: KPIData | null;
  loading?: boolean;
  currency?: string;
}

export function DashboardSummaryCards({ kpis, loading = false, currency = 'USD' }: DashboardSummaryCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
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
    return value.toString();
  };

  const formatPercentage = (value: number) => {
    return value.toFixed(2) + '%';
  };

  const cards = kpis ? [
    {
      label: 'סה"כ הוצאה',
      value: formatCurrency(kpis.totalSpend),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'סה"כ חשיפות',
      value: formatNumber(kpis.totalImpressions),
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'סה"כ קליקים',
      value: formatNumber(kpis.totalClicks),
      icon: MousePointerClick,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'סה"כ לידים',
      value: formatNumber(kpis.totalLeads),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'CPC ממוצע',
      value: formatCurrency(kpis.avgCPC),
      icon: Target,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'CPL ממוצע',
      value: formatCurrency(kpis.avgCPL),
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'CTR ממוצע',
      value: formatPercentage(kpis.avgCTR),
      icon: TrendingUp,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'ROAS ממוצע',
      value: kpis.avgROAS.toFixed(2) + 'x',
      icon: BarChart3,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
  ] : [];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-12 w-12 rounded-lg mb-4" />
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card
            key={index}
            className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor} ${card.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground font-medium">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}



