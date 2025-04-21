// Generate mock data for channels
// In a real application, this would come from an API

export interface Channel {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  duration: number; // in seconds
  description: string;
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

// Коллекция видео по категориям
const videoCollections: Record<string, Array<{ url: string, title: string, description: string, duration: number }>> = {
  "Фильмы": [
    { url: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Слезы Стали", description: "Фантастический фильм о роботах", duration: 734 },
    { url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Большой Заяц Банни", description: "Анимационный фильм о приключениях зайца", duration: 596 },
    { url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Мечты Слонов", description: "Короткометражный фильм о мечтах", duration: 653 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Приключения в джунглях", description: "Приключенческий фильм о выживании", duration: 867 }
  ],
  "Сериалы": [
    { url: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", title: "Детективы", description: "Новый сезон популярного детективного сериала", duration: 592 },
    { url: "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4", title: "Мир будущего", description: "Фантастический сериал о технологиях будущего", duration: 723 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", title: "Хроники улиц", description: "Драматический сериал о жизни в большом городе", duration: 649 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4", title: "История одной семьи", description: "Семейная сага о нескольких поколениях", duration: 512 }
  ],
  "Новости": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", title: "Новости мира", description: "Главные события дня со всего мира", duration: 421 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", title: "Новости России", description: "Основные события в стране", duration: 386 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", title: "Новости экономики", description: "Финансовые новости и аналитика", duration: 342 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", title: "Новости спорта", description: "Спортивные события", duration: 371 }
  ],
  "Спорт": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Футбол. Обзор матчей", description: "Обзор последних футбольных матчей", duration: 532 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Хоккей. Чемпионат мира", description: "Прямые трансляции с чемпионата мира по хоккею", duration: 612 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Теннис. Турнир большого шлема", description: "Финальные матчи теннисного турнира", duration: 583 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Баскетбол. NBA", description: "Лучшие моменты матчей NBA", duration: 496 }
  ],
  "Развлечения": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Вечернее шоу", description: "Развлекательное шоу с приглашенными звездами", duration: 547 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Юмористические передачи", description: "Лучшие юмористические номера и выступления", duration: 521 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Караоке-батл", description: "Музыкальное соревнование непрофессиональных певцов", duration: 489 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Звезды в гостях", description: "Интервью с популярными личностями", duration: 563 }
  ],
  "Детские": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Малышарики", description: "Мультсериал для самых маленьких", duration: 382 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Смешарики", description: "Приключения круглых героев", duration: 415 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Фиксики", description: "Познавательный мультсериал о маленьких человечках", duration: 437 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Три кота", description: "Приключения трех котят", duration: 398 }
  ],
  "Наука": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Горизонты науки", description: "Научно-популярная программа о последних открытиях", duration: 673 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Космос", description: "Документальный сериал о космосе и вселенной", duration: 742 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Мир животных", description: "Документальный сериал о дикой природе", duration: 691 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Технологии будущего", description: "Программа о технологических прорывах", duration: 628 }
  ],
  "Музыка": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Хит-парад", description: "Лучшие музыкальные клипы недели", duration: 542 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Рок-концерт", description: "Живое выступление рок-группы", duration: 617 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Классическая музыка", description: "Концерт классической музыки", duration: 583 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Джаз вечер", description: "Джазовые композиции в исполнении мастеров", duration: 604 }
  ],
  "Аниме": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "Наруто", description: "Приключения молодого ниндзя", duration: 642 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Атака титанов", description: "Фэнтези о борьбе людей с гигантскими существами", duration: 572 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Ван Пис", description: "Приключения пиратов в поисках сокровища", duration: 618 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Моя геройская академия", description: "История мальчика, мечтающего стать супергероем", duration: 589 }
  ],
  "Документальные": [
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", title: "История Земли", description: "Документальный фильм о формировании нашей планеты", duration: 726 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", title: "Подводный мир", description: "Исследование глубин океана", duration: 683 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", title: "Древние цивилизации", description: "История исчезнувших культур", duration: 765 },
    { url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", title: "Выживание в дикой природе", description: "Экстремальное выживание в различных условиях", duration: 704 }
  ]
};

// Функция для получения уникального видео для канала
const getUniqueVideo = (category: string, index: number) => {
  const videos = videoCollections[category] || videoCollections["Фильмы"];
  // Используем модуль для циклического перебора видео в коллекции
  const videoIndex = index % videos.length;
  return videos[videoIndex];
};

const generateMockChannels = (count: number): Channel[] => {
  const channels: Channel[] = [];
  const usedVideos = new Set<string>(); // Для отслеживания уже использованных комбинаций
  
  for (let i = 1; i <= count; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const category = categories[categoryIndex];
    
    // Получаем базовую информацию для канала
    let name = "";
    let baseName = "";
    
    switch (category) {
      case "Фильмы":
        baseName = ["Кино", "Фильм", "Премьера", "Классика"][Math.floor(Math.random() * 4)];
        break;
      case "Сериалы":
        baseName = ["Сериал", "Хит", "Твой", "Лучший"][Math.floor(Math.random() * 4)];
        break;
      case "Новости":
        baseName = ["Новости", "Вести", "24 часа", "Мир"][Math.floor(Math.random() * 4)];
        break;
      case "Спорт":
        baseName = ["Спорт", "Матч", "Футбол", "Чемпионат"][Math.floor(Math.random() * 4)];
        break;
      case "Развлечения":
        baseName = ["Шоу", "Юмор", "Развлечения", "ТВ"][Math.floor(Math.random() * 4)];
        break;
      case "Детские":
        baseName = ["Детский", "Мультики", "Сказка", "Карусель"][Math.floor(Math.random() * 4)];
        break;
      case "Наука":
        baseName = ["Наука", "Открытие", "Знание", "Эксперимент"][Math.floor(Math.random() * 4)];
        break;
      case "Музыка":
        baseName = ["Музыка", "Хиты", "Клипы", "Мелодия"][Math.floor(Math.random() * 4)];
        break;
      case "Аниме":
        baseName = ["Аниме", "Манга", "Япония", "Мультфильм"][Math.floor(Math.random() * 4)];
        break;
      case "Документальные":
        baseName = ["Док", "История", "Расследование", "Факты"][Math.floor(Math.random() * 4)];
        break;
      default:
        baseName = "Канал";
    }
    
    // Получаем уникальное видео для этого канала
    const video = getUniqueVideo(category, i);
    
    // Создаем название канала
    name = `${baseName} ${i}: ${video.title}`;
    
    // Проверяем уникальность комбинации
    let uniqueKey = `${name}-${video.url}`;
    let attempts = 0;
    
    // Если видео уже использовалось, пробуем другое
    while (usedVideos.has(uniqueKey) && attempts < 5) {
      const alternativeVideo = getUniqueVideo(category, i + attempts * 10);
      name = `${baseName} ${i}: ${alternativeVideo.title}`;
      uniqueKey = `${name}-${alternativeVideo.url}`;
      video.url = alternativeVideo.url;
      video.title = alternativeVideo.title;
      video.description = alternativeVideo.description;
      video.duration = alternativeVideo.duration;
      attempts++;
    }
    
    usedVideos.add(uniqueKey);
    
    channels.push({
      id: i,
      name,
      category,
      thumbnail: `/placeholder.svg`, // В реальном приложении здесь были бы миниатюры
      videoUrl: video.url,
      duration: video.duration,
      description: video.description
    });
  }
  
  return channels;
};

// Генерируем 600+ каналов
export const mockChannels = generateMockChannels(620);
