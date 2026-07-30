import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { 
  Trophy, 
  Users, 
  Calendar, 
  Target, 
  Zap, 
  Plus,
  Search,
  Filter,
  Clock,
  Award,
  TrendingUp,
  CheckCircle2,
  Star
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  participants: number;
  maxParticipants: number;
  reward: number;
  deadline: string;
  tag: string;
  department: string;
  isEnrolled: boolean;
  status: "ativo" | "concluido" | "pendente";
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Otimização do Processo de Onboarding",
    description: "Desenvolver uma solução para reduzir o tempo de integração de novos funcionários em 50%",
    difficulty: "Médio",
    participants: 8,
    maxParticipants: 12,
    reward: 1500,
    deadline: "2024-12-15",
    tag: "Eficiência",
    department: "RH",
    isEnrolled: true,
    status: "ativo"
  },
  {
    id: "2", 
    title: "Campanha de Sustentabilidade Corporativa",
    description: "Criar uma estratégia inovadora para reduzir o impacto ambiental da empresa",
    difficulty: "Difícil",
    participants: 15,
    maxParticipants: 20,
    reward: 2500,
    deadline: "2024-11-30",
    tag: "Sustentabilidade",
    department: "Marketing",
    isEnrolled: false,
    status: "ativo"
  },
  {
    id: "3",
    title: "Sistema de Feedback Contínuo",
    description: "Implementar uma ferramenta de feedback em tempo real entre equipes",
    difficulty: "Fácil",
    participants: 6,
    maxParticipants: 8,
    reward: 800,
    deadline: "2024-11-20",
    tag: "Comunicação",
    department: "TI",
    isEnrolled: true,
    status: "ativo"
  }
];

const Challenges = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  
  const activechallenges = mockChallenges.filter(c => c.status === "ativo");
  const enrolledChallenges = mockChallenges.filter(c => c.isEnrolled);
  const completedChallenges = mockChallenges.filter(c => c.status === "concluido");

  const filteredChallenges = activechallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Médio": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Difícil": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        isExpanded ? "ml-64" : "ml-20"
      )}>
        <Header />
        
        <main className="flex-1 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('challenges.page.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('challenges.page.subtitle')}
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      {t('challenges.stats.active')}
                    </p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                      {activechallenges.length}
                    </p>
                  </div>
                  <Target className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      {t('challenges.stats.enrolled')}
                    </p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                      {enrolledChallenges.length}
                    </p>
                  </div>
                  <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      {t('challenges.stats.completed')}
                    </p>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                      {completedChallenges.length}
                    </p>
                  </div>
                  <Award className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                      {t('challenges.stats.points.earned')}
                    </p>
                    <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
                      4,800
                    </p>
                  </div>
                  <Star className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('challenges.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="all">{t('challenges.filter.all')}</option>
                <option value="Fácil">{t('challenges.filter.easy')}</option>
                <option value="Médio">{t('challenges.filter.medium')}</option>
                <option value="Difícil">{t('challenges.filter.hard')}</option>
              </select>
            </div>
            <Button 
              onClick={() => setShowNewChallengeForm(true)}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('challenges.create.new')}
            </Button>
          </div>

          {/* New Challenge Form */}
          {showNewChallengeForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('challenges.create.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder={t('challenges.create.title.placeholder')} />
                <Textarea 
                  placeholder={t('challenges.create.description.placeholder')} 
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-4">
                  <select className="px-4 py-2 border border-input rounded-md bg-background text-foreground">
                    <option>{t('challenges.create.difficulty')}</option>
                    <option value="Fácil">{t('challenges.filter.easy')}</option>
                    <option value="Médio">{t('challenges.filter.medium')}</option>
                    <option value="Difícil">{t('challenges.filter.hard')}</option>
                  </select>
                  <Input type="number" placeholder={t('challenges.create.reward')} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" placeholder={t('challenges.create.deadline')} />
                  <Input placeholder={t('challenges.create.tag')} />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setShowNewChallengeForm(false)}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    {t('challenges.create.submit')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewChallengeForm(false)}
                  >
                    {t('challenges.create.cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChallenges.map((challenge) => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {challenge.participants}/{challenge.maxParticipants}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(challenge.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {challenge.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-xs">
                        {challenge.tag}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {challenge.department}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-lg font-bold text-primary">
                      <Trophy className="h-5 w-5" />
                      {challenge.reward} pts
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {challenge.isEnrolled ? (
                      <Button variant="outline" className="flex-1">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {t('challenges.enrolled')}
                      </Button>
                    ) : (
                      <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                        <Zap className="h-4 w-4 mr-2" />
                        {t('challenges.join')}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      {t('challenges.details')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredChallenges.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  {t('challenges.no.results')}
                </h3>
                <p className="text-muted-foreground">
                  {t('challenges.try.different.filters')}
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      <AIChat />
    </div>
  );
};

export default Challenges;