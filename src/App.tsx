import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Index from "./pages/Index";
import Learning from "./pages/Learning";
import Career from "./pages/Career";
import Culture from "./pages/Culture";
import Challenges from "./pages/Challenges";
import ExcellentPoints from "./pages/ExcellentPoints";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import LevelXP from "./pages/LevelXP";
import Badges from "./pages/Badges";
import LearningHours from "./pages/LearningHours";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Business from "./pages/Business";
import Training from "./pages/Training";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <SearchProvider>
          <SidebarProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/business" element={<Business />} />
                <Route path="/training" element={<Training />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/inicio" element={<Index />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/career" element={<Career />} />
                <Route path="/culture" element={<Culture />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/excellent-points" element={<ExcellentPoints />} />
                <Route path="/support" element={<Support />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/level-xp" element={<LevelXP />} />
                <Route path="/badges" element={<Badges />} />
                <Route path="/learning-hours" element={<LearningHours />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            </TooltipProvider>
          </SidebarProvider>
        </SearchProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
