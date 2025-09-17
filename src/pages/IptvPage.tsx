import { useState, useEffect } from "react";
import { ArrowLeft, Tv2, Radio, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import hotelBackground from "@/assets/hotel-background.jpg";

const channelCategories = [
  {
    name: "Noticias",
    icon: Globe,
    channels: ["CNN Internacional", "BBC World", "Euronews", "Al Jazeera", "France 24"]
  },
  {
    name: "Entretenimiento", 
    icon: Tv2,
    channels: ["HBO", "Netflix Originals", "Discovery", "National Geographic", "Comedy Central"]
  },
  {
    name: "Deportes",
    icon: Radio,
    channels: ["ESPN", "Fox Sports", "Eurosport", "Sky Sports", "ESPN 2"]
  }
];

export default function IptvPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
        case "Backspace":
          navigate("/");
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedCategory(prev => Math.max(0, prev - 1));
          setSelectedChannel(0);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedCategory(prev => Math.min(channelCategories.length - 1, prev + 1));
          setSelectedChannel(0);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedChannel(prev => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedChannel(prev => 
            Math.min(channelCategories[selectedCategory].channels.length - 1, prev + 1)
          );
          break;
        case "Enter":
          e.preventDefault();
          console.log(`Playing: ${channelCategories[selectedCategory].channels[selectedChannel]}`);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, selectedCategory, selectedChannel]);

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
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      <div className="relative z-10 min-h-screen p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-glass backdrop-blur-md border-glass-border hover:bg-glass"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Televisión IPTV</h1>
          <div className="w-32" />
        </header>

        {/* Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Categorías</h2>
            <div className="space-y-4">
              {channelCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={index}
                    className={`p-6 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                      selectedCategory === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(index);
                      setSelectedChannel(0);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className={`w-8 h-8 ${selectedCategory === index ? "text-primary" : "text-foreground/80"}`} />
                      <span className={`text-lg font-medium ${selectedCategory === index ? "text-primary" : "text-foreground"}`}>
                        {category.name}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Channels */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Canales - {channelCategories[selectedCategory].name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channelCategories[selectedCategory].channels.map((channel, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                    selectedChannel === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                  }`}
                  onClick={() => setSelectedChannel(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-medium ${selectedChannel === index ? "text-primary" : "text-foreground"}`}>
                      {channel}
                    </span>
                    <Tv2 className={`w-6 h-6 ${selectedChannel === index ? "text-primary" : "text-foreground/60"}`} />
                  </div>
                </Card>
              ))}
            </div>

            {/* Now Playing */}
            <Card className="mt-8 p-8 bg-glass backdrop-blur-md border-glass-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Reproduciendo ahora</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Tv2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {channelCategories[selectedCategory].channels[selectedChannel]}
                  </p>
                  <p className="text-foreground/70">
                    {channelCategories[selectedCategory].name}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </main>

        {/* Controls Hint */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-foreground/50">
            ↑↓ Categorías | ←→ Canales | Enter: Reproducir | Esc: Volver
          </p>
        </footer>
      </div>
    </div>
  );
}