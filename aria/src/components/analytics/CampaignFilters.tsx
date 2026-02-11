import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Search, X } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale/he';
import { cn } from '@/lib/utils';
import type { AnalyticsFilters, AdPlatform, CampaignStatus } from '@/lib/analytics';

interface CampaignFiltersProps {
  filters: AnalyticsFilters;
  onFiltersChange: (filters: AnalyticsFilters) => void;
  availablePlatforms: AdPlatform[];
  availableCountries: string[];
}

export function CampaignFilters({
  filters,
  onFiltersChange,
  availablePlatforms,
  availableCountries,
}: CampaignFiltersProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      onFiltersChange({
        ...filters,
        dateRange: {
          start: range.from,
          end: range.to,
        },
      });
    }
  };

  const quickDateRanges = [
    { label: '7 ימים אחרונים', days: 7 },
    { label: '30 ימים אחרונים', days: 30 },
    { label: '90 ימים אחרונים', days: 90 },
    { label: 'החודש הזה', days: 0, isThisMonth: true },
  ];

  const applyQuickRange = (days: number, isThisMonth?: boolean) => {
    const end = new Date();
    let start: Date;
    
    if (isThisMonth) {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else {
      start = new Date();
      start.setDate(start.getDate() - days);
    }

    onFiltersChange({
      ...filters,
      dateRange: { start, end },
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      platform: 'all',
      status: 'all',
      country: 'all',
      search: '',
    });
  };

  const hasActiveFilters = 
    filters.platform !== 'all' ||
    filters.status !== 'all' ||
    filters.country !== 'all' ||
    filters.search ||
    filters.dateRange;

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="חפש קמפיינים..."
              value={filters.search || ''}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pr-10"
            />
          </div>
        </div>

        {/* Platform Filter */}
        <Select
          value={filters.platform || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, platform: value as AdPlatform | 'all' })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="פלטפורמה" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">כל הפלטפורמות</SelectItem>
            {availablePlatforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform === 'facebook' ? 'פייסבוק' :
                 platform === 'google' ? 'גוגל' :
                 platform === 'tiktok' ? 'טיקטוק' :
                 platform === 'linkedin' ? 'לינקדאין' :
                 platform === 'taboola' ? 'טאבולה' :
                 platform === 'outbrain' ? 'אאוטבריין' :
                 platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value as CampaignStatus | 'all' })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="סטטוס" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">כל הסטטוסים</SelectItem>
            <SelectItem value="active">פעיל</SelectItem>
            <SelectItem value="paused">מושהה</SelectItem>
            <SelectItem value="completed">הושלם</SelectItem>
            <SelectItem value="deleted">נמחק</SelectItem>
          </SelectContent>
        </Select>

        {/* Country Filter */}
        {availableCountries.length > 0 && (
          <Select
            value={filters.country || 'all'}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, country: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="מדינה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">כל המדינות</SelectItem>
              {availableCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Date Range Picker */}
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !filters.dateRange && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {filters.dateRange ? (
                `${format(filters.dateRange.start, 'dd/MM/yyyy', { locale: he })} - ${format(filters.dateRange.end, 'dd/MM/yyyy', { locale: he })}`
              ) : (
                <span>בחר טווח תאריכים</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">טווחים מהירים:</p>
                <div className="flex flex-wrap gap-2">
                  {quickDateRanges.map((range) => (
                    <Button
                      key={range.label}
                      variant="outline"
                      size="sm"
                      onClick={() => applyQuickRange(range.days, range.isThisMonth)}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
              <Calendar
                mode="range"
                selected={{
                  from: filters.dateRange?.start,
                  to: filters.dateRange?.end,
                }}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                locale={he}
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFilters}
            title="נקה מסננים"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}

