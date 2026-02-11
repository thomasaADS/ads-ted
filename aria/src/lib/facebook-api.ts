/**
 * Facebook Marketing API Integration
 * 
 * This service handles all Facebook/Meta API interactions:
 * - OAuth authentication
 * - Ad Accounts management
 * - Campaign creation
 * - Ad creation and publishing
 */

export interface FacebookAdAccount {
  id: string;
  account_id: string;
  name: string;
  currency: string;
  timezone_name: string;
  account_status: number;
}

export interface FacebookCampaign {
  id?: string;
  name: string;
  objective: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  special_ad_categories?: string[];
}

export interface FacebookAdSet {
  id?: string;
  name: string;
  campaign_id: string;
  daily_budget?: number;
  lifetime_budget?: number;
  billing_event: string;
  optimization_goal: string;
  bid_amount?: number;
  targeting: any;
  status: 'ACTIVE' | 'PAUSED';
  start_time?: string;
  end_time?: string;
}

export interface FacebookAd {
  id?: string;
  name: string;
  adset_id: string;
  creative: {
    name: string;
    object_story_spec?: {
      page_id: string;
      link_data?: {
        link: string;
        message: string;
        name?: string;
        description?: string;
        image_hash?: string;
        call_to_action?: {
          type: string;
          value?: {
            link: string;
          };
        };
      };
    };
  };
  status: 'ACTIVE' | 'PAUSED';
}

class FacebookAPIService {
  private accessToken: string | null = null;
  private adAccountId: string | null = null;
  private appId: string = import.meta.env.VITE_FACEBOOK_APP_ID || '';
  private appSecret: string = import.meta.env.VITE_FACEBOOK_APP_SECRET || '';
  private apiVersion: string = 'v18.0';
  private baseUrl: string = 'https://graph.facebook.com';

  /**
   * Initialize Facebook SDK
   */
  initFacebookSDK(): Promise<void> {
    return new Promise((resolve) => {
      // Load Facebook SDK
      if ((window as any).FB) {
        resolve();
        return;
      }

      (window as any).fbAsyncInit = () => {
        (window as any).FB.init({
          appId: this.appId,
          cookie: true,
          xfbml: true,
          version: this.apiVersion,
        });
        resolve();
      };

      // Load SDK script
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/he_IL/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    });
  }

  /**
   * Login to Facebook and get access token
   */
  async login(): Promise<string> {
    await this.initFacebookSDK();

    return new Promise((resolve, reject) => {
      (window as any).FB.login(
        (response: any) => {
          if (response.authResponse) {
            this.accessToken = response.authResponse.accessToken;
            // Save to localStorage for persistence
            localStorage.setItem('fb_access_token', this.accessToken!);
            resolve(this.accessToken!);
          } else {
            reject(new Error('User cancelled login or did not fully authorize.'));
          }
        },
        {
          scope: 'ads_management,ads_read,business_management,pages_read_engagement,pages_manage_ads',
        }
      );
    });
  }

