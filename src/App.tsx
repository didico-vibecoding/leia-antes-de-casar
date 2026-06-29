import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./layout/AppLayout";
import Checklist from "./pages/Checklist";

import Index from "./pages/Index";
import Modulo from "./pages/Modulo";
import NotFound from "./pages/NotFound";
import Simulador from "./pages/Simulador";
import Trilha from "./pages/Trilha";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/trilha" element={<Trilha />} />
            <Route path="/trilha/:moduloId" element={<Modulo />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/checklist" element={<Checklist />} />
            
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
