import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import Loader from '@/components/Loader';
import ChannelsList from '@/components/ChannelsList';
import VideoPlayer from '@/components/VideoPlayer';
import SettingsMenu from '@/components/SettingsMenu';
import { mockChannels } from '@/lib/data';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<typeof mockChannels[0] | null>(null);
  const { isDark, setTheme } = useTheme();
  
  const handleLoadComplete = () => {
    setIsLoading(false);
  };
  
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  useEffect(() => {
    document.title = "ОНЛАЙН ТВ - Более 600 каналов";
  }, []);
  
  if (isLoading) {
    return <Loader onLoadComplete={handleLoadComplete} />;
  }
  
  return (
    <div className="h-screen flex flex-col">
      <header className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">ОНЛАЙН ТВ</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Более 600 каналов в HD качестве
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex overflow-hidden">
        <div className="w-[320px] h-full">
          <ChannelsList 
            channels={mockChannels} 
            onSelectChannel={setSelectedChannel} 
            selectedChannelId={selectedChannel?.id ?? null}
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="w-full h-full">
            <VideoPlayer channel={selectedChannel} />
          </div>
        </div>
      </main>
      
      <SettingsMenu isDark={isDark} toggleTheme={toggleTheme} />
    </div>
  );
};

export default Index;
