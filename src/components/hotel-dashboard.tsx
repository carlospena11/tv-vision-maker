import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tv, Calendar, UtensilsCrossed, Headphones } from "lucide-react";
import { NavigationIcon } from "@/components/ui/navigation-icon";
import hotelBackground from "@/assets/hotel-background.jpg";

interface TimeState {
  time: string;
  date: string;
  greeting: string;
}

const services = [
  { icon: Tv, label: "IPTV", id: "iptv" },
  { icon: Calendar, label: "Movie", id: "movie" },
  { icon: UtensilsCrossed, label: "Menu", id: "menu" },
  { icon: Headphones, label: "Music", id: "music" },
];

export default function HotelDashboard() {
  const navigate = useNavigate();
  const [timeState, setTimeState] = useState<TimeState>({
    time: "",
    date: "",
    greeting: ""
  });
  const [focusedService, setFocusedService] = useState(0);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
      });
      
      const date = now.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const hour = now.getHours();
      let greeting = "Buenos días";
      if (hour >= 12 && hour < 18) {
        greeting = "Buenas tardes";
      } else if (hour >= 18) {
        greeting = "Buenas noches";
      }

      setTimeState({ time, date, greeting });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation for TV
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setFocusedService(prev => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setFocusedService(prev => Math.min(services.length - 1, prev + 1));
          break;
        case "Enter":
          e.preventDefault();
          handleServiceClick(services[focusedService].id);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedService]);

  const handleServiceClick = (serviceId: string) => {
    console.log(`Opening ${serviceId} service`);
    switch (serviceId) {
      case "iptv":
        navigate("/iptv");
        break;
      case "movie":
        navigate("/movie");
        break;
      case "menu":
        navigate("/menu");
        break;
      case "music":
        navigate("/music");
        break;
      default:
        console.log(`Service ${serviceId} not implemented yet`);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-background"
      style={{
        backgroundImage: `url(${hotelBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-start p-8">
          {/* Time and Date */}
          <div className="text-left">
            <div className="text-5xl font-bold text-foreground mb-2 font-mono">
              {timeState.time}
            </div>
            <div className="text-lg text-foreground/80 capitalize">
              {timeState.date}
            </div>
          </div>

          {/* Weather and Language */}
          <div className="text-right">
            <div className="text-2xl font-semibold text-foreground mb-1">
              23° / 21° C
            </div>
            <div className="text-sm text-foreground/70">
              ES | EN
            </div>
            <div className="text-sm text-foreground/70 mt-1">
              RM 1
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8">
          {/* Hotel Logo */}
          <div className="mb-8">
            <div className="text-lg text-foreground/80 font-medium">
              Mi Hotel Logo
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-bold text-foreground mb-4">
              {timeState.greeting}
            </h1>
            <p className="text-2xl text-foreground/80">
              Le deseamos una agradable estancia
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex gap-8">
            {services.map((service, index) => (
              <NavigationIcon
                key={service.id}
                icon={service.icon}
                label={service.label}
                focused={focusedService === index}
                onClick={() => {
                  setFocusedService(index);
                  handleServiceClick(service.id);
                }}
              />
            ))}
          </nav>
        </main>

        {/* Footer Hint */}
        <footer className="p-8 text-center">
          <p className="text-sm text-foreground/50">
            Use las flechas ← → para navegar y Enter para seleccionar
          </p>
        </footer>
      </div>
    </div>
  );
}