import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, User, Lock, Mail, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt:", formData);
  };

  const handleSSLSignup = () => {
    console.log("SSL Signup attempt");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand Area */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Learning Platform</h1>
          <p className="text-muted-foreground">Crie sua conta para começar a aprender</p>
        </div>

        {/* Signup Form */}
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Company Field */}
              <div className="space-y-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Signup Button */}
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
            </form>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            {/* SSL Signup Button */}
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleSSLSignup}
            >
              <Shield className="mr-2 h-4 w-4" />
              Cadastrar com SSL
            </Button>

            {/* Footer Links */}
            <div className="text-center text-sm">
              <Link 
                to="/" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Já tem uma conta? Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <p className="text-center text-xs text-muted-foreground">
          Ao criar uma conta, você concorda com nossos{" "}
          <Link to="/terms" className="text-primary hover:text-primary/80">
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link to="/privacy" className="text-primary hover:text-primary/80">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;