import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Download, FileText, Table, Mail, Image } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from '@/hooks/use-toast';

export const ExportMenu = () => {
  const { t } = useTranslation();

  const handleExport = (type: string) => {
    toast({ 
      title: `${type} export coming soon!`,
      description: 'This feature will be available in the next update.'
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {t('generate.export')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('PDF')}>
          <FileText className="h-4 w-4 mr-2" />
          {t('generate.exportPdf')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('Excel')}>
          <Table className="h-4 w-4 mr-2" />
          {t('generate.exportExcel')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('Email')}>
          <Mail className="h-4 w-4 mr-2" />
          {t('generate.exportEmail')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('Images')}>
          <Image className="h-4 w-4 mr-2" />
          {t('generate.exportImages')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
