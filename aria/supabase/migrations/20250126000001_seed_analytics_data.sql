-- Seed script for analytics dashboard demo data
-- This creates sample ad accounts, campaigns, and daily stats for testing

-- Note: This uses auth.uid() which requires a logged-in user
-- For initial seeding, you may need to temporarily disable RLS or use a service role

-- Insert sample ad accounts (these will be associated with the current user)
-- In production, these would come from actual API connections

-- Sample data will be inserted via the application after user login
-- This migration just ensures the tables exist

-- You can manually insert test data using:
-- INSERT INTO public.ad_accounts (user_id, name, platform, currency) 
-- VALUES (auth.uid(), 'My Facebook Account', 'facebook', 'USD');

-- For development/testing, you might want to create a function that seeds data:
CREATE OR REPLACE FUNCTION public.seed_analytics_demo_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id uuid;
    v_account1_id uuid;
    v_account2_id uuid;
    v_account3_id uuid;
    v_campaign1_id uuid;
    v_campaign2_id uuid;
    v_campaign3_id uuid;
    v_campaign4_id uuid;
    v_date date;
    v_days_back integer;
BEGIN
    -- Get current user
    v_user_id := auth.uid();
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User must be authenticated';
    END IF;

    -- Check if data already exists
    IF EXISTS (SELECT 1 FROM public.ad_accounts WHERE user_id = v_user_id LIMIT 1) THEN
        RETURN; -- Data already seeded
    END IF;

    -- Insert ad accounts
    INSERT INTO public.ad_accounts (user_id, name, platform, currency)
    VALUES 
        (v_user_id, 'Facebook Business Account', 'facebook', 'USD'),
        (v_user_id, 'Google Ads Account', 'google', 'USD'),
        (v_user_id, 'TikTok Ads Account', 'tiktok', 'USD')
    RETURNING id INTO v_account1_id;

    SELECT id INTO v_account1_id FROM public.ad_accounts WHERE user_id = v_user_id AND platform = 'facebook' LIMIT 1;
    SELECT id INTO v_account2_id FROM public.ad_accounts WHERE user_id = v_user_id AND platform = 'google' LIMIT 1;
    SELECT id INTO v_account3_id FROM public.ad_accounts WHERE user_id = v_user_id AND platform = 'tiktok' LIMIT 1;

    -- Insert campaigns
    INSERT INTO public.campaigns_analytics (ad_account_id, user_id, name, objective, status, country, start_date, end_date)
    VALUES 
        (v_account1_id, v_user_id, 'Summer Sale 2025', 'CONVERSIONS', 'active', 'IL', CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '30 days'),
        (v_account1_id, v_user_id, 'Brand Awareness Campaign', 'REACH', 'active', 'IL', CURRENT_DATE - INTERVAL '15 days', NULL),
        (v_account2_id, v_user_id, 'Product Launch Q1', 'LEADS', 'active', 'US', CURRENT_DATE - INTERVAL '20 days', NULL),
        (v_account3_id, v_user_id, 'Holiday Promotion', 'TRAFFIC', 'paused', 'IL', CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '20 days')
    RETURNING id INTO v_campaign1_id;

    SELECT id INTO v_campaign1_id FROM public.campaigns_analytics WHERE user_id = v_user_id AND name = 'Summer Sale 2025' LIMIT 1;
    SELECT id INTO v_campaign2_id FROM public.campaigns_analytics WHERE user_id = v_user_id AND name = 'Brand Awareness Campaign' LIMIT 1;
    SELECT id INTO v_campaign3_id FROM public.campaigns_analytics WHERE user_id = v_user_id AND name = 'Product Launch Q1' LIMIT 1;
    SELECT id INTO v_campaign4_id FROM public.campaigns_analytics WHERE user_id = v_user_id AND name = 'Holiday Promotion' LIMIT 1;

    -- Insert daily stats for the last 30 days for each campaign
    FOR v_days_back IN 0..29 LOOP
        v_date := CURRENT_DATE - (v_days_back || ' days')::interval;
        
        -- Campaign 1: Summer Sale (high performance)
        INSERT INTO public.campaign_stats_daily (campaign_id, date, impressions, clicks, spend, leads, purchases, revenue)
        VALUES (
            v_campaign1_id,
            v_date,
            (10000 + (random() * 5000)::integer),
            (200 + (random() * 100)::integer),
            (50 + (random() * 30))::numeric(12,2),
            (10 + (random() * 5)::integer),
            (5 + (random() * 3)::integer),
            (200 + (random() * 100))::numeric(12,2)
        )
        ON CONFLICT (campaign_id, date) DO NOTHING;

        -- Campaign 2: Brand Awareness (high impressions, lower clicks)
        INSERT INTO public.campaign_stats_daily (campaign_id, date, impressions, clicks, spend, leads, purchases, revenue)
        VALUES (
            v_campaign2_id,
            v_date,
            (15000 + (random() * 8000)::integer),
            (150 + (random() * 50)::integer),
            (40 + (random() * 20))::numeric(12,2),
            (5 + (random() * 3)::integer),
            NULL,
            NULL
        )
        ON CONFLICT (campaign_id, date) DO NOTHING;

        -- Campaign 3: Product Launch (moderate performance)
        INSERT INTO public.campaign_stats_daily (campaign_id, date, impressions, clicks, spend, leads, purchases, revenue)
        VALUES (
            v_campaign3_id,
            v_date,
            (8000 + (random() * 4000)::integer),
            (180 + (random() * 80)::integer),
            (60 + (random() * 40))::numeric(12,2),
            (15 + (random() * 10)::integer),
            (3 + (random() * 2)::integer),
            (150 + (random() * 80))::numeric(12,2)
        )
        ON CONFLICT (campaign_id, date) DO NOTHING;

        -- Campaign 4: Holiday Promotion (paused, only old data)
        IF v_days_back >= 10 THEN
            INSERT INTO public.campaign_stats_daily (campaign_id, date, impressions, clicks, spend, leads, purchases, revenue)
            VALUES (
                v_campaign4_id,
                v_date,
                (5000 + (random() * 3000)::integer),
                (100 + (random() * 50)::integer),
                (30 + (random() * 20))::numeric(12,2),
                (8 + (random() * 5)::integer),
                (2 + (random() * 2)::integer),
                (80 + (random() * 50))::numeric(12,2)
            )
            ON CONFLICT (campaign_id, date) DO NOTHING;
        END IF;
    END LOOP;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.seed_analytics_demo_data() TO authenticated;



