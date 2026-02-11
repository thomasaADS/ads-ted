# Analytics Dashboard - Implementation Guide

## Overview

A comprehensive campaign analytics dashboard has been implemented for the AdGenie/Ad-Box-AI project. This dashboard provides unified analytics across all advertising platforms with detailed performance metrics, filtering, and drill-down capabilities.

## Features Implemented

### 1. Database Schema (Supabase)
- **ad_accounts**: Stores connected ad accounts from different platforms
- **campaigns_analytics**: Stores campaign information with status, objectives, and metadata
- **campaign_stats_daily**: Stores daily performance metrics (impressions, clicks, spend, leads, revenue)
- **campaign_metrics**: Database view with pre-calculated aggregated metrics (CTR, CPC, CPL, ROAS)

### 2. Frontend Components

#### Main Dashboard (`/analytics`)
- **KPI Summary Cards**: 8 key metrics (Total Spend, Impressions, Clicks, Leads, Avg CPC, CPL, CTR, ROAS)
- **Time-Series Chart**: Interactive chart showing performance over time with customizable metrics
- **Campaigns Table**: Sortable table with all campaign performance data
- **Filters**: Date range, platform, status, country, and search filters
- **Campaign Details Drawer**: Detailed view with daily stats and trends

#### Reusable Components
- `DashboardSummaryCards`: Displays KPI cards with icons and formatting
- `CampaignFilters`: Comprehensive filtering UI with date picker
- `CampaignsTable`: Sortable, searchable table with all campaign metrics
- `MetricTimeseriesChart`: Recharts-based chart with line/bar toggle
- `CampaignDetailsDrawer`: Side drawer with campaign details and daily breakdown

### 3. Data Layer (`src/lib/analytics.ts`)
- TypeScript types for all analytics data structures
- Supabase query helpers for fetching data
- Aggregation and calculation functions
- Date range filtering support
- Demo data seeding function

## Setup Instructions

### 1. Run Database Migrations

The migrations are located in `supabase/migrations/`:
- `20250126000000_create_analytics_tables.sql`: Creates all tables, views, and RLS policies
- `20250126000001_seed_analytics_data.sql`: Creates seed function for demo data

Run these migrations in your Supabase project:
```bash
# If using Supabase CLI
supabase db push

# Or apply manually through Supabase Dashboard SQL Editor
```

### 2. Seed Demo Data

Once logged in, click the "צור נתוני דמו" (Seed Demo Data) button on the analytics dashboard, or call the function directly:

```sql
SELECT public.seed_analytics_demo_data();
```

This will create:
- 3 sample ad accounts (Facebook, Google, TikTok)
- 4 sample campaigns with different statuses
- 30 days of daily stats for each campaign

### 3. Access the Dashboard

Navigate to `/analytics` in your application. The dashboard requires authentication (uses `useAuth` hook).

## Usage

### Viewing Analytics
1. Navigate to `/analytics`
2. Use filters to narrow down campaigns by date range, platform, status, or country
3. View aggregated KPIs at the top
4. Explore the time-series chart to see trends
5. Click on any campaign row to see detailed breakdown

### Filtering
- **Date Range**: Use quick presets (7/30/90 days, this month) or custom range
- **Platform**: Filter by Facebook, Google, TikTok, LinkedIn, etc.
- **Status**: Active, Paused, Completed, Deleted
- **Country**: Filter by campaign country
- **Search**: Text search across campaign names

### Campaign Details
Click any campaign in the table to open a detailed drawer showing:
- Campaign metadata (name, platform, status, dates)
- 8 KPI cards with current metrics
- Daily performance chart
- Daily stats table with all metrics

## Integration with Real APIs

To connect real ad platform APIs (Facebook, Google, TikTok, etc.):

1. **Create sync functions** in `src/lib/` for each platform:
   - `facebook-sync.ts`: Fetch campaigns and stats from Facebook API
   - `google-sync.ts`: Fetch from Google Ads API
   - etc.

2. **Update the seed function** or create scheduled jobs to:
   - Fetch ad accounts from platforms
   - Sync campaigns
   - Import daily stats

3. **Example sync pattern**:
```typescript
// In src/lib/facebook-sync.ts
export async function syncFacebookCampaigns(accountId: string) {
  // 1. Fetch campaigns from Facebook API
  // 2. Upsert to campaigns_analytics table
  // 3. Fetch daily stats
  // 4. Upsert to campaign_stats_daily table
}
```

4. **Add webhooks or scheduled jobs** to keep data fresh:
   - Use Supabase Edge Functions for scheduled syncs
   - Or set up external cron jobs
   - Or trigger syncs on-demand from the dashboard

## Translations

All UI text is translatable via the i18n system:
- Hebrew translations in `src/translations/he.json` (under `analytics.*`)
- English translations in `src/translations/en.json` (under `analytics.*`)

Add more languages by extending the translation files.

## Technical Notes

### Performance
- Database views pre-calculate aggregated metrics for faster queries
- Indexes on frequently queried columns (date, campaign_id, platform, status)
- RLS policies ensure users only see their own data

### Type Safety
- All types defined in `src/lib/analytics.ts`
- TypeScript ensures type safety throughout the application

### Chart Library
- Uses Recharts (already in dependencies)
- Supports line and bar charts
- Customizable metrics and date ranges

## Future Enhancements

Potential improvements:
1. Export functionality (CSV, PDF)
2. Custom date range comparisons
3. Campaign performance alerts
4. Automated insights and recommendations
5. Multi-account aggregation
6. Real-time updates via Supabase subscriptions
7. A/B test analysis
8. Attribution modeling

## Troubleshooting

### No data showing
- Ensure migrations have been run
- Check RLS policies allow your user to see data
- Seed demo data using the button or SQL function
- Verify user is authenticated

### Charts not rendering
- Check browser console for errors
- Verify Recharts is installed: `npm install recharts`
- Ensure date range has data

### Filters not working
- Check that filter values match database values
- Verify date range is valid
- Check browser console for query errors

## Files Created/Modified

### New Files
- `supabase/migrations/20250126000000_create_analytics_tables.sql`
- `supabase/migrations/20250126000001_seed_analytics_data.sql`
- `src/lib/analytics.ts`
- `src/pages/AnalyticsDashboard.tsx`
- `src/components/analytics/DashboardSummaryCards.tsx`
- `src/components/analytics/CampaignFilters.tsx`
- `src/components/analytics/CampaignsTable.tsx`
- `src/components/analytics/MetricTimeseriesChart.tsx`
- `src/components/analytics/CampaignDetailsDrawer.tsx`

### Modified Files
- `src/App.tsx` (added `/analytics` route)
- `src/translations/he.json` (added analytics translations)
- `src/translations/en.json` (added analytics translations)

## Support

For issues or questions, check:
1. Supabase migration logs
2. Browser console for frontend errors
3. Supabase logs for database errors
4. Network tab for API call issues



