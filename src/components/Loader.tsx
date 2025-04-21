import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader = ({ onLoadComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + Math.random() * 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowLoader(false);
              onLoadComplete();
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 200);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-full h-full pulse-animation text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C2 4.89543 2.89543 4 4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 9V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M9 12H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle 
                className="animate-ripple" 
                cx="12" 
                cy="12" 
                r="8" 
                stroke="currentColor" 
                strokeWidth="1" 
                strokeOpacity="0.5" 
                fill="none"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 slide-up-animation">ОНЛАЙН ТВ</h1>
        <p className="text-muted-foreground mb-6 opacity-0 slide-up-animation" style={{ animationDelay: '0.3s' }}>
          Загружаем более 600 каналов для вас
        </p>
        
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-sm text-muted-foreground fade-in-animation">
          {progress.toFixed(0)}% загружено
        </div>
      </div>
    </div>
  );
};

export default Loader;
