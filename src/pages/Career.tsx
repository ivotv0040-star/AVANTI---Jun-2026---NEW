import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Calendar, 
  Trophy,
  ArrowRight,
  Plus,
  Edit,
  CheckCircle
} from "lucide-react";

const positions = [
  "Júnior Developer",
  "Pleno Developer", 
  "Sênior Developer",
  "Tech Lead",
  "Engineering Manager",
  "Staff Engineer",
  "Principal Engineer",
  "VP of Engineering",
  "CTO"
];

const timeFrames = [
  { id: "short", label: "career.timeframe.short", months: 6 },
  { id: "medium", label: "career.timeframe.medium", months: 18 },
  { id: "long", label: "career.timeframe.long", months: 36 }
];

export default function Career() {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [currentPosition, setCurrentPosition] = useState("Pleno Developer");
  const [targetPositions, setTargetPositions] = useState({
    short: "Sênior Developer",
    medium: "Tech Lead", 
    long: "Engineering Manager"
  });
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState([
    { id: 1, title: "Completar certificação AWS", progress: 75, deadline: "2024-12-15", type: "annual" },
    { id: 2, title: "Liderar projeto de migração", progress: 45, deadline: "2024-10-30", type: "semestral" },
    { id: 3, title: "Melhorar soft skills", progress: 60, deadline: "2024-11-20", type: "semestral" }
  ]);

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, {
        id: Date.now(),
        title: newGoal,
        progress: 0,
        deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: "semestral"
      }]);
      setNewGoal("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        isExpanded ? "ml-64" : "ml-20"
      )}>
        <Header />
        
        {/* Career Content */}
        <main className="flex-1 p-6">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t('career.page.title')}</h1>
            <p className="text-xl text-muted-foreground">{t('career.page.subtitle')}</p>
          </div>

          <Tabs defaultValue="planning" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="planning" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t('career.tab.planning')}
              </TabsTrigger>
              <TabsTrigger value="goals" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t('career.tab.goals')}
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('career.tab.feedback')}
              </TabsTrigger>
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('career.tab.plans')}
              </TabsTrigger>
            </TabsList>

          {/* Career Planning Tab */}
          <TabsContent value="planning">
            <div className="grid gap-6">
            {/* Current Position */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  {t('career.current.position')}
                </CardTitle>
              </CardHeader>
                <CardContent>
                  <Select value={currentPosition} onValueChange={setCurrentPosition}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

            {/* Career Path */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">{t('career.path.title')}</CardTitle>
                <CardDescription>{t('career.path.description')}</CardDescription>
              </CardHeader>
                <CardContent className="space-y-6">
                  {timeFrames.map((timeframe) => (
                    <div key={timeframe.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{t(timeframe.label)}</h3>
                        <Badge variant="outline">{timeframe.months} {t('career.months')}</Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Select 
                            value={targetPositions[timeframe.id as keyof typeof targetPositions]} 
                            onValueChange={(value) => setTargetPositions(prev => ({
                              ...prev,
                              [timeframe.id]: value
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {positions.map((position) => (
                                <SelectItem key={position} value={position}>
                                  {position}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals">
            <div className="space-y-6">
              {/* Add New Goal */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    {t('career.goals.add')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('career.goals.placeholder')}
                      value={newGoal}
                      onChange={(e) => setNewGoal(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    />
                    <Button onClick={addGoal} className="bg-gradient-primary hover:bg-gradient-primary/80">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Goals List */}
              <div className="grid gap-4">
                {goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium">{goal.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={goal.type === 'annual' ? 'default' : 'secondary'}>
                                {t(`career.goals.type.${goal.type}`)}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {t('career.goals.deadline')}: {new Date(goal.deadline).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{t('career.goals.progress')}</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t('career.feedback.request')}</CardTitle>
                  <CardDescription>{t('career.feedback.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea placeholder={t('career.feedback.placeholder')} rows={4} />
                  <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/80">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t('career.feedback.send')}
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('career.feedback.recent')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { author: "Maria Silva", date: "2024-01-15", content: "Excelente trabalho no projeto de migração. Demonstrou liderança técnica." },
                    { author: "João Santos", date: "2024-01-10", content: "Ótima capacidade de resolver problemas complexos. Continue assim!" }
                  ].map((feedback, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{feedback.author}</span>
                        <span className="text-sm text-muted-foreground">{feedback.date}</span>
                      </div>
                      <p className="text-sm">{feedback.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t('career.plans.annual')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Desenvolver expertise em Cloud Computing", status: "em-andamento" },
                    { title: "Liderar equipe de 5+ desenvolvedores", status: "planejado" },
                    { title: "Obter certificação PMP", status: "concluido" }
                  ].map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{plan.title}</span>
                      <Badge variant={
                        plan.status === 'concluido' ? 'default' : 
                        plan.status === 'em-andamento' ? 'secondary' : 'outline'
                      }>
                        {plan.status === 'concluido' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {t(`career.plans.status.${plan.status}`)}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-primary">{t('career.plans.semestral')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Completar curso de React Advanced", status: "em-andamento" },
                    { title: "Participar de 2 conferências técnicas", status: "planejado" }
                  ].map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span>{plan.title}</span>
                      <Badge variant={plan.status === 'em-andamento' ? 'secondary' : 'outline'}>
                        {t(`career.plans.status.${plan.status}`)}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          </Tabs>
        </main>
      </div>
      
      {/* AI Chat Button */}
      <AIChat />
    </div>
  );
}