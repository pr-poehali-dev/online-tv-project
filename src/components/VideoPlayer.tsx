import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, 
  SkipBack, SkipForward, Settings, 
} from 'lucide-react';

interface Channel {
  id: number;
  name: string;
  category: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  channel: Channel | null;
}

const VideoPlayer = ({ channel }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  
  // Mock video URL (in a real app, this would come from your backend)
  const videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    if (videoRef.current) {
      videoRef.current.volume = volumeValue;
      setVolume(volumeValue);
      setIsMuted(volumeValue === 0);
    }
  };
  
  // Handle seeking
  const handleSeek = (newTime: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime[0];
    }
  };
  
  // Улучшенная функция переключения полноэкранного режима
  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    
    try {
      // Проверяем, находимся ли мы в полноэкранном режиме
      const isInFullscreen = Boolean(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).mozFullScreenElement || 
        (document as any).msFullscreenElement
      );
      
      if (!isInFullscreen) {
        // Пробуем разные методы для вызова полноэкранного режима
        if (playerRef.current.requestFullscreen) {
          playerRef.current.requestFullscreen();
        } else if ((playerRef.current as any).webkitRequestFullscreen) {
          (playerRef.current as any).webkitRequestFullscreen();
        } else if ((playerRef.current as any).mozRequestFullScreen) {
          (playerRef.current as any).mozRequestFullScreen();
        } else if ((playerRef.current as any).msRequestFullscreen) {
          (playerRef.current as any).msRequestFullscreen();
        } else {
          // Запасной вариант, если API полноэкранного режима не доступно
          console.log("Fullscreen API не поддерживается в этом браузере");
          
          // Используем CSS для имитации полноэкранного режима
          playerRef.current.classList.add("fixed", "inset-0", "z-50", "bg-black");
          document.body.classList.add("overflow-hidden");
          setIsFullscreen(true);
        }
      } else {
        // Выход из полноэкранного режима
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
        } else {
          // Запасной вариант для CSS-имитации
          playerRef.current.classList.remove("fixed", "inset-0", "z-50", "bg-black");
          document.body.classList.remove("overflow-hidden");
          setIsFullscreen(false);
        }
      }
    } catch (err) {
      console.error(`Ошибка при переключении полноэкранного режима: ${err}`);
      
      // Запасной вариант, если все методы полноэкранного режима не сработали
      if (playerRef.current) {
        if (isFullscreen) {
          playerRef.current.classList.remove("fixed", "inset-0", "z-50", "bg-black");
          document.body.classList.remove("overflow-hidden");
        } else {
          playerRef.current.classList.add("fixed", "inset-0", "z-50", "bg-black");
          document.body.classList.add("overflow-hidden");
        }
        setIsFullscreen(!isFullscreen);
      }
    }
  };
  
  // Forward/rewind
  const seekForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
    }
  };
  
  const seekBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
    }
  };
  
  // Format time (seconds -> MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle mouse movement to show/hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  // Update time
  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
    };
    
    const handleDurationChange = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('durationchange', handleDurationChange);
      videoElement.addEventListener('ended', handleEnded);
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('durationchange', handleDurationChange);
        videoElement.removeEventListener('ended', handleEnded);
      }
      
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = Boolean(
        document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).mozFullScreenElement || 
        (document as any).msFullscreenElement
      );
      
      setIsFullscreen(isInFullscreen);
      
      // Если мы вышли из полноэкранного режима через CSS-имитацию
      if (!isInFullscreen && playerRef.current?.classList.contains("fixed")) {
        playerRef.current.classList.remove("fixed", "inset-0", "z-50", "bg-black");
        document.body.classList.remove("overflow-hidden");
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);
  
  // При размонтировании компонента убедимся, что мы выходим из полноэкранного режима
  useEffect(() => {
    return () => {
      if (isFullscreen) {
        try {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
          } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
          } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
          }
          
          // Если использовали CSS-имитацию
          if (playerRef.current?.classList.contains("fixed")) {
            playerRef.current.classList.remove("fixed", "inset-0", "z-50", "bg-black");
            document.body.classList.remove("overflow-hidden");
          }
        } catch (err) {
          console.error("Ошибка при выходе из полноэкранного режима:", err);
        }
      }
    };
  }, [isFullscreen]);
  
  if (!channel) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-card rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-4">📺</div>
          <h2 className="text-xl font-medium mb-2">Выберите канал</h2>
          <p className="text-muted-foreground">Более 600 каналов доступны для просмотра</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={playerRef}
      className="relative w-full h-full bg-black rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoUrl}
        poster={channel.thumbnail || "/placeholder.svg"}
        onClick={togglePlay}
        playsInline
        allowFullScreen
      />
      
      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button 
            onClick={togglePlay}
            className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary/100 transition-colors"
          >
            <Play className="h-8 w-8 text-white" />
          </button>
        </div>
      )}
      
      {/* Controls overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Title */}
        <div className="mb-4">
          <h3 className="text-white font-medium">{channel.name}</h3>
          <p className="text-white/70 text-sm">{channel.category}</p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-white/70 text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={seekBackward}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={seekForward}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 ml-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
