import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MissionControl from "./pages/MissionControl";
import ShopFloor from "./pages/ShopFloor";
import OEEAnalytics from "./pages/OEEAnalytics";
import DailyProduction from "./pages/DailyProduction";
import Inventory from "./pages/Inventory";
import QualityControl from "./pages/QualityControl";
import Maintenance from "./pages/Maintenance";
import LiveStatus from "./pages/LiveStatus";
import Alerts from "./pages/Alerts";
import Downtime from "./pages/Downtime";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MissionControl />} />
          <Route path="/shop-floor" element={<ShopFloor />} />
          <Route path="/oee" element={<OEEAnalytics />} />
          <Route path="/production" element={<DailyProduction />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/quality" element={<QualityControl />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/status" element={<LiveStatus />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/downtime" element={<Downtime />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
