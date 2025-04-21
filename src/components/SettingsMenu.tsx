import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SettingsMenuProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const SettingsMenu = ({ isDark, toggleTheme }: SettingsMenuProps) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed bottom-4 left-4 z-10 bg-secondary shadow-md hover:bg-secondary/90"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Настройки</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="theme">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="theme">Внешний вид</TabsTrigger>
              <TabsTrigger value="support">Поддержка</TabsTrigger>
            </TabsList>
            <TabsContent value="theme" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-mode">Темный режим</Label>
                  <div className="text-sm text-muted-foreground">
                    Переключение между светлой и темной темой
                  </div>
                </div>
                <Switch 
                  id="theme-mode"
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </TabsContent>
            <TabsContent value="support" className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Если у вас возникли вопросы или проблемы с сервисом, 
                наша команда поддержки всегда готова помочь.
              </p>
              <Button 
                className="w-full" 
                onClick={() => setIsContactDialogOpen(true)}
              >
                Поддержка
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Связаться с поддержкой</DialogTitle>
          </DialogHeader>
          <Alert>
            <AlertDescription>
              Чтобы связаться с поддержкой, напишите нам в Telegram - @mPho0enix
            </AlertDescription>
          </Alert>
          <div className="flex justify-end">
            <Button onClick={() => setIsContactDialogOpen(false)}>Закрыть</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsMenu;
