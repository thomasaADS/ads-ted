-- Create enum for ad platform
CREATE TYPE ad_platform AS ENUM ('facebook', 'google', 'tiktok', 'taboola', 'outbrain', 'linkedin', 'other');

-- Create enum for campaign status
CREATE TYPE campaign_status AS ENUM ('active', 'paused', 'deleted', 'completed');

-- Create ad_accounts table
CREATE TABLE IF NOT EXISTS public.ad_accounts (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    platform ad_platform NOT NULL,
    currency text DEFAULT 'USD',
    external_account_id text, -- ID from the platform (Facebook, Google, etc.)
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create campaigns_analytics table (separate from existing campaigns table for analytics)
CREATE TABLE IF NOT EXISTS public.campaigns_analytics (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    ad_account_id uuid NOT NULL REFERENCES public.ad_accounts(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    objective text,
    status campaign_status DEFAULT 'active',
    country text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    start_date date,
    end_date date,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    external_campaign_id text -- ID from the platform
);

-- Create campaign_stats_daily table
CREATE TABLE IF NOT EXISTS public.campaign_stats_daily (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    campaign_id uuid NOT NULL REFERENCES public.campaigns_analytics(id) ON DELETE CASCADE,
    date date NOT NULL,
    impressions integer DEFAULT 0,
    clicks integer DEFAULT 0,
    spend numeric(12, 2) DEFAULT 0,
    leads integer DEFAULT 0,
    purchases integer,
    revenue numeric(12, 2),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE(campaign_id, date) -- One record per campaign per day
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ad_accounts_user_id ON public.ad_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_accounts_platform ON public.ad_accounts(platform);
CREATE INDEX IF NOT EXISTS idx_campaigns_analytics_user_id ON public.campaigns_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_analytics_ad_account_id ON public.campaigns_analytics(ad_account_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_analytics_status ON public.campaigns_analytics(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_analytics_country ON public.campaigns_analytics(country);
CREATE INDEX IF NOT EXISTS idx_campaign_stats_daily_campaign_id ON public.campaign_stats_daily(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_stats_daily_date ON public.campaign_stats_daily(date);
CREATE INDEX IF NOT EXISTS idx_campaign_stats_daily_campaign_date ON public.campaign_stats_daily(campaign_id, date);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_ad_accounts_updated_at
    BEFORE UPDATE ON public.ad_accounts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_analytics_updated_at
    BEFORE UPDATE ON public.campaigns_analytics
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaign_stats_daily_updated_at
    BEFORE UPDATE ON public.campaign_stats_daily
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.ad_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_stats_daily ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ad_accounts
CREATE POLICY "Users can view their own ad accounts"
    ON public.ad_accounts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ad accounts"
    ON public.ad_accounts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ad accounts"
    ON public.ad_accounts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ad accounts"
    ON public.ad_accounts FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for campaigns_analytics
CREATE POLICY "Users can view their own campaigns"
    ON public.campaigns_analytics FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own campaigns"
    ON public.campaigns_analytics FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own campaigns"
    ON public.campaigns_analytics FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own campaigns"
    ON public.campaigns_analytics FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for campaign_stats_daily
CREATE POLICY "Users can view stats for their campaigns"
    ON public.campaign_stats_daily FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.campaigns_analytics
            WHERE campaigns_analytics.id = campaign_stats_daily.campaign_id
            AND campaigns_analytics.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert stats for their campaigns"
    ON public.campaign_stats_daily FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.campaigns_analytics
            WHERE campaigns_analytics.id = campaign_stats_daily.campaign_id
            AND campaigns_analytics.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update stats for their campaigns"
    ON public.campaign_stats_daily FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.campaigns_analytics
            WHERE campaigns_analytics.id = campaign_stats_daily.campaign_id
            AND campaigns_analytics.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete stats for their campaigns"
    ON public.campaign_stats_daily FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.campaigns_analytics
            WHERE campaigns_analytics.id = campaign_stats_daily.campaign_id
            AND campaigns_analytics.user_id = auth.uid()
        )
    );

-- Create a view for aggregated campaign metrics
CREATE OR REPLACE VIEW public.campaign_metrics AS
SELECT 
    c.id,
    c.name,
    c.ad_account_id,
    c.user_id,
    c.objective,
    c.status,
    c.country,
    c.start_date,
    c.end_date,
    aa.platform,
    aa.name as account_name,
    COALESCE(SUM(s.impressions), 0) as total_impressions,
    COALESCE(SUM(s.clicks), 0) as total_clicks,
    COALESCE(SUM(s.spend), 0) as total_spend,
    COALESCE(SUM(s.leads), 0) as total_leads,
    COALESCE(SUM(s.purchases), 0) as total_purchases,
    COALESCE(SUM(s.revenue), 0) as total_revenue,
    CASE 
        WHEN SUM(s.impressions) > 0 THEN ROUND((SUM(s.clicks)::numeric / SUM(s.impressions)::numeric) * 100, 2)
        ELSE 0
    END as ctr,
    CASE 
        WHEN SUM(s.clicks) > 0 THEN ROUND(SUM(s.spend)::numeric / SUM(s.clicks)::numeric, 2)
        ELSE 0
    END as cpc,
    CASE 
        WHEN SUM(s.leads) > 0 THEN ROUND(SUM(s.spend)::numeric / SUM(s.leads)::numeric, 2)
        ELSE 0
    END as cpl,
    CASE 
        WHEN SUM(s.spend) > 0 AND SUM(s.revenue) > 0 THEN ROUND((SUM(s.revenue)::numeric / SUM(s.spend)::numeric), 2)
        ELSE 0
    END as roas
FROM public.campaigns_analytics c
LEFT JOIN public.ad_accounts aa ON c.ad_account_id = aa.id
LEFT JOIN public.campaign_stats_daily s ON c.id = s.campaign_id
GROUP BY c.id, c.name, c.ad_account_id, c.user_id, c.objective, c.status, c.country, c.start_date, c.end_date, aa.platform, aa.name;

-- Grant access to the view
GRANT SELECT ON public.campaign_metrics TO authenticated;



