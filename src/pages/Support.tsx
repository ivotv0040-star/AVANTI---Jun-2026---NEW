import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Mail, Phone, MessageCircle } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";

const Support = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isExpanded: sidebarExpanded } = useSidebar();
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ticket submission
    toast({
      title: "Chamado enviado com sucesso!",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setFormData({
      subject: "",
      category: "",
      priority: "",
      description: "",
      email: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        sidebarExpanded ? "ml-64" : "ml-20"
      )}>
          <Header />
          <main className="flex-1 p-6">
            <div className="container mx-auto p-6 max-w-4xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Central de Suporte</h1>
                    <p className="text-muted-foreground">Como podemos ajudar você hoje?</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-lg">Email</CardTitle>
                    <CardDescription>suporte@avanti.com.br</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-lg">Telefone</CardTitle>
                    <CardDescription>(11) 99999-9999</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-lg">Chat Online</CardTitle>
                    <CardDescription>Segunda a Sexta, 9h às 18h</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Abrir Chamado</CardTitle>
                  <CardDescription>
                    Descreva seu problema e nossa equipe entrará em contato em breve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          placeholder="Descreva brevemente o problema"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Problema Técnico</SelectItem>
                            <SelectItem value="account">Conta e Perfil</SelectItem>
                            <SelectItem value="points">Excellent Points</SelectItem>
                            <SelectItem value="learning">Aprendizado</SelectItem>
                            <SelectItem value="other">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Prioridade</Label>
                        <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a prioridade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Baixa</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                            <SelectItem value="critical">Crítica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição do Problema</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva detalhadamente o problema que você está enfrentando..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Chamado
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
    </div>
  );
};

export default Support;