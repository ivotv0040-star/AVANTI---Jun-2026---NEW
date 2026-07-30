import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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
              <h1 className="text-3xl font-bold text-foreground">Política de Privacidade</h1>
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
              <CardTitle>1. Informações que Coletamos</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Coletamos diferentes tipos de informações para fornecer e melhorar nossos serviços:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Informações Pessoais:</strong> Nome, email, telefone, cargo, empresa</li>
                <li><strong>Dados de Uso:</strong> Como você interage com nossa plataforma</li>
                <li><strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, dispositivo</li>
                <li><strong>Dados de Progresso:</strong> Cursos concluídos, pontuações, certificados</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Como Usamos suas Informações</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Fornecer, operar e manter nossa plataforma</li>
                <li>Personalizar sua experiência de aprendizado</li>
                <li>Comunicar atualizações, novos cursos e recursos</li>
                <li>Analisar tendências de uso e melhorar nossos serviços</li>
                <li>Garantir a segurança da plataforma</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Base Legal para Processamento (LGPD)</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Processamos seus dados pessoais com base em:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Consentimento:</strong> Quando você concorda com o processamento</li>
                <li><strong>Execução de Contrato:</strong> Para fornecer nossos serviços</li>
                <li><strong>Interesse Legítimo:</strong> Para melhorar nossos serviços e segurança</li>
                <li><strong>Obrigação Legal:</strong> Para cumprir requisitos regulamentares</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Compartilhamento de Informações</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Não vendemos, alugamos ou comercializamos suas informações pessoais. Podemos compartilhar dados apenas:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Com sua empresa/organização (dados de progresso e desempenho)</li>
                <li>Com fornecedores de serviços terceirizados (sob acordos rígidos)</li>
                <li>Quando exigido por lei ou ordem judicial</li>
                <li>Para proteger nossos direitos e segurança</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Seus Direitos (LGPD)</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>Você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Acesso:</strong> Saber quais dados pessoais processamos sobre você</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados pessoais</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
                <li><strong>Revogação:</strong> Retirar seu consentimento a qualquer momento</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Criptografia de dados em trânsito e repouso</li>
                <li>Controles de acesso rigorosos</li>
                <li>Monitoramento contínuo de segurança</li>
                <li>Treinamento regular da equipe</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, respeitando prazos legais e regulamentares aplicáveis.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Cookies e Tecnologias Similares</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo. Você pode gerenciar suas preferências de cookies nas configurações do navegador.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas por email ou através de um aviso em nossa plataforma.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contato e Encarregado de Dados</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados:
              </p>
              <ul className="list-none space-y-1 mt-2">
                <li><strong>Email:</strong> privacy@learningplatform.com</li>
                <li><strong>Telefone:</strong> (11) 1234-5678</li>
                <li><strong>Endereço:</strong> Rua das Empresas, 123, São Paulo - SP</li>
              </ul>
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

export default Privacy;