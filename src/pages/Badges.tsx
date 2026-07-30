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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Award, 
  Trophy, 
  Star,
  Crown,
  Shield,
  Zap,
  Target,
  BookOpen,
  Users,
  Calendar,
  Code,
  Palette,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  Lock,
  CheckCircle,
  Sparkles
} from "lucide-react";

const Badges = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const badgeCategories = [
    { id: "learning", name: "Aprendizado", icon: BookOpen, color: "text-blue-500" },
    { id: "projects", name: "Projetos", icon: Code, color: "text-green-500" },
    { id: "leadership", name: "Liderança", icon: Crown, color: "text-purple-500" },
    { id: "collaboration", name: "Colaboração", icon: Users, color: "text-orange-500" },
    { id: "innovation", name: "Inovação", icon: Sparkles, color: "text-pink-500" },
    { id: "special", name: "Especiais", icon: Star, color: "text-yellow-500" }
  ];

  const userBadges = [
    {
      id: 1,
      name: "Primeiro Passo",
      description: "Completou o primeiro curso na plataforma",
      category: "learning",
      rarity: "common",
      dateEarned: "2022-03-20",
      progress: 100,
      maxProgress: 1,
      unlocked: true,
      icon: BookOpen
    },
    {
      id: 2,
      name: "Maratonista",
      description: "Completou 10 cursos em sequência",
      category: "learning",
      rarity: "rare",
      dateEarned: "2023-06-15",
      progress: 100,
      maxProgress: 10,
      unlocked: true,
      icon: Target
    },
    {
      id: 3,
      name: "Mentor Dedicado",
      description: "Mentorou 5 novos funcionários",
      category: "leadership",
      rarity: "epic",
      dateEarned: "2023-11-02",
      progress: 100,
      maxProgress: 5,
      unlocked: true,
      icon: Users
    },
    {
      id: 4,
      name: "Inovador",
      description: "Propôs 3 soluções inovadoras aprovadas",
      category: "innovation",
      rarity: "legendary",
      dateEarned: "2024-01-10",
      progress: 100,
      maxProgress: 3,
      unlocked: true,
      icon: Sparkles
    }
  ];

  const availableBadges = [
    {
      id: 5,
      name: "Especialista Frontend",
      description: "Complete 20 cursos de desenvolvimento frontend",
      category: "learning",
      rarity: "epic",
      progress: 15,
      maxProgress: 20,
      unlocked: false,
      requirements: "Complete mais 5 cursos de frontend",
      icon: Code
    },
    {
      id: 6,
      name: "Team Player",
      description: "Participe de 15 projetos colaborativos",
      category: "collaboration",
      rarity: "rare",
      progress: 8,
      maxProgress: 15,
      unlocked: false,
      requirements: "Participe de mais 7 projetos",
      icon: Users
    },
    {
      id: 7,
      name: "Design Master",
      description: "Complete todos os cursos de design disponíveis",
      category: "learning",
      rarity: "legendary",
      progress: 3,
      maxProgress: 12,
      unlocked: false,
      requirements: "Complete mais 9 cursos de design",
      icon: Palette
    },
    {
      id: 8,
      name: "Comunicador Ativo",
      description: "Participe de 50 discussões no fórum",
      category: "collaboration",
      rarity: "common",
      progress: 42,
      maxProgress: 50,
      unlocked: false,
      requirements: "Participe de mais 8 discussões",
      icon: MessageSquare
    },
    {
      id: 9,
      name: "Líder de Equipe",
      description: "Lidere 3 projetos grandes com sucesso",
      category: "leadership",
      rarity: "legendary",
      progress: 1,
      maxProgress: 3,
      unlocked: false,
      requirements: "Lidere mais 2 projetos grandes",
      icon: Crown
    },
    {
      id: 10,
      name: "Veterano",
      description: "Complete 2 anos na empresa",
      category: "special",
      rarity: "epic",
      progress: 22,
      maxProgress: 24,
      unlocked: false,
      requirements: "Faltam 2 meses",
      icon: Shield
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-500 border-gray-200";
      case "rare": return "text-blue-500 border-blue-200";
      case "epic": return "text-purple-500 border-purple-200";
      case "legendary": return "text-yellow-500 border-yellow-200";
      default: return "text-gray-500 border-gray-200";
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-50";
      case "rare": return "bg-blue-50";
      case "epic": return "bg-purple-50";
      case "legendary": return "bg-gradient-to-br from-yellow-50 to-orange-50";
      default: return "bg-gray-50";
    }
  };

  const filteredAvailableBadges = availableBadges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || badge.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "available" && !badge.unlocked) ||
                         (statusFilter === "unlocked" && badge.unlocked);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: userBadges.length,
    rare: userBadges.filter(b => b.rarity === "rare").length,
    epic: userBadges.filter(b => b.rarity === "epic").length,
    legendary: userBadges.filter(b => b.rarity === "legendary").length
  };

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
              Badges e Conquistas
            </h1>
            <p className="text-xl text-muted-foreground">
              Acompanhe suas conquistas e descubra novos desafios
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total de Badges</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{stats.rare}</div>
                <div className="text-sm text-muted-foreground">Badges Raros</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Crown className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">{stats.epic}</div>
                <div className="text-sm text-muted-foreground">Badges Épicos</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.legendary}</div>
                <div className="text-sm text-muted-foreground">Badges Lendários</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="earned" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="earned" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Conquistados ({userBadges.length})
              </TabsTrigger>
              <TabsTrigger value="available" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Disponíveis ({availableBadges.length})
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Categorias
              </TabsTrigger>
            </TabsList>

            {/* Earned Badges Tab */}
            <TabsContent value="earned">
              <Card>
                <CardHeader>
                  <CardTitle>Badges Conquistados</CardTitle>
                  <CardDescription>
                    Suas conquistas e marcos alcançados na plataforma
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userBadges.map((badge) => {
                      const IconComponent = badge.icon;
                      return (
                        <div key={badge.id} className={`p-6 border-2 rounded-xl ${getRarityColor(badge.rarity)} ${getRarityBg(badge.rarity)} hover:shadow-lg transition-all`}>
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                              <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                            
                            <div className="space-y-2">
                              <Badge className={getRarityColor(badge.rarity).split(' ')[0]} variant="outline">
                                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                              </Badge>
                              <div className="text-xs text-muted-foreground">
                                Conquistado em {new Date(badge.dateEarned).toLocaleDateString('pt-BR')}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Available Badges Tab */}
            <TabsContent value="available">
              <Card>
                <CardHeader>
                  <CardTitle>Badges Disponíveis</CardTitle>
                  <CardDescription>
                    Descubra novos desafios e conquiste mais badges
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Buscar badges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full sm:w-[200px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {badgeCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Available Badges Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAvailableBadges.map((badge) => {
                      const IconComponent = badge.icon;
                      const progressPercentage = (badge.progress / badge.maxProgress) * 100;
                      
                      return (
                        <div key={badge.id} className={`p-6 border-2 rounded-xl ${getRarityColor(badge.rarity)} ${getRarityBg(badge.rarity)} hover:shadow-lg transition-all relative`}>
                          {!badge.unlocked && (
                            <div className="absolute top-2 right-2">
                              <Lock className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                          
                          <div className="text-center">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                              badge.unlocked ? 'bg-gradient-primary' : 'bg-muted'
                            }`}>
                              <IconComponent className={`w-8 h-8 ${badge.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                            </div>
                            
                            <h3 className="font-bold text-lg mb-2">{badge.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                            
                            <div className="space-y-3">
                              <Badge className={getRarityColor(badge.rarity).split(' ')[0]} variant="outline">
                                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                              </Badge>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Progresso</span>
                                  <span>{badge.progress}/{badge.maxProgress}</span>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                                <p className="text-xs text-muted-foreground">{badge.requirements}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {filteredAvailableBadges.length === 0 && (
                    <div className="text-center py-12">
                      <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground mb-2">
                        Nenhum badge encontrado
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Tente ajustar os filtros de busca
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {badgeCategories.map((category) => {
                  const IconComponent = category.icon;
                  const categoryBadges = [...userBadges, ...availableBadges].filter(b => b.category === category.id);
                  const earnedInCategory = userBadges.filter(b => b.category === category.id).length;
                  
                  return (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center`}>
                          <IconComponent className={`w-8 h-8 ${category.color}`} />
                        </div>
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>
                          {earnedInCategory} de {categoryBadges.length} badges conquistados
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          <Progress value={(earnedInCategory / categoryBadges.length) * 100} className="h-2" />
                          <Button variant="outline" className="w-full" onClick={() => setCategoryFilter(category.id)}>
                            Ver Badges
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <AIChat />
    </div>
  );
};

export default Badges;