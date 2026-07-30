import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AnnualGoalCard } from "@/components/dashboard/AnnualGoalCard";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";
import { RecognitionCard } from "@/components/dashboard/RecognitionCard";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { MonthlyRanking } from "@/components/dashboard/MonthlyRanking";
import { AIChat } from "@/components/dashboard/AIChat";
import { TrendingUp, MessageSquare, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";

const Index = () => {
  const { t } = useLanguage();
  const { isExpanded: isSidebarExpanded } = useSidebar();

  // Som de login
  useEffect(() => {
    const playLoginSound = async () => {
      try {
        // Cria um som simples usando Web Audio API
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Som de sucesso/login - duas notas
        const createTone = (frequency: number, duration: number, delay: number = 0) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + delay);
          gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + delay + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + duration);
          
          oscillator.start(audioContext.currentTime + delay);
          oscillator.stop(audioContext.currentTime + delay + duration);
        };
        
        // Toca duas notas: uma grave e uma aguda (som de login)
        createTone(523.25, 0.15, 0);    // C5
        createTone(783.99, 0.2, 0.1);   // G5
        
        console.log('Som de login reproduzido com sucesso');
      } catch (error) {
        console.log('Erro ao reproduzir som de login:', error);
      }
    };
    
    // Toca o som após um pequeno delay
    const timer = setTimeout(playLoginSound, 300);
    return () => clearTimeout(timer);
  }, []);

  // Measure heights for layout alignment
  const progressRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const [progressHeight, setProgressHeight] = useState<number>();
  const [rightColumnHeight, setRightColumnHeight] = useState<number>();
  const [welcomeHeight, setWelcomeHeight] = useState<number>();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const measure = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (progressRef.current) setProgressHeight(progressRef.current.offsetHeight);
      if (rightColumnRef.current) setRightColumnHeight(rightColumnRef.current.offsetHeight);
      if (welcomeRef.current) setWelcomeHeight(welcomeRef.current.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (progressRef.current) ro.observe(progressRef.current);
    if (rightColumnRef.current) ro.observe(rightColumnRef.current);
    if (welcomeRef.current) ro.observe(welcomeRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        isSidebarExpanded ? "ml-64" : "ml-20"
      )}>
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6">
            {/* Dashboard Grid */}
            <div className="transition-all duration-300 grid grid-cols-1 lg:grid-cols-[1.56fr_0.84fr_0.7fr] lg:items-start gap-3">
              {/* First Column - Progress Card and Metric Cards */}
              <div className="space-y-3">
                {/* Welcome Message */}
                <div ref={welcomeRef} className="mb-2">
                  <h1 className="text-3xl font-bold text-foreground mb-1">
                    {t('dashboard.greeting')} <span className="text-primary">Ivo</span>!
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {t('dashboard.subtitle')}
                  </p>
                </div>
                
                <div ref={progressRef}>
                  <ProgressCard
                    title={t('learning.progress')}
                    subtitle={`3 ${t('learning.tracks')}`}
                    progress={85}
                    buttonText={t('learning.resume')}
                  />
                </div>
                
                {/* Metric Cards in a horizontal row below Progress Card */}
                <div 
                  style={{ 
                    height: (isLargeScreen && rightColumnHeight && welcomeHeight) 
                      ? `${rightColumnHeight - welcomeHeight - 12}px` 
                      : undefined 
                  }} 
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  <div className="h-full">
                    <MetricCard
                      title={t('goals.career')}
                      value={5}
                      subtitle={t('goals.defined')}
                      buttonText={t('goals.details')}
                      icon={TrendingUp}
                    />
                  </div>
                  
                  <MetricCard
                    title={t('forum.activities')}
                    value={12}
                    subtitle={t('forum.discussions')}
                    buttonText={t('goals.details')}
                    icon={MessageSquare}
                  />
                  
                  <MetricCard
                    title={t('challenges')}
                    value={17}
                    subtitle={t('challenges.available')}
                    buttonText={t('goals.details')}
                    icon={Target}
                  />
                </div>
              </div>

              {/* Second Column - Start from top */}
              <div className="space-y-3">
                {/* AnnualGoalCard with same height as ProgressCard */}
                <div style={{ height: (isLargeScreen && progressHeight) ? `${progressHeight}px` : undefined }} className="min-h-0">
                  <AnnualGoalCard />
                </div>
                
                {/* Right Column Wrapper to measure combined height of Events & Activities */}
                <div ref={rightColumnRef} className="space-y-3">
                  <UpcomingEvents />
                  <RecentActivities />
                </div>
              </div>

              {/* Third Column - Ranking - Start from top */}
              <div className="transition-all duration-300 h-full">
                <MonthlyRanking />
              </div>

              {/* Recognition Card spanning available columns */}
              <div className="lg:col-span-3 transition-all duration-300">
                <RecognitionCard />
              </div>
            </div>
        </main>
      </div>
      
      {/* AI Chat Button */}
      <AIChat />
    </div>
  );
};

export default Index;
