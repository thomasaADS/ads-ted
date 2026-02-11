import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { facebookAPI, FacebookAdAccount } from '@/lib/facebook-api';
import { CheckCircle2, AlertCircle, Loader2, Facebook, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function FacebookConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [adAccounts, setAdAccounts] = useState<FacebookAdAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      const connected = facebookAPI.isLoggedIn();
      setIsConnected(connected);

      if (connected) {
        await loadAdAccounts();
        const savedAccountId = facebookAPI.getAdAccountId();
        if (savedAccountId) {
          setSelectedAccount(savedAccountId);
        }
      }
    };

    checkConnection();
  }, []);

  const loadAdAccounts = async () => {
    setIsLoadingAccounts(true);
    try {
      const accounts = await facebookAPI.getAdAccounts();
      setAdAccounts(accounts);
      
      if (accounts.length === 0) {
        toast.warning('לא נמצאו חשבונות פרסום', {
          description: 'וודא שיש לך הרשאות לחשבונות פרסום בפייסבוק',
        });
      }
    } catch (error: any) {
      console.error('Error loading ad accounts:', error);
      toast.error('שגיאה בטעינת חשבונות פרסום', {
        description: error.message,
      });
    } finally {
      setIsLoadingAccounts(false);
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await facebookAPI.login();
      setIsConnected(true);
      toast.success('התחברת בהצלחה לפייסבוק! 🎉');
      
      // Load ad accounts after connection
      await loadAdAccounts();
    } catch (error: any) {
      console.error('Facebook login error:', error);
      toast.error('שגיאה בהתחברות לפייסבוק', {
        description: error.message,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await facebookAPI.logout();
      setIsConnected(false);
      setAdAccounts([]);
      setSelectedAccount('');
      toast.info('התנתקת מפייסבוק');
    } catch (error: any) {
      console.error('Facebook logout error:', error);
      toast.error('שגיאה בהתנתקות', {
        description: error.message,
      });
    }
  };

  const handleAccountChange = (accountId: string) => {
    setSelectedAccount(accountId);
    facebookAPI.setAdAccountId(accountId);
    toast.success('חשבון הפרסום נשמר בהצלחה! ✅');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <Facebook className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">חיבור לפייסבוק/מטא</h3>
            <p className="text-sm text-muted-foreground">
              חבר את חשבון הפרסום שלך כדי לפרסם קמפיינים ישירות
            </p>
          </div>
        </div>
        
        {isConnected ? (
          <Badge variant="default" className="bg-green-600 text-white gap-2">
            <CheckCircle2 className="w-4 h-4" />
            מחובר
          </Badge>
        ) : (
          <Badge variant="secondary" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            לא מחובר
          </Badge>
        )}
      </div>

      {!isConnected ? (
        <div className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              כדי לפרסם קמפיינים ישירות לפייסבוק, עליך להתחבר לחשבון המטא שלך.
              <br />
              תצטרך להעניק הרשאות לניהול פרסומות.
            </AlertDescription>
          </Alert>

          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                מתחבר...
              </>
            ) : (
              <>
                <Facebook className="w-5 h-5 mr-2" />
                התחבר עם פייסבוק
              </>
            )}
          </Button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="font-semibold text-blue-900 mb-2">📋 מה קורה אחרי ההתחברות?</p>
            <ul className="space-y-1 text-blue-800">
              <li>✅ נקבל גישה לחשבונות הפרסום שלך</li>
              <li>✅ נוכל ליצור ולנהל קמפיינים</li>
              <li>✅ נוכל לעלות תמונות וקריאייטיבים</li>
              <li>✅ נוכל לעקוב אחרי ביצועים</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              אתה מחובר לפייסבוק! עכשיו אפשר לבחור חשבון פרסום ולהתחיל לפרסם.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <label className="text-sm font-medium">בחר חשבון פרסום:</label>
            {isLoadingAccounts ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : adAccounts.length > 0 ? (
              <Select value={selectedAccount} onValueChange={handleAccountChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="בחר חשבון פרסום..." />
                </SelectTrigger>
                <SelectContent>
                  {adAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{account.name}</span>
                        <Badge variant="outline" className="mr-2">
                          {account.currency}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  לא נמצאו חשבונות פרסום. וודא שיש לך הרשאות מתאימות.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {selectedAccount && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                הכל מוכן
              </p>
              <p className="text-sm text-gray-700">
                עכשיו תוכל לפרסם קמפיינים ישירות לחשבון הפרסום שבחרת.
                <br />
                פשוט צור קמפיין ולחץ על "פרסם לפייסבוק"
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={loadAdAccounts}
              variant="outline"
              disabled={isLoadingAccounts}
              className="flex-1"
            >
              {isLoadingAccounts ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  טוען...
                </>
              ) : (
                'רענן חשבונות'
              )}
            </Button>
            <Button
              onClick={handleDisconnect}
              variant="destructive"
              className="flex-1"
            >
              התנתק מפייסבוק
            </Button>
          </div>
        </div>
      )}

      {/* Instructions for App Setup */}
      <div className="mt-6 pt-6 border-t">
        <details className="text-sm">
          <summary className="font-semibold cursor-pointer text-primary hover:underline">
            🔧 הגדרות Facebook App (למפתחים)
          </summary>
          <div className="mt-4 space-y-2 text-muted-foreground bg-gray-50 p-4 rounded-lg">
            <p>כדי שהחיבור יעבוד, צריך להגדיר:</p>
            <ol className="list-decimal list-inside space-y-1 mr-4">
              <li>צור Facebook App ב-developers.facebook.com</li>
              <li>הוסף את המוצר "Marketing API"</li>
              <li>הגדר OAuth Redirect URI</li>
              <li>העתק את App ID ו-App Secret</li>
              <li>הוסף ל-.env:</li>
            </ol>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-2 text-xs overflow-x-auto">
{`VITE_FACEBOOK_APP_ID=your_app_id
VITE_FACEBOOK_APP_SECRET=your_app_secret`}
            </pre>
          </div>
        </details>
      </div>
    </Card>
  );
}

