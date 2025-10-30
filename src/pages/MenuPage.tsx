import { useState, useEffect } from "react";
import { ArrowLeft, UtensilsCrossed, Clock, Phone, Wifi, Car, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import hotelLogo from "@/assets/hotel-tolteka-logo.png";

const menuCategories = [
  {
    name: "Room Service",
    icon: UtensilsCrossed,
    items: [
      { name: "Desayuno Continental", price: "€25", time: "30-45 min", description: "Croissants, café, jugos naturales" },
      { name: "Hamburguesa Gourmet", price: "€18", time: "20-30 min", description: "Carne Angus, papas fritas, ensalada" },
      { name: "Salmón a la Plancha", price: "€32", time: "25-35 min", description: "Con verduras al vapor y arroz basmati" },
      { name: "Pasta Carbonara", price: "€16", time: "15-25 min", description: "Pasta fresca con salsa cremosa y panceta" }
    ]
  },
  {
    name: "Servicios de Hotel",
    icon: Phone,
    items: [
      { name: "Servicio de Lavandería", price: "€15", time: "24h", description: "Recogida y entrega en habitación" },
      { name: "Spa & Wellness", price: "€80", time: "60-90 min", description: "Masaje relajante y acceso a sauna" },
      { name: "Transfer al Aeropuerto", price: "€45", time: "En demanda", description: "Servicio de taxi privado" },
      { name: "Cena Romántica", price: "€120", time: "2h", description: "Cena privada para dos en terraza" }
    ]
  },
  {
    name: "Facilidades",
    icon: Wifi,
    items: [
      { name: "Internet WiFi Premium", price: "Gratis", time: "24/7", description: "Conexión de alta velocidad" },
      { name: "Gimnasio", price: "Gratis", time: "06:00-23:00", description: "Equipamiento moderno y personal trainer" },
      { name: "Piscina & Terraza", price: "Gratis", time: "08:00-22:00", description: "Piscina infinity con vista al mar" },
      { name: "Estacionamiento", price: "€20/día", time: "24h", description: "Plaza cubierta con seguridad" }
    ]
  }
];

export default function MenuPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

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
          setSelectedItem(0);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedCategory(prev => Math.min(menuCategories.length - 1, prev + 1));
          setSelectedItem(0);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedItem(prev => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedItem(prev => 
            Math.min(menuCategories[selectedCategory].items.length - 1, prev + 1)
          );
          break;
        case "Enter":
          e.preventDefault();
          console.log(`Ordering: ${menuCategories[selectedCategory].items[selectedItem].name}`);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, selectedCategory, selectedItem]);

  const getServiceIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Room Service": return UtensilsCrossed;
      case "Servicios de Hotel": return Phone;
      case "Facilidades": return Wifi;
      default: return UtensilsCrossed;
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-slate-900"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop)`,
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
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Inicio
          </Button>
          <img 
            src={hotelLogo} 
            alt="Hotel Tolteka" 
            className="h-16 w-auto drop-shadow-lg"
          />
          <div className="w-32" />
        </header>

        {/* Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Categorías</h2>
            <div className="space-y-4">
              {menuCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={index}
                    className={`p-6 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                      selectedCategory === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(index);
                      setSelectedItem(0);
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

          {/* Items */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {menuCategories[selectedCategory].name}
            </h2>
            <div className="space-y-4">
              {menuCategories[selectedCategory].items.map((item, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                    selectedItem === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                  }`}
                  onClick={() => setSelectedItem(index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-2 ${selectedItem === index ? "text-primary" : "text-foreground"}`}>
                        {item.name}
                      </h3>
                      <p className="text-foreground/70 mb-3">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-foreground/60">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-2xl font-bold ${selectedItem === index ? "text-primary" : "text-accent"}`}>
                        {item.price}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Selected Item Details */}
            <Card className="mt-8 p-8 bg-glass backdrop-blur-md border-glass-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Selección actual</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg">
                  <UtensilsCrossed className="w-16 h-16 text-primary" />
                </div>
                <div className="lg:col-span-2">
                  <h4 className="text-2xl font-bold text-foreground mb-2">
                    {menuCategories[selectedCategory].items[selectedItem].name}
                  </h4>
                  <p className="text-foreground/70 mb-4">
                    {menuCategories[selectedCategory].items[selectedItem].description}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Clock className="w-5 h-5" />
                      <span>{menuCategories[selectedCategory].items[selectedItem].time}</span>
                    </div>
                    <span className="text-3xl font-bold text-accent">
                      {menuCategories[selectedCategory].items[selectedItem].price}
                    </span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    Solicitar ahora
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>

        {/* Controls Hint */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-foreground/50">
            ↑↓ Categorías | ←→ Servicios | Enter: Solicitar | Esc: Volver
          </p>
        </footer>
      </div>
    </div>
  );
}