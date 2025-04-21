// Generate mock data for channels
// In a real application, this would come from an API

export interface Channel {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
}

const categories = [
  "Фильмы",
  "Сериалы",
  "Новости",
  "Спорт",
  "Развлечения",
  "Детские",
  "Наука",
  "Музыка",
  "Аниме",
  "Документальные"
];

const generateMockChannels = (count: number): Channel[] => {
  const channels: Channel[] = [];
  
  for (let i = 1; i <= count; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    
    let name = "";
    switch (category) {
      case "Фильмы":
        name = `${["Кино", "Фильм", "Премьера", "Классика"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Сериалы":
        name = `${["Сериал", "Хит", "Твой", "Лучший"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Новости":
        name = `${["Новости", "Вести", "24 часа", "Мир"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Спорт":
        name = `${["Спорт", "Матч", "Футбол", "Чемпионат"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Развлечения":
        name = `${["Шоу", "Юмор", "Развлечения", "ТВ"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Детские":
        name = `${["Детский", "Мультики", "Сказка", "Карусель"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Наука":
        name = `${["Наука", "Открытие", "Знание", "Эксперимент"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Музыка":
        name = `${["Музыка", "Хиты", "Клипы", "Мелодия"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Аниме":
        name = `${["Аниме", "Манга", "Япония", "Мультфильм"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      case "Документальные":
        name = `${["Док", "История", "Расследование", "Факты"][Math.floor(Math.random() * 4)]} ${i}`;
        break;
      default:
        name = `Канал ${i}`;
    }
    
    channels.push({
      id: i,
      name,
      category,
      thumbnail: `/placeholder.svg` // In a real app, use actual thumbnails
    });
  }
  
  return channels;
};

// Generate 600+ channels
export const mockChannels = generateMockChannels(620);
