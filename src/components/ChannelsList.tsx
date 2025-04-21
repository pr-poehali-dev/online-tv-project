import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Channel {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
}

interface ChannelsListProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  selectedChannelId: number | null;
}

const ChannelsList = ({ channels, onSelectChannel, selectedChannelId }: ChannelsListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get unique categories
  const categories = ['Все', ...Array.from(new Set(channels.map(channel => channel.category)))];
  
  // Filter channels based on search and category
  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || selectedCategory === 'Все' || channel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск каналов..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex overflow-x-auto py-2 px-4 border-b">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === 'Все' ? null : category)}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap mr-2 transition-colors ${
              (category === 'Все' && selectedCategory === null) || category === selectedCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => onSelectChannel(channel)}
                className={`w-full flex items-center p-3 rounded-md transition-colors mb-1 hover:bg-accent ${
                  selectedChannelId === channel.id ? 'bg-accent' : ''
                }`}
              >
                <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0 mr-3">
                  <img 
                    src={channel.thumbnail || "/placeholder.svg"} 
                    alt={channel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium">{channel.name}</div>
                  <div className="text-xs text-muted-foreground">{channel.category}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              Каналы не найдены
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChannelsList;
