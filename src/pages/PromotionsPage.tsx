import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import hotelLogo from "@/assets/hotel-tolteka-logo.png";

export default function PromotionsPage() {
  const navigate = useNavigate();
  const [focusedButton, setFocusedButton] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          navigate("/");
          break;
        case "Enter":
          e.preventDefault();
          if (focusedButton === 0) {
            navigate("/");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedButton, navigate]);

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Inicio
          </Button>
          <img 
            src={hotelLogo} 
            alt="Hotel Tolteka" 
            className="h-16 w-auto drop-shadow-lg"
          />
          <div className="w-32" />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg">
              Promociones
            </h1>
            <p className="text-2xl text-white/90 mb-12 drop-shadow-md">
              Descubre nuestras ofertas especiales
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Spa & Wellness</h3>
                <p className="text-white/80 mb-4">20% de descuento en tratamientos de spa</p>
                <p className="text-sm text-white/60">Válido hasta fin de mes</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Restaurante</h3>
                <p className="text-white/80 mb-4">Cena romántica para dos personas</p>
                <p className="text-sm text-white/60">Incluye copa de champagne</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Tours</h3>
                <p className="text-white/80 mb-4">Excursión guiada por la ciudad</p>
                <p className="text-sm text-white/60">Salidas diarias a las 10:00</p>
              </div>
              
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Gimnasio</h3>
                <p className="text-white/80 mb-4">Acceso completo a nuestras instalaciones</p>
                <p className="text-sm text-white/60">Abierto 24/7 para huéspedes</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-8 text-center">
          <p className="text-sm text-white/50">
            Presione Escape para volver al menú principal
          </p>
        </footer>
      </div>
    </div>
  );
}
