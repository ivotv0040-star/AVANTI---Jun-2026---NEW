import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  Calendar,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Share2,
  Trophy
} from "lucide-react";

const LearningHours = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [timeFilter, setTimeFilter] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const currentStats = {
    totalHours: 127.5,
    monthlyGoal: 40,
    weeklyAverage: 8.5,
    currentStreak: 15,
    longestStreak: 23
  };

  const monthlyData = [
    { month: "Jan", hours: 32, goal: 40 },
    { month: "Fev", hours: 45, goal: 40 },
    { month: "Mar", hours: 38, goal: 40 },
    { month: "Abr", hours: 52, goal: 40 },
    { month: "Mai", hours: 41, goal: 40 },
    { month: "Jun", hours: 47, goal: 40 }
  ];

  const weeklyData = [
    { day: "Seg", hours: 2.5, date: "2024-01-15" },
    { day: "Ter", hours: 1.8, date: "2024-01-16" },
    { day: "Qua", hours: 3.2, date: "2024-01-17" },
    { day: "Qui", hours: 2.0, date: "2024-01-18" },
    { day: "Sex", hours: 1.5, date: "2024-01-19" },
    { day: "Sáb", hours: 0, date: "2024-01-20" },
    { day: "Dom", hours: 1.2, date: "2024-01-21" }
  ];

  const categoryBreakdown = [
    { category: "Programação", hours: 45.5, percentage: 35.7, color: "bg-blue-500" },
    { category: "Design", hours: 28.3, percentage: 22.2, color: "bg-purple-500" },
    { category: "Gestão", hours: 22.1, percentage: 17.3, color: "bg-green-500" },
    { category: "Marketing", hours: 18.7, percentage: 14.7, color: "bg-orange-500" },
    { category: "Soft Skills", hours: 12.9, percentage: 10.1, color: "bg-pink-500" }
  ];

  const recentSessions = [
    {
      course: "React Avançado",
      date: "2024-01-21",
      duration: 2.5,
      category: "Programação",
      completed: true
    },
    {
      course: "Design System",
      date: "2024-01-20",
      duration: 1.8,
      category: "Design",
      completed: true
    },
    {
      course: "Liderança Ágil",
      date: "2024-01-19",
      duration: 3.2,
      category: "Gestão",
      completed: false
    },
    {
      course: "Marketing Digital",
      date: "2024-01-18",
      duration: 2.0,
      category: "Marketing",
      completed: true
    },
    {
      course: "Comunicação Eficaz",
      date: "2024-01-17",
      duration: 1.5,
      category: "Soft Skills",
      completed: true
    }
  ];

  const achievements = [
    {
      name: "Maratonista Mensal",
      description: "Completou 40+ horas em um mês",
      date: "2024-01-31",
      icon: Trophy
    },
    {
      name: "Consistência",
      description: "15 dias consecutivos de estudo",
      date: "2024-01-21",
      icon: Target
    },
    {
      name: "Diversificado",
      description: "Estudou em 5 categorias diferentes",
      date: "2024-01-15",
      icon: Award
    }
  ];

  const progressPercentage = (currentStats.totalHours / currentStats.monthlyGoal) * 100;
  const maxHours = Math.max(...monthlyData.map(d => d.hours));

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
              Horas de Aprendizado
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe seu tempo dedicado ao desenvolvimento pessoal
            </p>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{currentStats.totalHours}h</div>
                <div className="text-sm text-muted-foreground">Total do Mês</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{currentStats.monthlyGoal}h</div>
                <div className="text-sm text-muted-foreground">Meta Mensal</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{currentStats.weeklyAverage}h</div>
                <div className="text-sm text-muted-foreground">Média Semanal</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{currentStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Sequência Atual</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{currentStats.longestStreak}</div>
                <div className="text-sm text-muted-foreground">Melhor Sequência</div>
              </CardContent>
            </Card>
          </div>

          {/* Progress towards monthly goal */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Progresso da Meta Mensal
                  </CardTitle>
                  <CardDescription>
                    {currentStats.totalHours}h de {currentStats.monthlyGoal}h completadas
                  </CardDescription>
                </div>
                <Badge className={progressPercentage >= 100 ? "bg-success" : "bg-primary"}>
                  {Math.round(progressPercentage)}%
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <Progress value={Math.min(progressPercentage, 100)} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                {progressPercentage >= 100 
                  ? `🎉 Parabéns! Você superou sua meta em ${Math.round(progressPercentage - 100)}%`
                  : `Faltam ${(currentStats.monthlyGoal - currentStats.totalHours).toFixed(1)}h para atingir sua meta`
                }
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  Análise
                </TabsTrigger>
                <TabsTrigger value="sessions" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Sessões
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Conquistas
                </TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Horas por Mês</CardTitle>
                    <CardDescription>Progresso mensal vs meta</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {monthlyData.map((data, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{data.month}</span>
                            <span className="text-sm text-muted-foreground">{data.hours}h / {data.goal}h</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${data.hours >= data.goal ? 'bg-success' : 'bg-primary'}`}
                              style={{ width: `${Math.min((data.hours / data.goal) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Semana Atual</CardTitle>
                    <CardDescription>Distribuição semanal de estudos</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyData.map((data, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{data.day}</span>
                            <span className="text-sm text-muted-foreground">
                              {data.hours > 0 ? `${data.hours}h` : 'Sem atividade'}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${data.hours > 0 ? 'bg-primary' : 'bg-muted'}`}
                              style={{ width: `${(data.hours / 4) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Por Categoria</CardTitle>
                    <CardDescription>Distribuição de horas por área de conhecimento</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {categoryBreakdown.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.category}</span>
                            <span className="text-sm text-muted-foreground">
                              {category.hours}h ({category.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${category.color}`}
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Time Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Temporal</CardTitle>
                    <CardDescription>Insights sobre seus hábitos de estudo</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">💡 Insights</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Terças e quartas são seus dias mais produtivos</li>
                        <li>• Você prefere estudar programação pela manhã</li>
                        <li>• Sua sequência atual é de 15 dias consecutivos</li>
                        <li>• Meta mensal foi superada em 3 dos últimos 6 meses</li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-medium mb-2">🎯 Recomendações</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Mantenha a consistência nos fins de semana</li>
                        <li>• Explore mais conteúdos de soft skills</li>
                        <li>• Considere aumentar sua meta mensal</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Sessions Tab */}
            <TabsContent value="sessions">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sessões Recentes</CardTitle>
                      <CardDescription>Histórico detalhado das suas sessões de estudo</CardDescription>
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[200px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filtrar categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        <SelectItem value="Programação">Programação</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Gestão">Gestão</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Soft Skills">Soft Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {recentSessions
                      .filter(session => categoryFilter === "all" || session.category === categoryFilter)
                      .map((session, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{session.course}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{new Date(session.date).toLocaleDateString('pt-BR')}</span>
                            <Badge variant="secondary">{session.category}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{session.duration}h</div>
                          <Badge variant={session.completed ? "default" : "outline"}>
                            {session.completed ? "Concluído" : "Em andamento"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Conquistas de Aprendizado</CardTitle>
                  <CardDescription>Marcos importantes relacionados ao seu tempo de estudo</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-transparent">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{achievement.name}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      );
                    })}
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

export default LearningHours;