import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Termos de Uso</h1>
              <p className="text-muted-foreground">Última atualização: Janeiro 2024</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Aceitação dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Ao acessar e usar a Learning Platform, você concorda em ficar vinculado a estes Termos de Uso e nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Descrição do Serviço</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                A Learning Platform é uma plataforma de aprendizado corporativo que oferece cursos, desafios, fóruns de discussão e ferramentas de desenvolvimento profissional para empresas e seus colaboradores.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Registro e Conta de Usuário</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Você deve fornecer informações precisas e completas durante o registro</li>
                <li>É sua responsabilidade manter a confidencialidade de sua senha</li>
                <li>Você é responsável por todas as atividades que ocorrem em sua conta</li>
                <li>Deve notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Uso Aceitável</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Você concorda em não usar a plataforma para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Violar leis ou regulamentos aplicáveis</li>
                <li>Transmitir conteúdo ofensivo, difamatório ou discriminatório</li>
                <li>Interferir no funcionamento da plataforma</li>
                <li>Tentar acessar dados ou áreas não autorizadas</li>
                <li>Compartilhar credenciais de acesso com terceiros</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Propriedade Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Todo o conteúdo da plataforma, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e software, é propriedade da Learning Platform ou de seus fornecedores de conteúdo e é protegido por leis de direitos autorais.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Privacidade e Proteção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Sua privacidade é importante para nós. Coletamos e processamos seus dados pessoais de acordo com nossa Política de Privacidade e em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Limitação de Responsabilidade</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                A Learning Platform não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Modificações dos Termos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. É sua responsabilidade revisar periodicamente estes termos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Contato</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através da página de suporte ou pelo email: legal@learningplatform.com
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Learning Platform. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;