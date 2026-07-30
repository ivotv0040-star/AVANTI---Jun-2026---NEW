import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { LevelTooltip } from "@/components/dashboard/LevelTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Award, 
  Target, 
  Star,
  Zap,
  Trophy,
  Calendar,
  BarChart3,
  Gift,
  Crown,
  Sparkles
} from "lucide-react";

const LevelXP = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  
  const currentLevel = 12;
  const currentXp = 8750;
  const nextLevelXp = 10000;
  const totalXp = 125750;
  
  const xpSources = [
    { category: "Cursos Completados", xp: 2500, color: "bg-blue-500" },
    { category: "Projetos Entregues", xp: 3200, color: "bg-green-500" },
    { category: "Mentoria", xp: 1500, color: "bg-purple-500" },
    { category: "Participação em Eventos", xp: 800, color: "bg-orange-500" },
    { category: "Feedback Positivo", xp: 750, color: "bg-pink-500" }
  ];

  const levelRewards = [
    { level: 5, reward: "Badge Iniciante", unlocked: true },
    { level: 10, reward: "Acesso a Cursos Premium", unlocked: true },
    { level: 15, reward: "Mentoria Exclusiva", unlocked: false },
    { level: 20, reward: "Certificado de Especialista", unlocked: false },
    { level: 25, reward: "Participação em Beta Tests", unlocked: false },
    { level: 30, reward: "Badge Master", unlocked: false }
  ];

  const recentActivities = [
    { action: "Completou curso de React Avançado", xp: 500, date: "2024-01-15", type: "learning" },
    { action: "Entregou projeto de migração", xp: 800, date: "2024-01-12", type: "project" },
    { action: "Recebeu feedback 5 estrelas", xp: 150, date: "2024-01-10", type: "feedback" },
    { action: "Mentorou novo funcionário", xp: 300, date: "2024-01-08", type: "mentoring" },
    { action: "Participou de workshop", xp: 200, date: "2024-01-05", type: "event" }
  ];

  const leaderboard = [
    { name: "Maria Silva", level: 18, xp: 180500, position: 1 },
    { name: "João Santos", level: 16, xp: 165200, position: 2 },
    { name: "Ana Costa", level: 15, xp: 152300, position: 3 },
    { name: "Ivo Silva", level: 12, xp: 125750, position: 4, isCurrentUser: true },
    { name: "Pedro Oliveira", level: 11, xp: 118900, position: 5 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "learning": return <Award className="w-4 h-4" />;
      case "project": return <Target className="w-4 h-4" />;
      case "feedback": return <Star className="w-4 h-4" />;
      case "mentoring": return <Trophy className="w-4 h-4" />;
      case "event": return <Calendar className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Trophy className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-500" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{position}</span>;
    }
  };

  const progressPercentage = (currentXp / nextLevelXp) * 100;
  const remainingXp = nextLevelXp - currentXp;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        isExpanded ? "ml-64" : "ml-20"
      )}>
        <Header />
        
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Nível & XP
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe seu progresso e evolução na plataforma
            </p>
          </div>

          {/* Current Level Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Progresso Atual
                    </CardTitle>
                    <CardDescription>
                      Você está no nível {currentLevel} com {currentXp.toLocaleString()} XP
                    </CardDescription>
                  </div>
                  <LevelTooltip 
                    level={currentLevel}
                    currentXp={currentXp}
                    nextLevelXp={nextLevelXp}
                  >
                    <Badge className="bg-gradient-primary hover:bg-gradient-primary/80 cursor-pointer text-lg px-4 py-2">
                      Nível {currentLevel}
                    </Badge>
                  </LevelTooltip>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progresso para o próximo nível</span>
                    <span className="text-sm text-muted-foreground">
                      {currentXp.toLocaleString()} / {nextLevelXp.toLocaleString()} XP
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Faltam {remainingXp.toLocaleString()} XP para o nível {currentLevel + 1}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{totalXp.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">XP Total</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{currentLevel + 1}</div>
                    <div className="text-sm text-muted-foreground">Próximo Nível</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Fontes de XP
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {xpSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{source.category}</span>
                      <span className="text-sm font-bold">{source.xp} XP</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${source.color}`}
                        style={{ width: `${(source.xp / Math.max(...xpSources.map(s => s.xp))) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="activities" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Atividades Recentes
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Recompensas
              </TabsTrigger>
              <TabsTrigger value="ranking" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Ranking
              </TabsTrigger>
            </TabsList>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Atividades Recentes</CardTitle>
                  <CardDescription>
                    Suas últimas atividades que geraram XP
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <Badge className="bg-gradient-primary">
                          +{activity.xp} XP
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Recompensas por Nível</CardTitle>
                  <CardDescription>
                    Desbloqueie recompensas especiais conforme avança de nível
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {levelRewards.map((reward, index) => (
                      <div key={index} className={`flex items-center gap-4 p-4 border rounded-lg ${
                        reward.unlocked 
                          ? 'bg-success/10 border-success/20' 
                          : reward.level <= currentLevel + 3 
                            ? 'bg-warning/10 border-warning/20' 
                            : 'bg-muted/50'
                      }`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                          reward.unlocked 
                            ? 'bg-gradient-primary text-white' 
                            : reward.level <= currentLevel + 3
                              ? 'bg-warning/20 text-warning'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          {reward.unlocked ? (
                            <Sparkles className="w-6 h-6" />
                          ) : (
                            <span className="font-bold">{reward.level}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Nível {reward.level}</p>
                          <p className="text-sm text-muted-foreground">{reward.reward}</p>
                        </div>
                        <Badge variant={reward.unlocked ? "default" : "outline"}>
                          {reward.unlocked ? "Desbloqueado" : "Bloqueado"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ranking Tab */}
            <TabsContent value="ranking">
              <Card>
                <CardHeader>
                  <CardTitle>Ranking Geral</CardTitle>
                  <CardDescription>
                    Veja sua posição em relação aos outros usuários
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user, index) => (
                      <div key={index} className={`flex items-center gap-4 p-4 border rounded-lg ${
                        user.isCurrentUser ? 'bg-primary/10 border-primary/20' : 'hover:bg-muted/50'
                      } transition-colors`}>
                        <div className="flex-shrink-0">
                          {getPositionIcon(user.position)}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                            {user.name} {user.isCurrentUser && '(Você)'}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user.xp.toLocaleString()} XP total
                          </p>
                        </div>
                        <Badge className={user.isCurrentUser ? 'bg-gradient-primary' : 'bg-muted'}>
                          Nível {user.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">Ver Ranking Completo</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <AIChat />
    </div>
  );
};

export default LevelXP;