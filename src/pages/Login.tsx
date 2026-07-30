import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder para lógica de login
    console.log("Login attempt:", { email, password });
  };

  const handleSSLLogin = () => {
    // Placeholder para login SSL
    console.log("SSL Login attempt");
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
          <p className="text-muted-foreground">Entre em sua conta para continuar</p>
        </div>

        {/* Login Form */}
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Fazer Login</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Usuário/Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full">
                Entrar
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

            {/* SSL Login Button */}
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleSSLLogin}
            >
              <Shield className="mr-2 h-4 w-4" />
              Logar com SSL
            </Button>

            {/* Footer Links */}
            <div className="flex flex-col space-y-2 text-center text-sm">
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Não tem uma conta? Cadastre-se
              </Link>
              <Link 
                to="/forgot-password" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <p className="text-center text-xs text-muted-foreground">
          Ao fazer login, você concorda com nossos{" "}
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

export default Login;