  /**
   * Logout from Facebook
   */
  async logout(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).FB) {
        (window as any).FB.logout(() => {
          this.accessToken = null;
          this.adAccountId = null;
          localStorage.removeItem('fb_access_token');
          localStorage.removeItem('fb_ad_account_id');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    if (this.accessToken) return true;
    
    // Check localStorage
    const token = localStorage.getItem('fb_access_token');
    if (token) {
      this.accessToken = token;
      return true;
    }
    
    return false;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('fb_access_token');
    }
    return this.accessToken;
  }

  /**
   * Set access token manually
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('fb_access_token', token);
  }

  /**
   * Get selected Ad Account ID
   */
  getAdAccountId(): string | null {
    if (!this.adAccountId) {
      this.adAccountId = localStorage.getItem('fb_ad_account_id');
    }
    return this.adAccountId;
  }

  /**
   * Set Ad Account ID
   */
  setAdAccountId(accountId: string): void {
    this.adAccountId = accountId;
    localStorage.setItem('fb_ad_account_id', accountId);
  }

  /**
   * Make API request to Facebook
   */
  private async apiRequest(endpoint: string, method: string = 'GET', data?: any): Promise<any> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('Not authenticated with Facebook');
    }

    const url = `${this.baseUrl}/${this.apiVersion}${endpoint}`;
    const params = new URLSearchParams({
      access_token: token,
      ...data,
    });

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET') {
      const response = await fetch(`${url}?${params}`);
      return this.handleResponse(response);
    } else {
      options.body = JSON.stringify(data);
      const response = await fetch(`${url}?access_token=${token}`, options);
      return this.handleResponse(response);
    }
  }

  /**
   * Handle API response
   */
  private async handleResponse(response: Response): Promise<any> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Facebook API error');
    }
    
    return data;
  }

  /**
   * Get user's Ad Accounts
   */
  async getAdAccounts(): Promise<FacebookAdAccount[]> {
    try {
      const response = await this.apiRequest('/me/adaccounts', 'GET', {
        fields: 'id,account_id,name,currency,timezone_name,account_status',
      });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching ad accounts:', error);
      throw error;
    }
  }

  /**
   * Create a campaign
   */
  async createCampaign(campaign: FacebookCampaign): Promise<string> {
    const accountId = this.getAdAccountId();
    if (!accountId) {
      throw new Error('No ad account selected');
    }

    try {
      const response = await this.apiRequest(`/${accountId}/campaigns`, 'POST', {
        name: campaign.name,
        objective: campaign.objective,
        status: campaign.status,
        special_ad_categories: campaign.special_ad_categories || [],
      });
      
      return response.id;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  /**
   * Create an Ad Set
   */
  async createAdSet(adSet: FacebookAdSet): Promise<string> {
    const accountId = this.getAdAccountId();
    if (!accountId) {
      throw new Error('No ad account selected');
    }

    try {
      const response = await this.apiRequest(`/${accountId}/adsets`, 'POST', adSet);
      return response.id;
    } catch (error) {
      console.error('Error creating ad set:', error);
      throw error;
    }
  }

  /**
   * Upload image and get hash
   */
  async uploadImage(imageUrl: string): Promise<string> {
    const accountId = this.getAdAccountId();
    if (!accountId) {
      throw new Error('No ad account selected');
    }

    try {
      // Download image as blob
      const imageResponse = await fetch(imageUrl);
      const blob = await imageResponse.blob();
      
      // Convert to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // Upload to Facebook
      const response = await this.apiRequest(`/${accountId}/adimages`, 'POST', {
        bytes: base64.split(',')[1],
      });
      
      return response.images[Object.keys(response.images)[0]].hash;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  /**
   * Create an Ad
   */
  async createAd(ad: FacebookAd): Promise<string> {
    const accountId = this.getAdAccountId();
    if (!accountId) {
      throw new Error('No ad account selected');
    }

    try {
      const response = await this.apiRequest(`/${accountId}/ads`, 'POST', ad);
      return response.id;
    } catch (error) {
      console.error('Error creating ad:', error);
      throw error;
    }
  }

  /**
   * Publish a complete campaign to Facebook
   * This is the main function to use for publishing generated campaigns
   */
  async publishCampaign(campaignData: {
    name: string;
    headline: string;
    body: string;
    imageUrl: string;
    targetUrl: string;
    dailyBudget: number;
    targeting: any;
    objective?: string;
  }): Promise<{ campaignId: string; adSetId: string; adId: string }> {
    try {
      // Step 1: Create Campaign
      const campaignId = await this.createCampaign({
        name: campaignData.name,
        objective: campaignData.objective || 'OUTCOME_TRAFFIC',
        status: 'PAUSED', // Start as paused for review
        special_ad_categories: [],
      });

      // Step 2: Create Ad Set
      const adSetId = await this.createAdSet({
        name: `${campaignData.name} - Ad Set`,
        campaign_id: campaignId,
        daily_budget: campaignData.dailyBudget * 100, // Convert to cents
        billing_event: 'IMPRESSIONS',
        optimization_goal: 'LINK_CLICKS',
        targeting: campaignData.targeting,
        status: 'PAUSED',
      });

      // Step 3: Upload Image
      const imageHash = await this.uploadImage(campaignData.imageUrl);

      // Step 4: Create Ad
      const adId = await this.createAd({
        name: campaignData.headline,
        adset_id: adSetId,
        creative: {
          name: `${campaignData.name} - Creative`,
          object_story_spec: {
            page_id: '', // Will need to get user's page
            link_data: {
              link: campaignData.targetUrl,
              message: campaignData.body,
              name: campaignData.headline,
              image_hash: imageHash,
              call_to_action: {
                type: 'LEARN_MORE',
                value: {
                  link: campaignData.targetUrl,
                },
              },
            },
          },
        },
        status: 'PAUSED',
      });

      return { campaignId, adSetId, adId };
    } catch (error) {
      console.error('Error publishing campaign:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const facebookAPI = new FacebookAPIService();



