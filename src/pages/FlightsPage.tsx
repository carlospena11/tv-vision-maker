import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import hotelBackground from "@/assets/hotel-background.jpg";

type FlightType = "departures" | "arrivals";

export default function FlightsPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [flightType, setFlightType] = useState<FlightType>("departures");
  const [focusedButton, setFocusedButton] = useState<"back" | "arrivals" | "departures">("back");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-SV", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          navigate("/");
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (focusedButton === "departures") setFocusedButton("arrivals");
          else if (focusedButton === "arrivals") setFocusedButton("back");
          break;
        case "ArrowRight":
          e.preventDefault();
          if (focusedButton === "back") setFocusedButton("arrivals");
          else if (focusedButton === "arrivals") setFocusedButton("departures");
          break;
        case "Enter":
          e.preventDefault();
          if (focusedButton === "back") navigate("/");
          else if (focusedButton === "arrivals") setFlightType("arrivals");
          else if (focusedButton === "departures") setFlightType("departures");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, focusedButton]);

  const iframeUrl = `https://www.avionio.com/widget/es/SAL/${flightType}`;

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${hotelBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-overlay" />

      <div className="relative z-10 min-h-screen flex flex-col p-6">
        {/* Header con estilo tablero aeropuerto */}
        <div className="bg-gradient-to-r from-accent to-accent/90 rounded-xl p-4 mb-6 shadow-elegant">
          <div className="flex items-center justify-between text-background">
            <div className="flex items-center gap-3">
              <Plane className="w-6 h-6" />
              <h1 className="text-2xl font-bold uppercase tracking-wider font-mono">
                Vuelos • San Salvador (SAL)
              </h1>
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums">
              {currentTime}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className={`backdrop-blur-md bg-glass border-glass-border hover:bg-glass hover:scale-105 transition-smooth ${
              focusedButton === "back" ? "ring-2 ring-primary shadow-glow" : ""
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Inicio
          </Button>

          <div className="flex gap-2 p-2 backdrop-blur-md bg-background/80 rounded-full border border-glass-border">
            <Button
              onClick={() => setFlightType("arrivals")}
              className={`rounded-full px-6 font-bold uppercase tracking-wide font-mono transition-smooth ${
                flightType === "arrivals"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              } ${focusedButton === "arrivals" ? "ring-2 ring-primary shadow-glow" : ""}`}
            >
              Llegadas
            </Button>
            <Button
              onClick={() => setFlightType("departures")}
              className={`rounded-full px-6 font-bold uppercase tracking-wide font-mono transition-smooth ${
                flightType === "departures"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              } ${focusedButton === "departures" ? "ring-2 ring-primary shadow-glow" : ""}`}
            >
              Salidas
            </Button>
          </div>
        </div>

        {/* Flight Board - Iframe */}
        <div className="flex-1 backdrop-blur-md bg-card/50 rounded-xl border border-glass-border overflow-hidden shadow-elegant">
          <iframe
            src={iframeUrl}
            className="w-full h-full min-h-[600px]"
            style={{ border: "none" }}
            title={`${flightType === "arrivals" ? "Llegadas" : "Salidas"} - San Salvador`}
            loading="lazy"
          />
        </div>

        {/* Footer Hint */}
        <footer className="mt-4 text-center">
          <p className="text-sm text-foreground/50">
            Use ← → para navegar entre opciones • Enter para seleccionar • Escape para volver
          </p>
        </footer>
      </div>
    </div>
  );
}
