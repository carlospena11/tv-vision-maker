import { useState, useEffect } from "react";
import { ArrowLeft, Play, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import hotelBackground from "@/assets/hotel-background.jpg";

const movieGenres = [
  {
    name: "Acción",
    movies: [
      { title: "Top Gun: Maverick", rating: 8.3, duration: "2h 10m", year: 2022 },
      { title: "John Wick 4", rating: 7.8, duration: "2h 49m", year: 2023 },
      { title: "Fast & Furious X", rating: 5.8, duration: "2h 21m", year: 2023 }
    ]
  },
  {
    name: "Drama", 
    movies: [
      { title: "The Whale", rating: 7.7, duration: "1h 57m", year: 2022 },
      { title: "Everything Everywhere All at Once", rating: 7.8, duration: "2h 19m", year: 2022 },
      { title: "The Banshees of Inisherin", rating: 7.2, duration: "1h 54m", year: 2022 }
    ]
  },
  {
    name: "Comedia",
    movies: [
      { title: "Glass Onion", rating: 7.2, duration: "2h 19m", year: 2022 },
      { title: "The Menu", rating: 7.2, duration: "1h 47m", year: 2022 },
      { title: "Turning Red", rating: 7.0, duration: "1h 40m", year: 2022 }
    ]
  }
];

export default function MoviePage() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
        case "Backspace":
          navigate("/");
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedGenre(prev => Math.max(0, prev - 1));
          setSelectedMovie(0);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedGenre(prev => Math.min(movieGenres.length - 1, prev + 1));
          setSelectedMovie(0);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedMovie(prev => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedMovie(prev => 
            Math.min(movieGenres[selectedGenre].movies.length - 1, prev + 1)
          );
          break;
        case "Enter":
          e.preventDefault();
          console.log(`Playing: ${movieGenres[selectedGenre].movies[selectedMovie].title}`);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, selectedGenre, selectedMovie]);

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
          <h1 className="text-4xl font-bold text-foreground">Películas</h1>
          <div className="w-32" />
        </header>

        {/* Content */}
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Genres */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Géneros</h2>
            <div className="space-y-4">
              {movieGenres.map((genre, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                    selectedGenre === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                  }`}
                  onClick={() => {
                    setSelectedGenre(index);
                    setSelectedMovie(0);
                  }}
                >
                  <span className={`text-lg font-medium ${selectedGenre === index ? "text-primary" : "text-foreground"}`}>
                    {genre.name}
                  </span>
                </Card>
              ))}
            </div>
          </div>

          {/* Movies */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {movieGenres[selectedGenre].name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {movieGenres[selectedGenre].movies.map((movie, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                    selectedMovie === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                  }`}
                  onClick={() => setSelectedMovie(index)}
                >
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-foreground/40" />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${selectedMovie === index ? "text-primary" : "text-foreground"}`}>
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-foreground/70">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span>{movie.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{movie.duration}</span>
                    </div>
                    <span>{movie.year}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Featured Movie */}
            <Card className="mt-8 p-8 bg-glass backdrop-blur-md border-glass-border">
              <h3 className="text-xl font-semibold text-foreground mb-4">Película destacada</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <Play className="w-16 h-16 text-foreground/40" />
                </div>
                <div className="lg:col-span-2">
                  <h4 className="text-2xl font-bold text-foreground mb-2">
                    {movieGenres[selectedGenre].movies[selectedMovie].title}
                  </h4>
                  <div className="flex items-center gap-6 mb-4 text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent fill-accent" />
                      <span className="text-lg">{movieGenres[selectedGenre].movies[selectedMovie].rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{movieGenres[selectedGenre].movies[selectedMovie].duration}</span>
                    </div>
                    <span>{movieGenres[selectedGenre].movies[selectedMovie].year}</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Play className="w-4 h-4 mr-2" />
                    Reproducir
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>

        {/* Controls Hint */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-foreground/50">
            ↑↓ Géneros | ←→ Películas | Enter: Reproducir | Esc: Volver
          </p>
        </footer>
      </div>
    </div>
  );
}