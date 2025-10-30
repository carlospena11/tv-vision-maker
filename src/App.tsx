import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IptvPage from "./pages/IptvPage";
import MoviePage from "./pages/MoviePage";
import MenuPage from "./pages/MenuPage";
import MusicPage from "./pages/MusicPage";
import FlightsPage from "./pages/FlightsPage";
import PromotionsPage from "./pages/PromotionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/iptv" element={<IptvPage />} />
          <Route path="/movie" element={<MoviePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
