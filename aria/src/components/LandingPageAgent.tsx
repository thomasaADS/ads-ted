import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Image, Wand2, Send, Bot, Building2, Target, Users, Eye, Palette } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
  options?: string[];
  imagePrompt?: string;
  generatedImage?: string;
}

interface PageData {
  businessName?: string;
  industry?: string;
  targetAudience?: string;
  mainGoal?: string;
  colorScheme?: string;
  style?: string;
  heroImage?: string;
  ctaText?: string;
}

const questions = [
  {
    id: 'businessName',
    question: 'מה שם העסק שלך?',
    type: 'text',
    icon: Building2,
  },
  {
    id: 'industry',
    question: 'באיזה תחום אתה עוסק?',
    type: 'options',
    options: ['טכנולוגיה', 'אופנה', 'מזון ומסעדות', 'בריאות', 'נדל"ן', 'שירותים עסקיים', 'אחר'],
    icon: Target,
  },
  {
    id: 'targetAudience',
    question: 'מי קהל היעד שלך?',
    type: 'text',
    icon: Users,
  },
  {
    id: 'mainGoal',
    question: 'מה המטרה העיקרית של דף הנחיתה?',
    type: 'options',
    options: ['יצירת לידים', 'מכירת מוצר', 'הרשמה לאירוע', 'הורדת אפליקציה', 'הצטרפות לרשימת תפוצה'],
    icon: Eye,
  },
  {
    id: 'style',
    question: 'איזה סטייל עיצובי אתה מעדיף?',
    type: 'options',
    options: ['מודרני ומינימליסטי', 'צעיר וצבעוני', 'מקצועי ועסקי', 'יצירתי ומקורי', 'אלגנטי ומעודן'],
    icon: Palette,
  },
  {
    id: 'colorScheme',
    question: 'איזו פלטת צבעים תרצה?',
    type: 'options',
    options: ['כחול וסגול', 'ירוק וכחול', 'כתום וורוד', 'שחור וזהב', 'כחול כהה ותכלת'],
    icon: Palette,
  },
  {
    id: 'heroImage',
    question: 'בואו ניצור תמונה מדהימה לדף הנחיתה!\n\nתאר לי מה תרצה לראות (או לחץ על אחת מהאפשרויות):',
    type: 'image',
    options: [
      'צוות עובד יחד במשרד מודרני',
      'מוצר טכנולוגי חדשני',
      'אנשים מאושרים משתמשים בשירות',
      'נוף עירוני עם טכנולוגיה',
      'תמונה אבסטרקטית צבעונית'
    ],
    icon: Image,
  }
];

