import { useState, useEffect } from "react";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import hotelBackground from "@/assets/hotel-background.jpg";

const musicPlaylists = [
  {
    name: "Relajación",
    tracks: [
      { title: "Ocean Breeze", artist: "Ambient Nature", duration: "4:32" },
      { title: "Mountain Serenity", artist: "Peaceful Sounds", duration: "5:18" },
      { title: "Forest Meditation", artist: "Nature's Harmony", duration: "6:45" },
      { title: "Rainfall Dreams", artist: "Calm Waters", duration: "4:12" }
    ]
  },
  {
    name: "Jazz Lounge", 
    tracks: [
      { title: "Midnight in Paris", artist: "Hotel Jazz Ensemble", duration: "3:54" },
      { title: "Smooth Operator", artist: "The Lounge Collective", duration: "4:28" },
      { title: "Blue Moon Rising", artist: "Jazz Masters", duration: "5:33" },
      { title: "Cocktail Hour", artist: "Evening Jazz", duration: "4:07" }
    ]
  },
  {
    name: "Clásica",
    tracks: [
      { title: "Canon en Re", artist: "Pachelbel", duration: "6:02" },
      { title: "Claro de Luna", artist: "Debussy", duration: "5:24" },
      { title: "Ave María", artist: "Schubert", duration: "4:18" },
      { title: "Für Elise", artist: "Beethoven", duration: "3:35" }
    ]
  },
  {
    name: "Ambiente Hotel",
    tracks: [
      { title: "Lobby Elegance", artist: "Hotel Ambience", duration: "8:12" },
      { title: "Pool Side Vibes", artist: "Resort Sounds", duration: "6:30" },
      { title: "Spa Tranquility", artist: "Wellness Music", duration: "7:45" },
      { title: "Rooftop Sunset", artist: "Evening Atmosphere", duration: "5:58" }
    ]
  }
];

export default function MusicPage() {
  const navigate = useNavigate();
  const [selectedPlaylist, setSelectedPlaylist] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([45]);
  const [volume, setVolume] = useState([75]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
        case "Backspace":
          navigate("/");
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedPlaylist(prev => Math.max(0, prev - 1));
          setSelectedTrack(0);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedPlaylist(prev => Math.min(musicPlaylists.length - 1, prev + 1));
          setSelectedTrack(0);
          break;
        case "ArrowLeft":
          e.preventDefault();
          setSelectedTrack(prev => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          e.preventDefault();
          setSelectedTrack(prev => 
            Math.min(musicPlaylists[selectedPlaylist].tracks.length - 1, prev + 1)
          );
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, selectedPlaylist, selectedTrack]);

  const currentTrack = musicPlaylists[selectedPlaylist].tracks[selectedTrack];

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-background"
      style={{
        backgroundImage: `url(${hotelBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-preference'
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
          <h1 className="text-4xl font-bold text-foreground">Música Ambiental</h1>
          <div className="w-32" />
        </header>

        {/* Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Playlists */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Playlists</h2>
            <div className="space-y-4">
              {musicPlaylists.map((playlist, index) => (
                <Card
                  key={index}
                  className={`p-6 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                    selectedPlaylist === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                  }`}
                  onClick={() => {
                    setSelectedPlaylist(index);
                    setSelectedTrack(0);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className={`text-lg font-medium ${selectedPlaylist === index ? "text-primary" : "text-foreground"}`}>
                        {playlist.name}
                      </span>
                      <p className="text-sm text-foreground/60">{playlist.tracks.length} canciones</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Tracks */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              {musicPlaylists[selectedPlaylist].name}
            </h2>
            <div className="space-y-3">
              {musicPlaylists[selectedPlaylist].tracks.map((track, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-smooth bg-glass backdrop-blur-md border-glass-border hover:shadow-glow ${
                    selectedTrack === index ? "shadow-glow border-primary/30 bg-primary/20" : ""
                  }`}
                  onClick={() => setSelectedTrack(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        {selectedTrack === index && isPlaying ? (
                          <Pause className="w-5 h-5 text-primary" />
                        ) : (
                          <Play className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium ${selectedTrack === index ? "text-primary" : "text-foreground"}`}>
                          {track.title}
                        </h3>
                        <p className="text-sm text-foreground/60">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-foreground/40 hover:text-accent cursor-pointer" />
                      <span className="text-sm text-foreground/60">{track.duration}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        {/* Player Controls */}
        <Card className="mt-8 p-6 bg-glass backdrop-blur-md border-glass-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Current Track Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{currentTrack.title}</h3>
                <p className="text-foreground/70">{currentTrack.artist}</p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground">
                  <Shuffle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <SkipBack className="w-6 h-6" />
                </Button>
                <Button 
                  onClick={() => setIsPlaying(prev => !prev)}
                  className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
                  <SkipForward className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground/60 hover:text-foreground">
                  <Repeat className="w-5 h-5" />
                </Button>
              </div>
              {/* Progress Bar */}
              <div className="w-full max-w-md flex items-center gap-2">
                <span className="text-sm text-foreground/60">1:23</span>
                <Slider
                  value={currentTime}
                  onValueChange={setCurrentTime}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-foreground/60">{currentTrack.duration}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 justify-end">
              <Volume2 className="w-5 h-5 text-foreground/70" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>
        </Card>

        {/* Controls Hint */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-foreground/50">
            ↑↓ Playlists | ←→ Canciones | Enter/Espacio: Play/Pausa | Esc: Volver
          </p>
        </footer>
      </div>
    </div>
  );
}