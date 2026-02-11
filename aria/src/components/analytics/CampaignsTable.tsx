import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { CampaignMetrics } from '@/lib/analytics';
import { Skeleton } from '@/components/ui/skeleton';

interface CampaignsTableProps {
  campaigns: CampaignMetrics[];
  loading?: boolean;
  onCampaignClick: (campaign: CampaignMetrics) => void;
}

type SortField = 'name' | 'platform' | 'status' | 'spend' | 'impressions' | 'clicks' | 'ctr' | 'leads' | 'cpl' | 'roas';
type SortDirection = 'asc' | 'desc';

export function CampaignsTable({ campaigns, loading = false, onCampaignClick }: CampaignsTableProps) {
  const [sortField, setSortField] = useState<SortField>('spend');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortField) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'platform':
        aValue = a.platform || '';
        bValue = b.platform || '';
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      case 'spend':
        aValue = a.total_spend;
        bValue = b.total_spend;
        break;
      case 'impressions':
        aValue = a.total_impressions;
        bValue = b.total_impressions;
        break;
      case 'clicks':
        aValue = a.total_clicks;
        bValue = b.total_clicks;
        break;
      case 'ctr':
        aValue = a.ctr;
        bValue = b.ctr;
        break;
      case 'leads':
        aValue = a.total_leads;
        bValue = b.total_leads;
        break;
      case 'cpl':
        aValue = a.cpl;
        bValue = b.cpl;
        break;
      case 'roas':
        aValue = a.roas;
        bValue = b.roas;
        break;
      default:
        return 0;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 lg:px-3"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field ? (
        sortDirection === 'asc' ? (
          <ArrowUp className="mr-2 h-4 w-4" />
        ) : (
          <ArrowDown className="mr-2 h-4 w-4" />
        )
      ) : (
        <ArrowUpDown className="mr-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>לא נמצאו קמפיינים</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <SortButton field="name">שם קמפיין</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="platform">פלטפורמה</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="status">סטטוס</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="spend">הוצאה</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="impressions">חשיפות</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="clicks">קליקים</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="ctr">CTR</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="leads">לידים</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="cpl">CPL</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="roas">ROAS</SortButton>
            </TableHead>
            <TableHead>פעולות</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCampaigns.map((campaign) => (
            <TableRow
              key={campaign.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onCampaignClick(campaign)}
            >
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{getPlatformLabel(campaign.platform)}</TableCell>
              <TableCell>{getStatusBadge(campaign.status)}</TableCell>
              <TableCell>{formatCurrency(campaign.total_spend)}</TableCell>
              <TableCell>{formatNumber(campaign.total_impressions)}</TableCell>
              <TableCell>{formatNumber(campaign.total_clicks)}</TableCell>
              <TableCell>{campaign.ctr.toFixed(2)}%</TableCell>
              <TableCell>{formatNumber(campaign.total_leads)}</TableCell>
              <TableCell>{formatCurrency(campaign.cpl)}</TableCell>
              <TableCell>{campaign.roas.toFixed(2)}x</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCampaignClick(campaign);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}



