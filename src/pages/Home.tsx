import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, User, ChevronRight, ArrowUpRight, BookOpen, TrendingUp, Users, Target, 
  HelpCircle, Check, Code, Database, Brain, Cloud, Layers, Settings, ChevronDown, 
  Sparkles, Star, GraduationCap, Briefcase
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

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive state
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // Mouse state for 3D Canvas
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isOver: false });

  // Scroll event for transparent header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3D Sphere Canvas Animation
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

    // Generate particles on sphere
    const particles: Particle[] = [];
    const N = 260; // Number of particles
    const radius = 150; // Sphere radius in px

    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      const hue = 255 + Math.random() * 30; // Shades of purple/indigo (255 - 285)
      const color = `hsla(${hue}, 85%, 65%, `;

      particles.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        color,
        size: 1 + Math.random() * 2 // 1px to 3px
      });
    }

    // Rotation state
    let angleY = 0.002;
    let angleX = 0.001;

    // Track mouse move relative to canvas center
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

      // Smooth mouse coordinates
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      let currentAngleY = angleY;
      let currentAngleX = angleX;

      if (mouse.isOver) {
        currentAngleY += (mouse.x / centerX) * 0.015;
        currentAngleX += (mouse.y / centerY) * 0.015;
      } else {
        currentAngleY = 0.0015;
        currentAngleX = 0.0008;
      }

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      // Rotate particles in 3D
      particles.forEach(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        p.x = x1;
        p.y = y2;
        p.z = z2;
      });

      // Projection parameters
      const perspective = 2.2;
      const project = (p: Particle) => {
        const scale = perspective / (perspective + p.z);
        return {
          x: centerX + p.x * radius * scale,
          y: centerY + p.y * radius * scale,
          z: p.z,
          scale
        };
      };

      // Draw connection lines (3D Mesh)
      const maxDist = 0.22;
      ctx.lineWidth = 0.45;
      
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
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
            
            const hue = 255 + avgZ * 15;
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${opacityFactor * depthAlpha * 0.12})`;
            ctx.stroke();
          }
        }
      }

      // Sort by depth Z
      const projected = particles.map(p => ({ p, proj: project(p) }));
      projected.sort((a, b) => a.proj.z - b.proj.z);

      // Draw particles
      projected.forEach(({ p, proj }) => {
        const depthAlpha = 0.1 + 0.9 * ((proj.z + 1) / 2);
        
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale * 0.6, 0, Math.PI * 2);
        
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

  // FAQ Topics
  const faqData = [
    {
      q: "O que está incluso na assinatura do Avan.TI?",
      a: "A assinatura dá acesso completo a todas as nossas trilhas de aprendizado (Programação, Front-end, Dados & IA, DevOps, UI/UX e Gestão), projetos colaborativos no Talent Lab, fórum de comunidade, desafios semanais com recompensas em Excelent Points e certificados reconhecidos pelo mercado."
    },
    {
      q: "Como funcionam os Excelent Points?",
      a: "Excelent Points são as moedas que você ganha ao concluir cursos, subir de nível (XP), participar de discussões no fórum e vencer desafios de programação. Eles podem ser trocados na nossa loja por prêmios físicos e digitais como hoodies, fones de ouvido sem fio, cafeteiras, air fryers ou cupons especiais."
    },
    {
      q: "Preciso de conhecimento prévio em programação para começar?",
      a: "Não! Temos trilhas de aprendizado estruturadas que começam do absoluto zero (lógica de programação e conceitos básicos) e vão até o nível avançado de engenharia de software e arquitetura."
    },
    {
      q: "O que é o Talent Lab?",
      a: "É o nosso laboratório de aceleração onde os alunos do plano Pro e Expert desenvolvem projetos reais em grupos multidisciplinares, sob a mentoria de engenheiros e designers sêniores do mercado. Perfeito para preencher seu portfólio no GitHub com experiência prática real."
    },
    {
      q: "Posso cancelar minha assinatura a qualquer momento?",
      a: "Sim, você pode cancelar a renovação da sua assinatura diretamente pelo painel do seu perfil, sem burocracia ou taxas de cancelamento. O acesso continuará ativo até o término do período contratado (mensal ou anual)."
    },
    {
      q: "Os certificados são cobrados à parte?",
      a: "Não. Todos os certificados gerados após a conclusão de uma trilha ou curso já estão inclusos na sua assinatura, sem qualquer taxa extra."
    },
    {
      q: "Existem planos especiais para empresas?",
      a: "Sim, possuímos o Avan.TI Corporate com trilhas personalizadas para equipes, painel de controle de progresso para RHs e integrações de LMS. Entre em contato conosco através da página de Suporte."
    }
  ];

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 flex flex-col font-sans overflow-x-hidden selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* 1. Promo Banner */}
      <div className="bg-gradient-primary py-2.5 px-4 text-center relative z-50 text-white font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 shadow-purple">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>Oferta Especial: Estude 2 anos pagando o equivalente a R$ 85/mês no plano Pro!</span>
        <button 
          onClick={() => navigate("/login")}
          className="bg-white text-purple-700 font-bold px-3 py-1 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 shadow-sm ml-2"
        >
          Aproveitar Desconto
        </button>
      </div>

      {/* Background Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-purple-900/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-indigo-900/10 blur-[130px]" />
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-purple-500/[0.02] blur-[150px]" />
        <div className="absolute top-[50%] left-[20%] w-[40%] aspect-square rounded-full bg-purple-600/[0.02] blur-[140px]" />
      </div>

      {/* Header / Navbar */}
      <header 
        className={`fixed top-11 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#09090e]/80 backdrop-blur-md border-b border-white/5 py-4" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-purple transition-transform group-hover:scale-105">
              <img src="/favicon.svg" alt="Avan.TI Logo" className="w-5 h-5 object-contain invert brightness-200" />
            </div>
            <span className="font-extrabold text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              Avan.TI
            </span>
          </div>

          {/* Center Navigation Pill */}
          <nav className="hidden md:flex items-center bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-full px-1.5 py-1">
            {["Home", "Aprendizado", "Carreira", "Cultura", "Desafios", "Sobre"].map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate("/login")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  idx === 0 
                    ? "bg-white/10 text-white shadow-sm" 
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/login")}
              className="w-9 h-9 rounded-full bg-neutral-900/50 hover:bg-neutral-800/50 border border-white/[0.06] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="w-9 h-9 rounded-full bg-neutral-900/50 hover:bg-neutral-800/50 border border-white/[0.06] flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigate("/login")}
              className="relative overflow-hidden bg-gradient-primary hover:bg-gradient-primary-neon text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple"
            >
              Acessar Plataforma
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-40 pb-20 px-6 flex flex-col items-center justify-center min-h-[90vh]">
        {/* Sphere Container */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-[480px] aspect-square flex items-center justify-center select-none cursor-pointer"
        >
          {/* Central Logo Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-white/95 to-neutral-500 drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] animate-pulse-soft">
              Avan.TI
            </h1>
          </div>
          
          {/* Canvas for 3D Rotating sphere */}
          <canvas 
            ref={canvasRef} 
            className="absolute z-20 pointer-events-none drop-shadow-[0_0_25px_rgba(139,92,246,0.15)]"
          />
        </div>

        {/* Hero Copy & Call To Action */}
        <div className="max-w-2xl text-center z-30 -mt-2">
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-medium max-w-xl mx-auto leading-relaxed px-4 drop-shadow-sm">
            A maior escola de tecnologia que colabora com a comunidade.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-gradient-primary hover:bg-gradient-primary-neon text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple text-sm tracking-wide"
            >
              Começar Agora
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-neutral-900/40 hover:bg-neutral-900/70 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-sm tracking-wide"
            >
              Ver Planos
            </button>
          </div>
        </div>
      </section>

      {/* 3. Careers Section */}
      <section className="py-24 px-6 border-t border-white/[0.03] bg-[#09090e]/30 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Avatar Graphic */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full relative bg-gradient-to-tr from-purple-600/30 to-indigo-600/30 flex items-center justify-center p-2.5 overflow-visible">
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-pulse-soft pointer-events-none" />
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-purple-500/30 shadow-purple relative bg-[#0d0d15] flex items-center justify-center">
                <GraduationCap className="w-40 h-40 text-purple-400/80 animate-float" />
              </div>
              
              {/* Floating tech badges */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <div className="absolute bottom-6 -left-6 w-12 h-12 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="absolute bottom-10 -right-4 w-12 h-12 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Brain className="w-5 h-5 text-pink-400" />
              </div>
            </div>
          </div>
          
          {/* Right Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6 w-fit uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              Carreiras Avan.TI
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight max-w-xl">
              Trilhas de Carreira que te conectam ao mercado de trabalho.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
              Desenvolva as habilidades mais requisitadas pelas empresas globais. Nossas formações possuem módulos práticos, desafios gamificados de alta performance e revisões individuais de código para você decolar na tecnologia.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-200">Portfólio com Projetos Reais</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Construa softwares funcionais em equipe no Talent Lab.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-200">Gamificação & Desafios</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Ganhe XP e prêmios reais trocando seus Excelent Points.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="bg-neutral-900/50 hover:bg-neutral-800/50 border border-white/10 hover:border-white/20 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 w-fit text-sm"
            >
              Conhecer Formações
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Skills Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Explore as principais áreas de tecnologia.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Cursos atualizados organizados em trilhas didáticas estruturadas para o seu nível de experiência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cards */}
            {[
              {
                icon: Code,
                title: "Programação & Back-end",
                desc: "Aprenda a criar aplicações robustas utilizando Java, Python, Node.js, C#, PHP e arquiteturas de microserviços completas.",
                color: "text-purple-400"
              },
              {
                icon: Layers,
                title: "Front-end & Web",
                desc: "Desenvolva interfaces dinâmicas e responsivas com React, TypeScript, HTML, CSS, Next.js e otimizações de performance SEO.",
                color: "text-indigo-400"
              },
              {
                icon: Brain,
                title: "Ciência de Dados & IA",
                desc: "Domine engenharia de dados, machine learning, análise de estatísticas com Python, SQL, inteligência artificial e prompt engineering.",
                color: "text-pink-400"
              },
              {
                icon: Cloud,
                title: "DevOps & Cloud Computing",
                desc: "Configure infraestruturas escaláveis em nuvem na AWS, Azure, CI/CD, contêineres Docker, orquestração Kubernetes e Linux.",
                color: "text-blue-400"
              },
              {
                icon: Settings,
                title: "UI/UX & Design de Produto",
                desc: "Entenda UX Research, crie protótipos funcionais de alta fidelidade no Figma e estude design systems consistentes.",
                color: "text-teal-400"
              },
              {
                icon: Users,
                title: "Inovação & Gestão Ágil",
                desc: "Lidere equipes com metodologia ágil (Scrum, Kanban), gerencie produtos digitais (Product Management) e analise métricas de mercado.",
                color: "text-orange-400"
              }
            ].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate("/login")}
                  className="group bg-[#09090e]/40 hover:bg-[#0d0d15] border border-white/[0.04] hover:border-purple-500/25 p-8 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-purple cursor-pointer flex flex-col text-left"
                >
                  <div className={`w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${skill.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-neutral-100 mb-3 group-hover:text-purple-300 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                    {skill.desc}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest mt-auto">
                    Ver trilhas <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Partners Bar */}
      <section className="py-16 border-y border-white/[0.03] bg-neutral-950/20 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-10">
            Nossos alunos desenvolvem carreiras em empresas líderes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale hover:opacity-75 transition-opacity duration-300">
            {["Google", "Microsoft", "Amazon", "Meta", "Salesforce", "Netflix"].map((name, i) => (
              <span key={i} className="font-black text-xl md:text-2xl tracking-wider text-white select-none">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Talent Lab Showcase */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#09090e]/40">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-purple-500/[0.02] blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Copy */}
          <div className="lg:col-span-6 text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold mb-6 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Talent Lab
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight max-w-xl">
              Aprenda colaborando em equipes reais.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              No **Talent Lab**, você não estuda de forma isolada. Trabalhe com desenvolvedores, cientistas de dados e designers ágeis para conceber, desenvolver e colocar em produção softwares e soluções funcionais, replicando a rotina de grandes squads corporativas.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-primary hover:bg-gradient-primary-neon text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple text-sm tracking-wide"
            >
              Participar do Laboratório
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Immersive Grid */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full max-w-[450px] aspect-video rounded-2xl border border-white/5 bg-[#0e0e16] p-6 shadow-purple relative overflow-hidden flex flex-col justify-between">
              {/* Decorative glows */}
              <div className="absolute top-[-50%] right-[-50%] w-[80%] aspect-square rounded-full bg-purple-500/10 blur-[80px]" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-neutral-500 font-mono tracking-widest">AVANTI-TALENT-LAB_SQUAD-12</span>
              </div>
              
              <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                <span className="text-xs text-purple-400 font-semibold tracking-widest uppercase">PROJETO EM PRODUÇÃO</span>
                <span className="text-2xl font-black tracking-wide text-neutral-100">Intelligent Hub v2.1</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  <span>5 Integrantes Online</span>
                </div>
                <span className="text-purple-400 font-bold hover:underline cursor-pointer" onClick={() => navigate("/login")}>Acessar Repositório &gt;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Success Stories Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Quem estuda no Avan.TI conquista resultados.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Descubra depoimentos de profissionais que transformaram suas carreiras por meio da nossa formação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                name: "Mariana Souza",
                role: "Front-end Software Engineer no Google",
                text: "A metodologia de trilhas de carreira do Avan.TI me deu exatamente a base teórica e prática necessária para passar nas entrevistas técnicas mais difíceis do mercado global.",
                avatar: "MS"
              },
              {
                num: "02",
                name: "Carlos Lima",
                role: "Engenheiro de Dados Sênior na Microsoft",
                text: "O Talent Lab foi fundamental. Desenvolver ferramentas reais em equipe e sob a mentoria de líderes de tecnologia foi o grande diferencial no meu currículo profissional.",
                avatar: "CL"
              },
              {
                num: "03",
                name: "Aline Rocha",
                role: "Product Manager na Amazon",
                text: "O Avan.TI une perfeitamente códigos e conceitos ágeis. Consegui transicionar de área entendendo tanto a parte de negócios quanto a estrutura técnica de engenharia.",
                avatar: "AR"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-neutral-900/20 border border-white/[0.03] p-8 rounded-2xl relative text-left flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 group">
                <div>
                  <span className="text-4xl font-black text-purple-500/10 group-hover:text-purple-500/30 transition-colors duration-300 block mb-6">{item.num}</span>
                  <p className="text-neutral-300 text-sm leading-relaxed italic mb-8">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/[0.04] pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-sm text-white shadow-purple shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-neutral-100">{item.name}</h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Pricing Plans Section */}
      <section className="py-24 px-6 border-t border-white/[0.03] bg-[#09090e]/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Invista no seu futuro profissional.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Planos acessíveis com recursos avançados que aceleram seu aprendizado na tecnologia.
            </p>
            
            {/* Toggle Billing State */}
            <div className="mt-8 inline-flex items-center bg-neutral-950/60 p-1 border border-white/[0.05] rounded-full">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  !isAnnual 
                    ? "bg-white/10 text-white shadow" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                  isAnnual 
                    ? "bg-gradient-primary text-white shadow-purple" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Anual
                <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full font-extrabold text-white scale-90">
                  -35%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto mt-16">
            
            {/* Plan 1 */}
            <div className="bg-[#0e0e16]/30 border border-white/[0.04] p-8 rounded-2xl flex flex-col justify-between text-left relative hover:border-white/10 transition-colors duration-300">
              <div>
                <h3 className="font-extrabold text-lg text-neutral-200">Dev Start</h3>
                <p className="text-xs text-neutral-500 mt-1">Ideal para dar os primeiros passos.</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-neutral-100">
                    R$ {isAnnual ? "39" : "49"}
                  </span>
                  <span className="text-xs text-neutral-500"> / mês</span>
                </div>
                <div className="h-px bg-white/[0.05] my-6" />
                <ul className="space-y-3.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Acesso a mais de 200 cursos básicos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Fórum geral de dúvidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Certificados de conclusão</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full py-3 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-neutral-200 font-bold transition-all duration-300 text-xs tracking-wider uppercase"
              >
                Assinar Plano
              </button>
            </div>

            {/* Plan 2 - Popular */}
            <div className="bg-[#0e0e16]/80 border-2 border-purple-500/40 p-8 rounded-2xl flex flex-col justify-between text-left relative shadow-purple hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-primary px-3.5 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-wider shadow">
                Mais Escolhido
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-neutral-100 flex items-center gap-1.5">
                  Dev Pro
                  <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                </h3>
                <p className="text-xs text-purple-400/80 mt-1 font-medium">Acesso total e gamificação.</p>
                <div className="my-6">
                  <span className="text-4xl font-black text-neutral-100">
                    R$ {isAnnual ? "85" : "99"}
                  </span>
                  <span className="text-xs text-neutral-500"> / mês</span>
                </div>
                <div className="h-px bg-white/[0.05] my-6" />
                <ul className="space-y-3.5 text-xs text-neutral-200 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Acesso ilimitado a todos os cursos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Trilhas de carreira completas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Desafios semanais valendo prêmios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Acesso à loja Excelent Points</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Revisão básica de código no GitHub</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full py-3.5 rounded-full bg-gradient-primary hover:bg-gradient-primary-neon text-white font-black transition-all duration-300 text-xs tracking-wider uppercase shadow shadow-purple hover:scale-105 active:scale-95"
              >
                Garantir Plano Pro
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-[#0e0e16]/30 border border-white/[0.04] p-8 rounded-2xl flex flex-col justify-between text-left relative hover:border-white/10 transition-colors duration-300">
              <div>
                <h3 className="font-extrabold text-lg text-neutral-200">Dev Expert</h3>
                <p className="text-xs text-neutral-500 mt-1">Para formação avançada em equipe.</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-neutral-100">
                    R$ {isAnnual ? "119" : "149"}
                  </span>
                  <span className="text-xs text-neutral-500"> / mês</span>
                </div>
                <div className="h-px bg-white/[0.05] my-6" />
                <ul className="space-y-3.5 text-xs text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Tudo o que está incluso no plano Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Acesso ao Avan.TI Talent Lab</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Mentoria mensal coletiva com especialistas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Revisões prioritárias no GitHub</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full py-3 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/[0.02] text-neutral-200 font-bold transition-all duration-300 text-xs tracking-wider uppercase"
              >
                Assinar Plano Expert
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-24 px-6 relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Perguntas Frequentes.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Esclareça suas principais dúvidas sobre o funcionamento da nossa plataforma.
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
                    <span className="text-xs font-mono text-purple-500/50">{(index + 1).toString().padStart(2, "0")}</span>
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-purple-400" : ""}`} />
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

      {/* 10. Rich Footer */}
      <footer className="pt-24 pb-12 border-t border-white/[0.03] bg-neutral-950/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 relative z-20 text-left">
          
          <div className="col-span-2 flex flex-col justify-start">
            <div className="flex items-center gap-3 cursor-pointer group mb-6" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-purple transition-transform group-hover:scale-105">
                <img src="/favicon.svg" alt="Avan.TI Logo" className="w-5 h-5 object-contain invert brightness-200" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                Avan.TI
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              A plataforma definitiva de aprendizado, desenvolvimento profissional e networking técnico. Aprenda na maior escola de tecnologia que colabora com a comunidade.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs text-neutral-200 uppercase tracking-widest mb-4">Plataforma</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Trilhas de Aprendizado</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Talent Lab</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Excelent Points</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Mentoria Individual</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-neutral-200 uppercase tracking-widest mb-4">Corporativo</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Avan.TI para Empresas</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">LMS Integration</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Parcerias</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Blog de Engenharia</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-neutral-200 uppercase tracking-widest mb-4">Suporte & FAQ</h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Central de Ajuda</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Políticas de Reembolso</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Termos de Uso</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Fale Conosco</button></li>
            </ul>
          </div>

        </div>

        {/* Large Watermark */}
        <div className="w-full text-center pointer-events-none select-none relative z-10 overflow-hidden mt-16 max-h-[140px]">
          <span className="text-[12vw] font-black leading-none tracking-widest text-white/[0.015] select-none block uppercase font-sans">
            AVAN.TI
          </span>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/[0.04] text-center text-[10px] text-neutral-600 font-medium relative z-20">
          © {new Date().getFullYear()} Avan.TI. Desenvolvido para colaboração e inovação tecnológica contínua.
        </div>
      </footer>

    </div>
  );
}
