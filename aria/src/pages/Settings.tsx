import { useState } from "react";
import { TopNav } from "@/components/TopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Key, Palette } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [brandAssets, setBrandAssets] = useState({
    name: "",
    logo: "",
    primaryColor: "#8B5CF6",
    secondaryColor: "#3B82F6",
  });

  const [apiCredentials, setApiCredentials] = useState({
    metaAccessToken: "",
    metaAdAccountId: "",
    leonardoApiKey: "",
    openaiApiKey: "",
  });

  const handleSaveBrand = () => {
    toast.success("נכסי המותג נשמרו בהצלחה!");
  };

  const handleSaveCredentials = () => {
    toast.success("אישורי API נשמרו בהצלחה!");
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">הגדרות</h1>
            <p className="text-muted-foreground text-lg">
              הגדר את המותג שלך ואינטגרציות API
            </p>
          </div>

          <Tabs defaultValue="brand" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="brand" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                נכסי מותג
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                אישורי API
              </TabsTrigger>
            </TabsList>

            {/* Brand Assets */}
            <TabsContent value="brand">
              <Card className="p-8 gradient-card shadow-card border-border/50">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">שם המותג</Label>
                    <Input
                      id="brandName"
                      value={brandAssets.name}
                      onChange={(e) =>
                        setBrandAssets({ ...brandAssets, name: e.target.value })
                      }
                      placeholder="שם המותג שלך"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo">URL לוגו</Label>
                    <Input
                      id="logo"
                      type="url"
                      value={brandAssets.logo}
                      onChange={(e) =>
                        setBrandAssets({ ...brandAssets, logo: e.target.value })
                      }
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">צבע ראשי</Label>
                      <div className="flex gap-2">
                        <Input
                          id="primaryColor"
                          type="color"
                          value={brandAssets.primaryColor}
                          onChange={(e) =>
                            setBrandAssets({
                              ...brandAssets,
                              primaryColor: e.target.value,
                            })
                          }
                          className="w-20 h-10"
                        />
                        <Input
                          value={brandAssets.primaryColor}
                          onChange={(e) =>
                            setBrandAssets({
                              ...brandAssets,
                              primaryColor: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">צבע משני</Label>
                      <div className="flex gap-2">
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={brandAssets.secondaryColor}
                          onChange={(e) =>
                            setBrandAssets({
                              ...brandAssets,
                              secondaryColor: e.target.value,
                            })
                          }
                          className="w-20 h-10"
                        />
                        <Input
                          value={brandAssets.secondaryColor}
                          onChange={(e) =>
                            setBrandAssets({
                              ...brandAssets,
                              secondaryColor: e.target.value,
                            })
                          }
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveBrand}
                    className="w-full gradient-primary hover:opacity-90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    שמור נכסי מותג
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* API Credentials */}
            <TabsContent value="api">
              <Card className="p-8 gradient-card shadow-card border-border/50">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="metaToken">Meta Access Token</Label>
                    <Input
                      id="metaToken"
                      type="password"
                      value={apiCredentials.metaAccessToken}
                      onChange={(e) =>
                        setApiCredentials({
                          ...apiCredentials,
                          metaAccessToken: e.target.value,
                        })
                      }
                      placeholder="Your long-lived Meta access token"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adAccountId">Meta Ad Account ID</Label>
                    <Input
                      id="adAccountId"
                      value={apiCredentials.metaAdAccountId}
                      onChange={(e) =>
                        setApiCredentials({
                          ...apiCredentials,
                          metaAdAccountId: e.target.value,
                        })
                      }
                      placeholder="act_XXXXXXXXXXXXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leonardo">Leonardo API Key</Label>
                    <Input
                      id="leonardo"
                      type="password"
                      value={apiCredentials.leonardoApiKey}
                      onChange={(e) =>
                        setApiCredentials({
                          ...apiCredentials,
                          leonardoApiKey: e.target.value,
                        })
                      }
                      placeholder="Your Leonardo API key"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="openai">OpenAI API Key</Label>
                    <Input
                      id="openai"
                      type="password"
                      value={apiCredentials.openaiApiKey}
                      onChange={(e) =>
                        setApiCredentials({
                          ...apiCredentials,
                          openaiApiKey: e.target.value,
                        })
                      }
                      placeholder="sk-..."
                    />
                  </div>

                  <Button
                    onClick={handleSaveCredentials}
                    className="w-full gradient-primary hover:opacity-90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    שמור אישורי API
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
