import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plane, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { Button } from "@/components/ui/button";
import hotelBackground from "@/assets/hotel-background.jpg";

type FlightType = "departures" | "arrivals";

// Logos de aerolíneas principales
const airlineLogos = [
  { name: "Avianca", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Avianca_Logo.svg/320px-Avianca_Logo.svg.png" },
  { name: "Copa Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Copa_Airlines_logo.svg/320px-Copa_Airlines_logo.svg.png" },
  { name: "American Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/American_Airlines_logo_2013.svg/320px-American_Airlines_logo_2013.svg.png" },
  { name: "United Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/United_Airlines_Logo.svg/320px-United_Airlines_Logo.svg.png" },
  { name: "Delta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/320px-Delta_logo.svg.png" },
  { name: "TACA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/TACA_logo.svg/320px-TACA_logo.svg.png" },
];

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
        {/* Header con estilo tablero aeropuerto LED */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-lg p-6 mb-6 shadow-2xl border-2 border-amber-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 p-3 rounded-lg border border-amber-500/50">
                <Plane className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-[0.3em] text-amber-400 font-mono drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                  VUELOS • SAN SALVADOR
                </h1>
                <p className="text-lg text-amber-200/70 font-mono tracking-wider mt-1">
                  Aeropuerto Internacional Monseñor Óscar Arnulfo Romero (SAL)
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold font-mono tabular-nums text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                {currentTime}
              </div>
              <div className="text-sm text-amber-200/60 font-mono mt-1">
                HORA LOCAL
              </div>
            </div>
          </div>
        </div>

        {/* Logos de aerolíneas */}
        <div className="mb-6 backdrop-blur-md bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {airlineLogos.map((airline) => (
              <div
                key={airline.name}
                className="bg-white/90 p-3 rounded-lg shadow-lg hover:scale-105 transition-transform w-32 h-16 flex items-center justify-center"
              >
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className={`backdrop-blur-md bg-slate-900/70 border-slate-600 hover:bg-slate-800 hover:scale-105 transition-smooth text-amber-300 hover:text-amber-200 ${
              focusedButton === "back" ? "ring-2 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)]" : ""
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Inicio
          </Button>

          <div className="flex gap-3 p-2 backdrop-blur-md bg-slate-900/80 rounded-xl border-2 border-slate-700">
            <Button
              onClick={() => setFlightType("arrivals")}
              className={`rounded-lg px-8 py-6 font-bold uppercase tracking-[0.2em] font-mono transition-smooth flex items-center gap-3 ${
                flightType === "arrivals"
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-emerald-400"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 border-2 border-slate-600"
              } ${focusedButton === "arrivals" ? "ring-2 ring-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]" : ""}`}
            >
              <PlaneLanding className="w-6 h-6" />
              Llegadas
            </Button>
            <Button
              onClick={() => setFlightType("departures")}
              className={`rounded-lg px-8 py-6 font-bold uppercase tracking-[0.2em] font-mono transition-smooth flex items-center gap-3 ${
                flightType === "departures"
                  ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-[0_0_20px_rgba(251,191,36,0.5)] border-2 border-amber-400"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 border-2 border-slate-600"
              } ${focusedButton === "departures" ? "ring-2 ring-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.6)]" : ""}`}
            >
              <PlaneTakeoff className="w-6 h-6" />
              Salidas
            </Button>
          </div>
        </div>

        {/* Flight Board - Iframe con estilo tablero LED */}
        <div className="flex-1 backdrop-blur-md bg-slate-900/60 rounded-xl border-4 border-slate-700/70 overflow-hidden shadow-2xl">
          <div className={`h-3 ${flightType === "arrivals" ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" : "bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500"} animate-pulse`} />
          <iframe
            src={iframeUrl}
            className="w-full h-full min-h-[600px]"
            style={{ border: "none" }}
            title={`${flightType === "arrivals" ? "Llegadas" : "Salidas"} - San Salvador`}
            loading="lazy"
          />
          <div className={`h-3 ${flightType === "arrivals" ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" : "bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500"} animate-pulse`} />
        </div>

        {/* Footer Hint */}
        <footer className="mt-4 text-center backdrop-blur-sm bg-slate-900/40 rounded-lg p-3 border border-slate-700/50">
          <p className="text-sm text-amber-300/70 font-mono">
            Use ← → para navegar entre opciones • Enter para seleccionar • Escape para volver
          </p>
        </footer>
      </div>
    </div>
  );
}
