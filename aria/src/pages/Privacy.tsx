import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-6">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">מדיניות פרטיות</h1>
            <p className="text-muted-foreground text-lg">
              עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
            </p>
          </div>

          {/* Content */}
          <Card className="p-8 gradient-card shadow-card border-border/50 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. מבוא</h2>
              <p className="text-muted-foreground leading-relaxed">
                ב-AdSync אנו מחויבים להגן על הפרטיות שלך. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך כאשר אתה משתמש בשירותים שלנו.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. איסוף מידע</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                אנו אוספים מידע בדרכים הבאות:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>מידע שאתה מספק לנו ישירות (שם מותג, אתר, פרטי קמפיין)</li>
                <li>מידע טכני (כתובת IP, סוג דפדפן, מערכת הפעלה)</li>
                <li>מידע שימוש (דפים שביקרת, זמן שימוש, תכונות בשימוש)</li>
                <li>עוגיות ומזהים דומים לשיפור חוויית השימוש</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. שימוש במידע</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                אנו משתמשים במידע שנאסף עבור:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>יצירת קמפיינים פרסומיים מותאמים אישית</li>
                <li>שיפור ופיתוח השירותים שלנו</li>
                <li>תמיכה טכנית ושירות לקוחות</li>
                <li>ניתוח ביצועים ותובנות עסקיות</li>
                <li>שליחת עדכונים ותקשורת שיווקית (בכפוף להסכמתך)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. שיתוף מידע</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                אנו לא מוכרים את המידע האישי שלך. אנו עשויים לשתף מידע עם:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>ספקי שירות חיצוניים (אחסון ענן, ניתוח נתונים)</li>
                <li>פלטפורמות פרסום (Meta, Google) לפי בקשתך</li>
                <li>רשויות חוק במקרה של דרישה חוקית</li>
                <li>צדדים שלישיים בעסקאות מיזוג או רכישה</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. אבטחת מידע</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו משתמשים באמצעי אבטחה מתקדמים כולל הצפנה, גיבויים קבועים, ובקרות גישה מחמירות כדי להגן על המידע שלך. עם זאת, אף שיטת העברה דרך האינטרנט אינה מאובטחת ב-100%.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. הזכויות שלך</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                לפי חוקי הגנת הפרטיות, יש לך את הזכויות הבאות:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>גישה למידע האישי שאנו מחזיקים עליך</li>
                <li>תיקון מידע שגוי או לא מדויק</li>
                <li>מחיקת המידע האישי שלך</li>
                <li>הגבלת עיבוד המידע שלך</li>
                <li>העברת המידע שלך לספק אחר</li>
                <li>התנגדות לעיבוד מידע למטרות שיווק</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. עוגיות</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש, לנתח תנועה באתר ולהתאים תוכן. אתה יכול לשלוט בהגדרות העוגיות דרך הדפדפן שלך, אך זה עשוי להשפיע על פונקציונליות האתר.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. שינויים במדיניות</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. נודיע לך על שינויים מהותיים דרך האתר או בדוא"ל. המשך השימוש בשירותים לאחר השינויים מהווה הסכמה למדיניות המעודכנת.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. יצירת קשר</h2>
              <p className="text-muted-foreground leading-relaxed">
                לשאלות או בקשות בנוגע למדיניות פרטיות זו, אנא צור קשר:
              </p>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>דוא"ל:</strong> privacy@adsync.com<br />
                  <strong>כתובת:</strong> רח' הטכנולוגיה 1, תל אביב, ישראל<br />
                  <strong>טלפון:</strong> 03-1234567
                </p>
              </div>
            </section>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
