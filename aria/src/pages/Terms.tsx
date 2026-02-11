import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-6">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">תנאי שימוש</h1>
            <p className="text-muted-foreground text-lg">
              עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}
            </p>
          </div>

          {/* Content */}
          <Card className="p-8 gradient-card shadow-card border-border/50 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. קבלת התנאים</h2>
              <p className="text-muted-foreground leading-relaxed">
                ברוכים הבאים ל-AdSync. על ידי גישה לאתר זה ושימוש בשירותים שלנו, אתה מסכים לתנאי שימוש אלה. אם אינך מסכים לתנאים אלה, אנא הימנע משימוש בשירותים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. תיאור השירות</h2>
              <p className="text-muted-foreground leading-relaxed">
                AdSync מספקת פלטפורמה מבוססת AI ליצירת קמפיינים פרסומיים מותאמים אישית עבור פלטפורמות שונות כולל Meta, Google, Taboola ו-Outbrain. השירות כולל יצירת תוכן, עיצוב ויזואלי, והמלצות אופטימיזציה.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. רישיון שימוש</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                אנו מעניקים לך רישיון מוגבל, לא בלעדי, בלתי ניתן להעברה לשימוש בשירותים. אתה מסכים:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>לא להעתיק, לשנות או להפיץ את תוכנת השירות</li>
                <li>לא להשתמש בשירות למטרות בלתי חוקיות או לא מורשות</li>
                <li>לא לנסות לגשת למערכות השירות באופן בלתי מורשה</li>
                <li>לא להשתמש בשירות ליצירת תוכן מטעה או מזיק</li>
                <li>לציית לכל החוקים והתקנות החלים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. חשבון משתמש</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                בעת יצירת חשבון, אתה מתחייב:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>לספק מידע מדויק ומעודכן</li>
                <li>לשמור על סודיות פרטי ההתחברות שלך</li>
                <li>להודיע לנו מיד על כל שימוש לא מורשה בחשבונך</li>
                <li>לקחת אחריות מלאה על כל פעילות בחשבונך</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. תשלום ומחירים</h2>
              <p className="text-muted-foreground leading-relaxed">
                השירות מוצע במודל תשלום לפי שימוש. המחירים מפורסמים באתר ועשויים להשתנות בהודעה מראש. אתה מסכים לשלם את כל החיובים בזמן, כולל מסים החלים. אי תשלום עשוי להוביל להשעיית או סגירת החשבון.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. קניין רוחני</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                זכויות הקניין הרוחני מתחלקות כדלקמן:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li><strong>תוכן שלך:</strong> אתה שומר על כל הזכויות לתוכן שאתה מעלה או יוצר</li>
                <li><strong>תוכן שנוצר:</strong> תוכן שנוצר על ידי המערכת שייך לך ברישיון מלא</li>
                <li><strong>פלטפורמת AdSync:</strong> כל הזכויות בפלטפורמה, קוד ומערכות שייכים ל-AdSync</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. אחריות והגבלות</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                אתה מבין ומסכים ש:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mr-6">
                <li>השירות מסופק "כפי שהוא" ללא אחריות מפורשת או משתמעת</li>
                <li>איננו אחראים לתוצאות הקמפיינים או ביצועיהם</li>
                <li>איננו אחראים לנזקים ישירים או עקיפים משימוש בשירות</li>
                <li>אחריותנו מוגבלת לסכום ששילמת עבור השירות ב-12 החודשים האחרונים</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. שיפוי</h2>
              <p className="text-muted-foreground leading-relaxed">
                אתה מסכים לשפות את AdSync, עובדיה ושותפיה מפני כל תביעה, נזק, הפסד או הוצאה הנובעים משימושך בשירות, הפרת תנאים אלה, או הפרת זכויות צד שלישי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. סיום שירות</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו שומרים לעצמנו את הזכות להשעות או לסיים את גישתך לשירות בכל עת, ללא הודעה מוקדמת, במקרה של הפרת תנאים אלה, שימוש לרעה, או מסיבות אחרות לפי שיקול דעתנו הבלעדי.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. שינויים בתנאים</h2>
              <p className="text-muted-foreground leading-relaxed">
                אנו רשאים לעדכן תנאי שימוש אלה מעת לעת. נודיע על שינויים מהותיים באתר או בדוא"ל. המשך השימוש בשירות לאחר שינויים מהווה הסכמה לתנאים המעודכנים.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. דין וסמכות שיפוט</h2>
              <p className="text-muted-foreground leading-relaxed">
                תנאים אלה כפופים לדיני מדינת ישראל. כל מחלוקת תידון אך ורק בבתי המשפט המוסמכים בתל אביב, ישראל.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. יצירת קשר</h2>
              <p className="text-muted-foreground leading-relaxed">
                לשאלות או בקשות בנוגע לתנאי שימוש אלה, אנא צור קשר:
              </p>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>דוא"ל:</strong> legal@adsync.com<br />
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
