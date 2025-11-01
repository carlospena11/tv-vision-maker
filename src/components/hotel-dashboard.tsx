import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Film, Utensils, Music, Plane } from "lucide-react";
import { NavigationIcon } from "@/components/ui/navigation-icon";
import hotelLogo from "@/assets/hotel-tolteka-logo.png";

interface TimeState {
  time: string;
  date: string;
  greeting: string;
}

const services = [
  { icon: Gift, label: "Promociones", id: "promotions" },
  { icon: Film, label: "Movie", id: "movie" },
  { icon: Utensils, label: "Servicios", id: "menu" },
  { icon: Music, label: "Music", id: "music" },
  { icon: Plane, label: "Vuelos", id: "flights" },
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
      case "promotions":
        navigate("/promotions");
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
      case "flights":
        navigate("/flights");
        break;
      default:
        console.log(`Service ${serviceId} not implemented yet`);
    }
  };

  return (
    <div 
      className="w-[1920px] h-[1080px] relative overflow-hidden bg-slate-900"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-start px-16 pt-12 pb-8">
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
        <main className="flex-1 flex flex-col items-center justify-center px-16">
          {/* Hotel Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src={hotelLogo} 
              alt="Hotel Tolteka" 
              width="320"
              height="80"
              className="w-80 drop-shadow-2xl brightness-0 invert mx-auto"
            />
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-16">
            <h1 className="text-8xl font-bold text-white mb-4 drop-shadow-lg">
              {timeState.greeting}
            </h1>
            <p className="text-2xl text-white/90 drop-shadow-md">
              Le deseamos una agradable estancia
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex gap-12 justify-center">
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
        <footer className="px-16 pb-12 text-center">
          <p className="text-base text-foreground/60">
            Use las flechas ← → para navegar y Enter para seleccionar
          </p>
        </footer>
      </div>
    </div>
  );
}