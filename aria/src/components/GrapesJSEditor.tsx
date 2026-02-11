import { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gjsPresetWebpage from 'grapesjs-preset-webpage';

interface GrapesJSEditorProps {
  onSave?: (html: string, css: string) => void;
  initialHtml?: string;
  initialCss?: string;
}

export default function GrapesJSEditor({ onSave, initialHtml = '', initialCss = '' }: GrapesJSEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const grapesjsRef = useRef<any>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize GrapesJS
    const editor = grapesjs.init({
      container: editorRef.current,
      height: '100vh',
      width: '100%',
      storageManager: false,
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        [gjsPresetWebpage]: {
          blocksBasicOpts: {
            blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video', 'map'],
            flexGrid: 1,
          },
          blocks: ['link-block', 'quote', 'text-basic'],
          modalImportTitle: 'Import',
          modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
          modalImportContent: (editor: any) => editor.getHtml() + '<style>' + editor.getCss() + '</style>',
          importPlaceholder: '<table class="table"><tr><td class="cell">Content here</td></tr></table>',
        },
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap',
        ],
        scripts: [],
      },
      deviceManager: {
        devices: [
          {
            name: 'Desktop',
            width: '',
          },
          {
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px',
          },
        ],
      },
      panels: {
        defaults: [
          {
            id: 'basic-actions',
            el: '.panel__basic-actions',
            buttons: [
              {
                id: 'visibility',
                active: true,
                className: 'btn-toggle-borders',
                label: '<i class="fa fa-clone"></i>',
                command: 'sw-visibility',
              },
              {
                id: 'export',
                className: 'btn-open-export',
                label: '<i class="fa fa-code"></i>',
                command: 'export-template',
                context: 'export-template',
              },
              {
                id: 'show-json',
                className: 'btn-show-json',
                label: '<i class="fa fa-download"></i>',
                context: 'show-json',
                command(editor: any) {
                  const html = editor.getHtml();
                  const css = editor.getCss();
                  
                  // Create downloadable file
                  const fullHtml = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>דף נחיתה</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body { 
      margin: 0; 
      font-family: 'Heebo', sans-serif; 
      direction: rtl;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
</body>
</html>
                  `;
                  
                  const blob = new Blob([fullHtml], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'landing-page.html';
                  a.click();
                  URL.revokeObjectURL(url);
                  
                  if (onSave) {
                    onSave(html, css);
                  }
                },
              },
            ],
          },
          {
            id: 'panel-devices',
            el: '.panel__devices',
            buttons: [
              {
                id: 'device-desktop',
                label: '<i class="fa fa-desktop"></i>',
                command: 'set-device-desktop',
                active: true,
                togglable: false,
              },
              {
                id: 'device-tablet',
                label: '<i class="fa fa-tablet"></i>',
                command: 'set-device-tablet',
                togglable: false,
              },
              {
                id: 'device-mobile',
                label: '<i class="fa fa-mobile"></i>',
                command: 'set-device-mobile',
                togglable: false,
              },
            ],
          },
        ],
      },
    });

    // Add Hebrew styles
    editor.addComponents(`
      <div style="text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; direction: rtl; font-family: 'Heebo', sans-serif;">
        <h1 style="font-size: 48px; margin-bottom: 20px; font-weight: 700;">ברוכים הבאים לעסק שלי</h1>
        <p style="font-size: 24px; margin-bottom: 30px;">הפתרון המושלם לצרכים שלכם</p>
        <a href="#" style="display: inline-block; padding: 15px 40px; background: white; color: #667eea; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 18px;">צור קשר עכשיו</a>
      </div>
      
      <div style="padding: 60px 20px; text-align: center; direction: rtl; font-family: 'Heebo', sans-serif;">
        <h2 style="font-size: 36px; margin-bottom: 40px; color: #333; font-weight: 600;">למה לבחור בנו?</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
          <div style="padding: 30px; background: #f8f9fa; border-radius: 10px;">
            <div style="font-size: 48px; margin-bottom: 15px; font-weight: bold; color: #7c3aed;">●</div>
            <h3 style="font-size: 24px; margin-bottom: 10px; color: #333; font-weight: 600;">מהיר ויעיל</h3>
            <p style="color: #666; line-height: 1.6;">תוצאות מיידיות שחוסכות לך זמן</p>
          </div>
          <div style="padding: 30px; background: #f8f9fa; border-radius: 10px;">
            <div style="font-size: 48px; margin-bottom: 15px; font-weight: bold; color: #7c3aed;">✓</div>
            <h3 style="font-size: 24px; margin-bottom: 10px; color: #333; font-weight: 600;">מדויק ומקצועי</h3>
            <p style="color: #666; line-height: 1.6;">פתרונות מותאמים אישית לצרכים שלך</p>
          </div>
          <div style="padding: 30px; background: #f8f9fa; border-radius: 10px;">
            <div style="font-size: 48px; margin-bottom: 15px;">💪</div>
            <h3 style="font-size: 24px; margin-bottom: 10px; color: #333; font-weight: 600;">אמין ובטוח</h3>
            <p style="color: #666; line-height: 1.6;">השירות הכי מהימן בשוק</p>
          </div>
        </div>
      </div>

      <div style="text-align: center; padding: 80px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; direction: rtl; font-family: 'Heebo', sans-serif;">
        <h2 style="font-size: 42px; margin-bottom: 20px; font-weight: 700;">מוכנים להתחיל?</h2>
        <p style="font-size: 20px; margin-bottom: 30px;">הצטרפו אלינו עוד היום וגלו את ההבדל!</p>
        <a href="#" style="display: inline-block; padding: 15px 40px; background: white; color: #667eea; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 18px;">צור קשר עכשיו</a>
      </div>
    `);

    // Set initial content if provided
    if (initialHtml) {
      editor.setComponents(initialHtml);
    }
    if (initialCss) {
      editor.setStyle(initialCss);
    }

    // Commands
    editor.Commands.add('set-device-desktop', {
      run: (ed: any) => ed.setDevice('Desktop'),
    });
    editor.Commands.add('set-device-tablet', {
      run: (ed: any) => ed.setDevice('Tablet'),
    });
    editor.Commands.add('set-device-mobile', {
      run: (ed: any) => ed.setDevice('Mobile'),
    });

    grapesjsRef.current = editor;

    return () => {
      editor.destroy();
    };
  }, [initialHtml, initialCss, onSave]);

  return (
    <div className="w-full h-screen">
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
      </div>
      <div ref={editorRef} id="gjs"></div>
    </div>
  );
}

