import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { LevelTooltip } from "@/components/dashboard/LevelTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone,
  MapPin,
  Building,
  Users,
  Calendar,
  Edit,
  Save,
  Camera,
  Star,
  Award,
  TrendingUp
} from "lucide-react";

const Profile = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Ivo Silva",
    email: "ivo.silva@avanti.com.br",
    phone: "+55 11 99999-9999",
    location: "São Paulo, SP",
    department: "Tecnologia",
    position: "Pleno Developer",
    bio: "Desenvolvedor apaixonado por tecnologia, sempre buscando aprender novas ferramentas e metodologias para criar soluções inovadoras.",
    joinDate: "15/03/2022",
    level: 12,
    currentXp: 8750,
    nextLevelXp: 10000
  });

  const skills = [
    { name: "JavaScript", level: 90, category: "Técnica" },
    { name: "React", level: 85, category: "Técnica" },
    { name: "Node.js", level: 75, category: "Técnica" },
    { name: "TypeScript", level: 80, category: "Técnica" },
    { name: "Liderança", level: 70, category: "Soft Skill" },
    { name: "Comunicação", level: 85, category: "Soft Skill" },
    { name: "Trabalho em Equipe", level: 95, category: "Soft Skill" },
    { name: "Resolução de Problemas", level: 88, category: "Soft Skill" }
  ];

  const achievements = [
    { name: "Primeiro Projeto", description: "Completou seu primeiro projeto", date: "2022-03-20", type: "milestone" },
    { name: "100 Horas", description: "Completou 100 horas de aprendizado", date: "2022-06-15", type: "learning" },
    { name: "Mentor", description: "Mentorou um novo funcionário", date: "2023-01-10", type: "leadership" },
    { name: "Inovador", description: "Propôs solução inovadora aprovada", date: "2023-08-22", type: "innovation" }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-success";
    if (level >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "milestone": return <Star className="w-4 h-4" />;
      case "learning": return <TrendingUp className="w-4 h-4" />;
      case "leadership": return <Users className="w-4 h-4" />;
      case "innovation": return <Award className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aqui seria feita a chamada para salvar no backend
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
              Meu Perfil
            </h1>
            <p className="text-xl text-muted-foreground">
              Gerencie suas informações pessoais e profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src="/api/placeholder/150/150" alt={userInfo.name} />
                      <AvatarFallback className="text-2xl">{userInfo.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="absolute -bottom-2 -right-2 rounded-full p-2"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <CardTitle className="flex items-center justify-center gap-2">
                    {userInfo.name}
                  </CardTitle>
                  
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary">{userInfo.position}</Badge>
                    <LevelTooltip 
                      level={userInfo.level}
                      currentXp={userInfo.currentXp}
                      nextLevelXp={userInfo.nextLevelXp}
                    >
                      <Badge className="bg-gradient-primary hover:bg-gradient-primary/80 cursor-pointer">
                        Nível {userInfo.level}
                      </Badge>
                    </LevelTooltip>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>{userInfo.department}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{userInfo.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Desde {userInfo.joinDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="info" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Informações
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Habilidades
                  </TabsTrigger>
                  <TabsTrigger value="achievements" className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Conquistas
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="info">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Informações Pessoais</CardTitle>
                        <CardDescription>
                          Atualize suas informações de contato e perfil profissional
                        </CardDescription>
                      </div>
                      <Button 
                        variant={isEditing ? "default" : "outline"}
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        className="gap-2"
                      >
                        {isEditing ? (
                          <>
                            <Save className="w-4 h-4" />
                            Salvar
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4" />
                            Editar
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              value={userInfo.email}
                              onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <Input
                              id="phone"
                              value={userInfo.phone}
                              onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Localização</Label>
                          <Input
                            id="location"
                            value={userInfo.location}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, location: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="department">Departamento</Label>
                          <Select value={userInfo.department} onValueChange={(value) => setUserInfo(prev => ({ ...prev, department: value }))} disabled={!isEditing}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Vendas">Vendas</SelectItem>
                              <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                              <SelectItem value="Financeiro">Financeiro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="position">Cargo</Label>
                          <Input
                            id="position"
                            value={userInfo.position}
                            onChange={(e) => setUserInfo(prev => ({ ...prev, position: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografia Profissional</Label>
                        <Textarea
                          id="bio"
                          value={userInfo.bio}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          rows={4}
                          placeholder="Conte um pouco sobre sua trajetória profissional..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Habilidades e Competências</CardTitle>
                      <CardDescription>
                        Suas habilidades técnicas e soft skills desenvolvidas
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold mb-4">Habilidades Técnicas</h3>
                          <div className="space-y-3">
                            {skills.filter(skill => skill.category === "Técnica").map((skill, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{skill.name}</span>
                                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-4">Soft Skills</h3>
                          <div className="space-y-3">
                            {skills.filter(skill => skill.category === "Soft Skill").map((skill, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{skill.name}</span>
                                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                                    style={{ width: `${skill.level}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Achievements Tab */}
                <TabsContent value="achievements">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conquistas e Marcos</CardTitle>
                      <CardDescription>
                        Suas conquistas e marcos importantes na empresa
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
                              {getAchievementIcon(achievement.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.name}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                              <span className="text-xs text-muted-foreground">
                                {new Date(achievement.date).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      
      <AIChat />
    </div>
  );
};

export default Profile;