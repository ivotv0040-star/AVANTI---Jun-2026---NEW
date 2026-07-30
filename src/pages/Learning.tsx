import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Search, 
  Filter, 
  Star, 
  Users, 
  Clock, 
  BookOpen, 
  Award,
  Zap,
  Shield
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data para trilhas matriculadas
const enrolledTracks = [
  {
    id: 1,
    title: "JavaScript Avançado",
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    timeRemaining: "2 semanas",
    category: "Programação"
  },
  {
    id: 2,
    title: "Design System",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    timeRemaining: "1 mês",
    category: "Design"
  },
  {
    id: 3,
    title: "Liderança Ágil",
    progress: 90,
    totalLessons: 12,
    completedLessons: 11,
    timeRemaining: "3 dias",
    category: "Gestão"
  }
];

// Mock data para cursos disponíveis
const availableCourses = [
  {
    id: 4,
    title: "React Avançado",
    description: "Aprenda hooks avançados, context API e performance optimization",
    difficulty: "Avançado",
    category: "Programação",
    rating: 4.8,
    students: 1247,
    duration: "8 horas",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: 5,
    title: "UX Writing",
    description: "Técnicas para escrever textos que melhoram a experiência do usuário",
    difficulty: "Intermediário",
    category: "Design",
    rating: 4.6,
    students: 892,
    duration: "6 horas",
    tags: ["UX", "Escrita", "Design"]
  },
  {
    id: 6,
    title: "Python para Iniciantes",
    description: "Fundamentos da linguagem Python do zero",
    difficulty: "Iniciante",
    category: "Programação",
    rating: 4.9,
    students: 2341,
    duration: "12 horas",
    tags: ["Python", "Backend", "Iniciante"]
  },
  {
    id: 7,
    title: "Gestão de Projetos",
    description: "Metodologias ágeis e ferramentas para gestão eficaz",
    difficulty: "Intermediário",
    category: "Gestão",
    rating: 4.7,
    students: 1156,
    duration: "10 horas",
    tags: ["Scrum", "Kanban", "Gestão"]
  },
  {
    id: 8,
    title: "Marketing Digital",
    description: "Estratégias digitais para crescimento de negócios",
    difficulty: "Iniciante",
    category: "Marketing",
    rating: 4.5,
    students: 1823,
    duration: "7 horas",
    tags: ["Marketing", "Digital", "Growth"]
  },
  {
    id: 9,
    title: "Figma Avançado",
    description: "Prototipagem avançada e sistemas de design no Figma",
    difficulty: "Avançado",
    category: "Design",
    rating: 4.8,
    students: 967,
    duration: "9 horas",
    tags: ["Figma", "Prototipagem", "Design System"]
  }
];

const Learning = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "bg-success/10 text-success border-success/20";
      case "Intermediário":
        return "bg-warning/10 text-warning border-warning/20";
      case "Avançado":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return <Shield className="w-3 h-3" />;
      case "Intermediário":
        return <Zap className="w-3 h-3" />;
      case "Avançado":
        return <Award className="w-3 h-3" />;
      default:
        return <BookOpen className="w-3 h-3" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < Math.floor(rating) 
            ? "text-warning fill-warning" 
            : i < rating 
            ? "text-warning fill-warning/50" 
            : "text-muted-foreground"
        )}
      />
    ));
  };

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || course.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

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
              {t('learning.page.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('learning.page.subtitle')}
            </p>
          </div>

          {/* Trilhas Matriculadas */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t('learning.enrolled.title')}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {enrolledTracks.map((track) => (
                <Card key={track.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{track.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {track.category}
                      </Badge>
                    </div>
                    <Progress value={track.progress} className="mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{track.completedLessons}/{track.totalLessons} aulas</span>
                      <span>{track.progress}%</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{track.timeRemaining}</span>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Play className="w-4 h-4" />
                        {t('learning.continue')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={t('learning.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('learning.filter.category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('learning.filter.all')}</SelectItem>
                  <SelectItem value="Programação">Programação</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Gestão">Gestão</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder={t('learning.filter.difficulty')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('learning.filter.all')}</SelectItem>
                  <SelectItem value="Iniciante">Iniciante</SelectItem>
                  <SelectItem value="Intermediário">Intermediário</SelectItem>
                  <SelectItem value="Avançado">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cursos Disponíveis */}
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              {t('learning.available.title')} ({filteredCourses.length})
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={cn("gap-1", getDifficultyColor(course.difficulty))}
                      >
                        {getDifficultyIcon(course.difficulty)}
                        {course.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {renderStars(course.rating)}
                      </div>
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary/90 transition-colors">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {t('learning.enroll')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">
                  {t('learning.no.results')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('learning.try.different.filters')}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* AI Chat Button */}
      <AIChat />
    </div>
  );
};

export default Learning;