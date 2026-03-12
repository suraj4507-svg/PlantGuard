import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import WeatherAdvice from "./pages/WeatherAdvice";
import NurseryLocator from "./pages/NurseryLocator";
import PlantAdvisor from "./pages/PlantAdvisor";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Detect from "./pages/Detect";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detect" element={<DiseaseDetection />} />
          <Route path="/weather" element={<WeatherAdvice />} />
          <Route path="/nurseries" element={<NurseryLocator />} />
          <Route path="/advisor" element={<PlantAdvisor />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/detect-plant" element={<Detect />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
