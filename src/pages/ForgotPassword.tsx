import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset request for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Logo/Brand Area */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Learning Platform</h1>
          </div>

          {/* Success Message */}
          <Card className="border shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">Email Enviado!</h2>
                  <p className="text-muted-foreground">
                    Enviamos um link para redefinir sua senha para <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Verifique sua caixa de entrada e siga as instruções do email.
                  </p>
                </div>
                <div className="space-y-3 pt-4">
                  <Button asChild className="w-full">
                    <Link to="/">
                      Voltar ao Login
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsSubmitted(false)}
                  >
                    Tentar outro email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Brand Area */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Learning Platform</h1>
          <p className="text-muted-foreground">Recupere o acesso à sua conta</p>
        </div>

        {/* Reset Password Form */}
        <Card className="border shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Esqueci minha senha</CardTitle>
            <CardDescription className="text-center">
              Digite seu email para receber um link de redefinição de senha
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Enviar Link de Recuperação
              </Button>
            </form>

            {/* Back to Login */}
            <div className="text-center">
              <Link 
                to="/" 
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Voltar ao login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Não consegue acessar seu email?
          </p>
          <Link 
            to="/support" 
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Entre em contato com o suporte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;