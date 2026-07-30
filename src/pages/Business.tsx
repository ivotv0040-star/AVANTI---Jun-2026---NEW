import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, User, ChevronRight, ArrowUpRight, Check, Brain, 
  BarChart3, Award, Users, ShieldAlert, Sparkles, ChevronDown
} from "lucide-react";

interface Particle {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  color: string;
  size: number;
}

export default function Business() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive state
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Mouse state for 3D Canvas
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isOver: false });

  // Scroll event for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Torus Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Handle resize
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      const size = Math.min(rect?.width || 480, 480);
      canvas.width = size * window.devicePixelRatio;
      canvas.height = size * window.devicePixelRatio;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      width = canvas.width;
      height = canvas.height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate particles in a Torus (Donut) shape
    const particles: Particle[] = [];
    const RingSegments = 16;
    const TubeSegments = 6;
    const R = 110; // Major radius
    const r = 40;  // Minor radius

    for (let i = 0; i < RingSegments; i++) {
      const theta = (i / RingSegments) * 2 * Math.PI;
      for (let j = 0; j < TubeSegments; j++) {
        const phi = (j / TubeSegments) * 2 * Math.PI;

        const x = (R + r * Math.cos(phi)) * Math.cos(theta) / 150;
        const y = (R + r * Math.cos(phi)) * Math.sin(theta) / 150;
        const z = r * Math.sin(phi) / 150;

        const hue = 265 + Math.random() * 25; // Business Indigo/Violet (265 - 290)
        const color = `hsla(${hue}, 85%, 65%, `;

        particles.push({
          x, y, z,
          ox: x, oy: y, oz: z,
          color,
          size: 1 + Math.random() * 1.5
        });
      }
    }

    // Rotation angle state
    let angleY = 0.003;
    let angleX = 0.0015;

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width / window.devicePixelRatio;
      const scaleY = canvas.height / rect.height / window.devicePixelRatio;
      
      const mouseX = (e.clientX - rect.left) * scaleX - (rect.width * scaleX) / 2;
      const mouseY = (e.clientY - rect.top) * scaleY - (rect.height * scaleY) / 2;

      mouseRef.current.targetX = mouseX;
      mouseRef.current.targetY = mouseY;
    };

    const onMouseEnter = () => {
      mouseRef.current.isOver = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.isOver = false;
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const currentWidth = width / window.devicePixelRatio;
      const currentHeight = height / window.devicePixelRatio;
      const centerX = currentWidth / 2;
      const centerY = currentHeight / 2;

      // Mouse inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      let currentAngleY = angleY;
      let currentAngleX = angleX;

      if (mouse.isOver) {
        currentAngleY += (mouse.x / centerX) * 0.012;
        currentAngleX += (mouse.y / centerY) * 0.012;
      }

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      // Rotate torus
      particles.forEach(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      // Projection
      const perspective = 2.2;
      const project = (p: Particle) => {
        const scale = perspective / (perspective + p.z);
        return {
          x: centerX + p.x * 160 * scale,
          y: centerY + p.y * 160 * scale,
          z: p.z,
          scale
        };
      };

      // Draw mesh connection lines
      const maxDist = 0.20;
      ctx.lineWidth = 0.45;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dz = particles[i].z - particles[j].z;
          const distSqr = dx*dx + dy*dy + dz*dz;

          if (distSqr < maxDist * maxDist) {
            const dist = Math.sqrt(distSqr);
            const opacityFactor = (1 - dist / maxDist);
            
            const p1 = project(particles[i]);
            const p2 = project(particles[j]);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const avgZ = (p1.z + p2.z) / 2;
            const depthAlpha = 0.15 + 0.85 * ((avgZ + 1) / 2);
            
            const hue = 265 + avgZ * 15;
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${opacityFactor * depthAlpha * 0.1})`;
            ctx.stroke();
          }
        }
      }

      // Sort by Z
      const projected = particles.map(p => ({ p, proj: project(p) }));
      projected.sort((a, b) => a.proj.z - b.proj.z);

      // Draw particles
      projected.forEach(({ p, proj }) => {
        const depthAlpha = 0.1 + 0.9 * ((proj.z + 1) / 2);
        
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale * 0.7, 0, Math.PI * 2);
        
        if (proj.z > 0.4) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "rgba(168, 85, 247, 0.6)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color + (0.15 + 0.85 * depthAlpha) + ")";
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      if (container) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  const faqData = [
    {
      q: "Como a IA cria o Plano de Desenvolvimento Individual (PDI)?",
      a: "A nossa Inteligência Artificial analisa o perfil de cargo do colaborador, seus conhecimentos atuais mapeados em um teste rápido de entrada e as metas da empresa. A partir daí, ela sugere semanalmente a ordem exata de trilhas de aprendizado necessárias para preencher os gaps técnicos."
    },
    {
      q: "É fácil integrar o Avan.TI com o LMS/Ambiente corporativo existente?",
      a: "Sim. Possuímos integrações nativas com os principais sistemas de gestão de aprendizagem (LMS) do mercado, bem como Webhooks, envio de logs automáticos e alertas via Slack e Microsoft Teams."
    },
    {
      q: "Como funciona a personalização da Loja de Prêmios?",
      a: "No painel administrativo do RH, você pode customizar os prêmios que os colaboradores resgatam usando seus Excelent Points. Você pode inserir recompensas internas (como dias de folga, jantares pagos ou brindes da sua própria empresa) junto com os prêmios padrões da nossa loja."
    },
    {
      q: "O faturamento por colaborador é cobrado apenas para contas ativas?",
      a: "Sim, você só paga pelos colaboradores que estiverem ativamente convidados no ambiente de estudos no mês do ciclo de faturamento."
    },
    {
      q: "A plataforma está em conformidade com a LGPD?",
      a: "Totalmente. Mantemos criptografia de ponta a ponta, auditorias de segurança de dados regulares e estamos em conformidade estrita com a Lei Geral de Proteção de Dados (LGPD) no manuseio das informações de seus colaboradores."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 flex flex-col font-sans overflow-x-hidden selection:bg-indigo-600/30 selection:text-indigo-200">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-indigo-900/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-purple-900/10 blur-[130px]" />
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-indigo-500/[0.02] blur-[150px]" />
      </div>

      {/* Header / Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#09090e]/80 backdrop-blur-md border-b border-white/5 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-purple transition-transform group-hover:scale-105">
              <img src="/favicon.svg" alt="Avan.TI Logo" className="w-5 h-5 object-contain invert brightness-200" />
            </div>
            <span className="font-extrabold text-xl tracking-wider text-white">
              Avan.TI <span className="text-xs font-black text-indigo-400 align-super tracking-normal">BUSINESS</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-full px-1.5 py-1">
            {["Home", "Solução", "RH Analytics", "Preços", "FAQ"].map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-neutral-400 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-accent hover:bg-gradient-primary text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple"
            >
              Falar com Consultor
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 flex flex-col lg:flex-row items-center justify-center min-h-[85vh] max-w-7xl mx-auto gap-12 text-left z-20">
        
        {/* Left Copy */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Treinamento Corporativo Autônomo
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Desenvolva e engaje equipes com <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Inteligência Artificial.</span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Reduza o turnover de tecnologia e acelere o onboarding do seu time técnico. Nossa IA monta e calibra PDIs inteligentes em tempo real conforme as metas estratégicas do seu negócio.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-gradient-accent hover:bg-gradient-primary text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple text-sm tracking-wide"
            >
              Agendar Demonstração
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-neutral-900/40 hover:bg-neutral-900/70 border border-white/10 text-neutral-300 hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-sm tracking-wide"
            >
              Ver Tabela de Preços
            </button>
          </div>
        </div>

        {/* Right Canvas */}
        <div 
          ref={containerRef}
          className="flex-1 relative w-full max-w-[440px] aspect-square flex items-center justify-center select-none"
        >
          <canvas 
            ref={canvasRef} 
            className="absolute z-20 pointer-events-none drop-shadow-[0_0_30px_rgba(99,102,241,0.15)]"
          />
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-24 px-6 border-t border-white/[0.03] bg-[#09090e]/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Gerencie a evolução técnica sem esforço manual.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Descubra os recursos nativos desenvolvidos especialmente para gestores de tecnologia e profissionais de T&D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-900/20 border border-white/[0.03] p-8 rounded-2xl text-left hover:border-indigo-500/25 transition-all duration-300 group hover:shadow-purple">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 transition-transform group-hover:scale-110">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-100 mb-3">PDI Guiado por IA</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Nossa IA mapeia gaps de hard skills de cada desenvolvedor e define trilhas semanais personalizadas, minimizando o tempo ocioso e maximizando a produtividade.
              </p>
            </div>

            <div className="bg-neutral-900/20 border border-white/[0.03] p-8 rounded-2xl text-left hover:border-indigo-500/25 transition-all duration-300 group hover:shadow-purple">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 transition-transform group-hover:scale-110">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-100 mb-3">HR Analytics Completo</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Acompanhe o engajamento, a retenção estimada e a distribuição de senioridade das suas equipes em dashboards em tempo real que exportam relatórios automaticamente.
              </p>
            </div>

            <div className="bg-neutral-900/20 border border-white/[0.03] p-8 rounded-2xl text-left hover:border-indigo-500/25 transition-all duration-300 group hover:shadow-purple">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 transition-transform group-hover:scale-110">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-lg text-neutral-100 mb-3">Recompensas Customizadas</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Aumente o engajamento de estudos permitindo que os funcionários troquem os pontos adquiridos na plataforma por prêmios e benefícios configurados pelo RH da sua empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Investimento flexível que cabe no orçamento.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Pague apenas pelos colaboradores ativos, sem taxas de setup ou taxas ocultas de implantação.
            </p>
            
            <div className="mt-8 inline-flex items-center bg-neutral-950/60 p-1 border border-white/[0.05] rounded-full">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  !isAnnual ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  isAnnual ? "bg-gradient-accent text-white shadow-purple" : "text-neutral-400 hover:text-white"
                }`}
              >
                Anual
                <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full font-extrabold text-white">
                  -20%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mt-16 text-left">
            
            {/* Plan 1 */}
            <div className="bg-[#0e0e16]/30 border border-white/[0.04] p-8 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors duration-300">
              <div>
                <h3 className="font-extrabold text-lg text-neutral-200">Start Team</h3>
                <p className="text-xs text-neutral-500 mt-1">Ideal para equipes de até 15 colaboradores.</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-neutral-100">
                    R$ {isAnnual ? "25" : "29"}
                  </span>
                  <span className="text-xs text-neutral-500"> / colaborador / mês</span>
                </div>
                <div className="h-px bg-white/[0.05] my-6" />
                <ul className="space-y-3.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Acesso total a todos os cursos básicos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Configuração básica de PDI com IA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Painel básico de relatórios de estudo</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full py-3 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-neutral-200 font-bold transition-all duration-300 text-xs tracking-wider uppercase"
              >
                Contratar Start
              </button>
            </div>

            {/* Plan 2 - Popular */}
            <div className="bg-[#0e0e16]/80 border-2 border-indigo-500/40 p-8 rounded-2xl flex flex-col justify-between relative shadow-purple hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-accent px-3.5 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-wider shadow">
                Mais Vendido
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-neutral-100">Growth Scale</h3>
                <p className="text-xs text-indigo-400 mt-1 font-medium">Equipes em crescimento acelerado (até 50 colaboradores).</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-neutral-100">
                    R$ {isAnnual ? "20" : "25"}
                  </span>
                  <span className="text-xs text-neutral-500"> / colaborador / mês</span>
                </div>
                <div className="h-px bg-white/[0.05] my-6" />
                <ul className="space-y-3.5 text-xs text-neutral-200 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Acesso total ilimitado à plataforma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>IA Avançada para PDI e gap-analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Painel HR Analytics completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Integrações com LMS e Slack/Teams</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full py-3.5 rounded-full bg-gradient-accent hover:bg-gradient-primary text-white font-black transition-all duration-300 text-xs tracking-wider uppercase shadow shadow-purple hover:scale-105 active:scale-95"
              >
                Garantir Growth
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-[#0e0e16]/30 border border-white/[0.04] p-8 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors duration-300">
              <div>
                <h3 className="font-extrabold text-lg text-neutral-200">Enterprise</h3>
                <p className="text-xs text-neutral-500 mt-1">Ambientes complexos acima de 50 colaboradores.</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-neutral-100">
                    Custom
                  </span>
                  <span className="text-xs text-neutral-500"> / sob consulta</span>
                </div>
                <div className="h-px bg-white/[0.05] my-6" />
                <ul className="space-y-3.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Todos os recursos do plano Growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>SSO (Single Sign-On) customizado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Suporte VIP e Customer Success Dedicado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Contrato de nível de serviço (SLA)</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full py-3 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-neutral-200 font-bold transition-all duration-300 text-xs tracking-wider uppercase"
              >
                Falar com Vendas
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 px-6 relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Perguntas Frequentes.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Esclareça suas principais dúvidas sobre o Avan.TI Business.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="border-b border-white/[0.04] py-3 text-left transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-4 text-neutral-200 hover:text-white font-bold text-sm sm:text-base transition-colors duration-300"
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-mono text-indigo-500/50">{(index + 1).toString().padStart(2, "0")}</span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-400" : ""}`} />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-[200px] opacity-100 mb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed pl-9">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.03] bg-neutral-950/40 text-center text-xs text-neutral-600 font-medium z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Avan.TI Business. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="hover:text-neutral-300 transition-colors">Voltar para Home</button>
            <button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Termos Corporativos</button>
            <button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Suporte</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