export default function LandingPageAgent({ onComplete }: { onComplete: (data: PageData) => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'שלום! אני הסוכן החכם לבניית דפי נחיתה.\n\nאני כאן כדי לעזור לך ליצור דף נחיתה מושלם שמתאים בדיוק לעסק שלך!\n\nבוא נתחיל?',
      sender: 'ai',
      timestamp: new Date(),
      options: ['בואו נתחיל', 'ספר לי עוד על התהליך']
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [pageData, setPageData] = useState<PageData>({});
  const [userInput, setUserInput] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const generateAIImage = async (prompt: string): Promise<string> => {
    setIsGeneratingImage(true);
    try {
      // Using Pollinations.ai - FREE AI image generation!
      // No API key needed, just works!
      
      // Translate Hebrew to English for better results
      const englishPrompt = await translateToEnglish(prompt);
      
      // Add variety with random artistic styles and unique details
      const styles = [
        'cinematic lighting, 8k uhd, professional photography',
        'vibrant colors, dynamic composition, award winning',
        'soft natural lighting, ultra detailed, masterpiece',
        'dramatic lighting, sharp focus, highly detailed',
        'studio lighting, commercial photography, pristine',
      ];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      
      // Add random seed for variety
      const seed = Math.floor(Math.random() * 1000000);
      
      // Enhance the prompt for better quality and UNIQUENESS
      const enhancedPrompt = `${englishPrompt}, ${randomStyle}, unique perspective, original composition`;
      
      // Encode the prompt for URL
      const encodedPrompt = encodeURIComponent(enhancedPrompt);
      
      // Pollinations.ai URL with SEED for variety + timestamp
      const timestamp = Date.now();
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=800&seed=${seed}&nologo=true&enhance=true&model=flux&t=${timestamp}`;
      
      console.log('Generating image with prompt:', enhancedPrompt);
      console.log('Using seed:', seed);
      
      // Preload the image to ensure it's generated
      await new Promise<void>((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => {
          console.log('Image loaded successfully!');
          resolve();
        };
        img.onerror = () => {
          console.error('Image failed to load');
          reject(new Error('Failed to load image'));
        };
        img.src = imageUrl;
      });
      
      return imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      // Fallback to Unsplash with relevant search + timestamp for variety
      const searchQuery = prompt.split(' ').slice(0, 3).join(',');
      const timestamp = Date.now();
      return `https://source.unsplash.com/1200x800/?${searchQuery},business,modern,professional&sig=${timestamp}`;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Helper function to translate Hebrew to English for better AI image results
  const translateToEnglish = async (hebrewText: string): Promise<string> => {
    // Simple keyword mapping for common Hebrew terms
    const hebrewToEnglish: { [key: string]: string } = {
      'צוות': 'team',
      'עובד': 'working',
      'יחד': 'together',
      'משרד': 'office',
      'מודרני': 'modern',
      'מחשבים': 'computers',
      'טכנולוגי': 'technology tech',
      'חדשני': 'innovative',
      'מוצר': 'product',
      'אנשים': 'people',
      'מאושרים': 'happy',
      'שירות': 'service',
      'נוף': 'landscape',
      'עירוני': 'urban city',
      'צבעוני': 'colorful',
      'אבסטרקטי': 'abstract',
      'עסק': 'business',
      'לקוחות': 'customers',
      'פגישה': 'meeting',
      'מצגת': 'presentation',
    };

    let englishPrompt = hebrewText;
    
    // Replace Hebrew keywords with English
    Object.entries(hebrewToEnglish).forEach(([hebrew, english]) => {
      const regex = new RegExp(hebrew, 'g');
      englishPrompt = englishPrompt.replace(regex, english);
    });

    // If still has Hebrew characters, use a default professional prompt
    if (/[\u0590-\u05FF]/.test(englishPrompt)) {
      return 'professional business team working together in modern office with computers, high quality, detailed';
    }

    return englishPrompt;
  };

  const addMessage = (text: string, sender: 'ai' | 'user', options?: string[], imagePrompt?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options,
      imagePrompt,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = async (option: string) => {
    if (currentQuestionIndex === -1) {
      // First interaction
      addMessage(option, 'user');
      if (option.includes('ספר לי עוד')) {
        addMessage(
          'התהליך פשוט ומהיר!\n\nאני אשאל אותך כמה שאלות על העסק שלך, נבחר ביחד עיצוב וצבעים, ניצור תמונה מושלמת עם AI, ובסוף תקבל דף נחיתה מוכן לשימוש!\n\nכל התהליך לוקח בערך 2-3 דקות. מוכן להתחיל?',
          'ai',
          ['בואו נתחיל']
        );
      } else {
        proceedToNextQuestion();
      }
    } else {
      // Regular question response
      const currentQuestion = questions[currentQuestionIndex];
      addMessage(option, 'user');

      if (currentQuestion.id === 'heroImage') {
        // Generate AI image
        toast.info('יוצר תמונה...');
        const imageUrl = await generateAIImage(option);
        
        setPageData((prev) => ({ ...prev, [currentQuestion.id]: imageUrl }));
        
        const imageMessage: Message = {
          id: Date.now().toString(),
          text: 'הנה התמונה שיצרתי בשבילך!\n\nמה דעתך?',
          sender: 'ai',
          timestamp: new Date(),
          generatedImage: imageUrl,
          options: ['מושלם', 'צור תמונה אחרת']
        };
        setMessages((prev) => [...prev, imageMessage]);
      } else {
        setPageData((prev) => ({ ...prev, [currentQuestion.id]: option }));
        proceedToNextQuestion();
      }
    }
  };

  const handleTextSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    const currentQuestion = questions[currentQuestionIndex];
    addMessage(userInput, 'user');

    if (currentQuestion.id === 'heroImage') {
      // Generate AI image from custom prompt
      toast.info('יוצר תמונה מהתיאור שלך...');
      const imageUrl = await generateAIImage(userInput);
      
      setPageData((prev) => ({ ...prev, [currentQuestion.id]: imageUrl }));
      
      const imageMessage: Message = {
        id: Date.now().toString(),
        text: 'הנה התמונה שיצרתי לפי התיאור שלך!\n\nמה דעתך?',
        sender: 'ai',
        timestamp: new Date(),
        generatedImage: imageUrl,
        options: ['מושלם', 'צור תמונה אחרת']
      };
      setMessages((prev) => [...prev, imageMessage]);
    } else {
      setPageData((prev) => ({ ...prev, [currentQuestion.id]: userInput }));
      proceedToNextQuestion();
    }

    setUserInput('');
  };

  const proceedToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      const nextQuestion = questions[nextIndex];

      setTimeout(() => {
        addMessage(
          nextQuestion.question,
          'ai',
          nextQuestion.options
        );
      }, 800);
    } else {
      setTimeout(() => {
        addMessage(
          'מעולה! אספתי את כל המידע.\n\nעכשיו אני בונה עבורך דף נחיתה מושלם...',
          'ai'
        );

        setTimeout(() => {
          toast.success('דף הנחיתה מוכן!');
          onComplete(pageData);
        }, 2000);
      }, 800);
    }
  };

  const handleImageRegenerate = async () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
    const prompt = lastUserMessage?.text || 'modern business landing page hero image';
    
    toast.info('יוצר תמונה חדשה...');
    const imageUrl = await generateAIImage(prompt);
    
    setPageData((prev) => ({ ...prev, heroImage: imageUrl }));
    
    const imageMessage: Message = {
      id: Date.now().toString(),
      text: 'הנה תמונה חדשה!',
      sender: 'ai',
      timestamp: new Date(),
      generatedImage: imageUrl,
      options: ['מושלם', 'צור תמונה אחרת']
    };
    setMessages((prev) => [...prev, imageMessage]);
  };

  const handleImageApprove = () => {
    addMessage('מושלם, אני אוהב את התמונה!', 'user');
    proceedToNextQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 text-base px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white inline-flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            בונה דפי נחיתה AI
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            בואו ניצור דף נחיתה מושלם ביחד
          </h1>
          <p className="text-gray-600 text-lg">
            ענה על מספר שאלות פשוטות ותקבל דף נחיתה מקצועי
          </p>
        </div>

        {/* Chat Messages */}
        <Card className="p-6 mb-4 max-h-[600px] overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-white border-2 border-purple-200'} rounded-2xl p-5 shadow-lg`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-3">
                      <Bot className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-600">סוכן AI חכם</span>
                    </div>
                  )}
                  
                  <p className={`text-lg whitespace-pre-line ${message.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.text}
                  </p>

                  {message.generatedImage && (
                    <div className="mt-4">
                      <img
                        src={message.generatedImage}
                        alt="Generated"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                  )}

                  {/* Options */}
                  {message.options && message.sender === 'ai' && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {message.options.map((option, idx) => (
                        <Button
                          key={idx}
                          onClick={() => {
                            if (message.generatedImage) {
                              if (option.includes('מושלם')) {
                                handleImageApprove();
                              } else {
                                handleImageRegenerate();
                              }
                            } else {
                              handleOptionClick(option);
                            }
                          }}
                          disabled={isGeneratingImage}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGeneratingImage && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                    <span className="text-lg font-medium text-purple-600">
                      יוצר תמונה מדהימה עם AI...
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Invisible element for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Input Area */}
        {currentQuestionIndex >= 0 && 
         questions[currentQuestionIndex]?.type === 'text' && (
          <Card className="p-4">
            <form onSubmit={handleTextSubmit} className="flex gap-3">
              {questions[currentQuestionIndex]?.id === 'heroImage' ? (
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="תאר את התמונה שתרצה... (לדוגמה: 'צוות צעיר עובד על מחשבים במשרד מודרני עם חלונות גדולים')"
                  className="flex-1 text-lg resize-none"
                  rows={3}
                  disabled={isGeneratingImage}
                />
              ) : (
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="הקלד את התשובה שלך..."
                  className="flex-1 text-lg"
                  disabled={isGeneratingImage}
                />
              )}
              <Button 
                type="submit" 
                size="lg" 
                disabled={isGeneratingImage}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {questions[currentQuestionIndex]?.id === 'heroImage' ? (
                  <Image className="w-5 h-5" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
