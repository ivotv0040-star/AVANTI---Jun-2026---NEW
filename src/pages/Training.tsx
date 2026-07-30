import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, User, ChevronRight, ArrowUpRight, Check, Brain, 
  GraduationCap, Target, Calendar, Sparkles, ChevronDown, Award,
  ArrowRight, BookOpen, TrendingUp, HelpCircle
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
  strand: number;
}

export default function Training() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive state
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  
  // AI Simulator Widget state
  const [simQuestionIdx, setSimQuestionIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [simSubmitted, setSimSubmitted] = useState(false);

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

  // 3D Double Helix DNA Canvas Animation
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
      const size = Math.min(rect?.width || 450, 450);
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

    // Generate particles for a double helix DNA structure
    const particles: Particle[] = [];
    const pointsPerStrand = 36;
    const helixRadius = 0.55;
    const helixHeight = 1.3;

    for (let i = 0; i < pointsPerStrand; i++) {
      const t = i / pointsPerStrand;
      const theta1 = t * 6 * Math.PI; // 3 full turns

      // Strand 1
      const x1 = Math.cos(theta1) * helixRadius;
      const y1 = t * helixHeight - helixHeight / 2;
      const z1 = Math.sin(theta1) * helixRadius;

      // Strand 2 (180 degrees phase offset)
      const theta2 = theta1 + Math.PI;
      const x2 = Math.cos(theta2) * helixRadius;
      const y2 = y1;
      const z2 = Math.sin(theta2) * helixRadius;

      const hue1 = 250 + Math.random() * 20; // Purple
      const hue2 = 280 + Math.random() * 20; // Magenta

      particles.push({
        x: x1, y: y1, z: z1,
        ox: x1, oy: y1, oz: z1,
        color: `hsla(${hue1}, 85%, 65%, `,
        size: 2.5 + Math.random() * 1.5,
        strand: 1
      });

      particles.push({
        x: x2, y: y2, z: z2,
        ox: x2, oy: y2, oz: z2,
        color: `hsla(${hue2}, 85%, 65%, `,
        size: 2.5 + Math.random() * 1.5,
        strand: 2
      });
    }

    // Rotation state
    let angleY = 0.004;
    let angleX = 0.001;

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
        currentAngleY += (mouse.x / centerX) * 0.015;
        currentAngleX += (mouse.y / centerY) * 0.015;
      }

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      // Rotate helix
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
      const perspective = 2.0;
      const project = (p: Particle) => {
        const scale = perspective / (perspective + p.z);
        return {
          x: centerX + p.x * 130 * scale,
          y: centerY + p.y * 160 * scale,
          z: p.z,
          scale
        };
      };

      // Draw connection bars between helix strands
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i += 2) {
        const p1 = particles[i];
        const p2 = particles[i + 1];

        const proj1 = project(p1);
        const proj2 = project(p2);

        ctx.beginPath();
        ctx.moveTo(proj1.x, proj1.y);
        ctx.lineTo(proj2.x, proj2.y);

        const avgZ = (proj1.z + proj2.z) / 2;
        const depthAlpha = 0.15 + 0.85 * ((avgZ + 1) / 2);
        
        ctx.strokeStyle = `hsla(262, 80%, 65%, ${depthAlpha * 0.15})`;
        ctx.stroke();
      }

      // Sort by depth Z
      const projected = particles.map(p => ({ p, proj: project(p) }));
      projected.sort((a, b) => a.proj.z - b.proj.z);

      // Draw particles
      projected.forEach(({ p, proj }) => {
        const depthAlpha = 0.1 + 0.9 * ((proj.z + 1) / 2);
        
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale * 0.8, 0, Math.PI * 2);
        
        if (proj.z > 0.4) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(168, 85, 247, 0.6)";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color + (0.2 + 0.8 * depthAlpha) + ")";
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

  // Simulator Questions Data
  const simulatorQuestions = [
    {
      cert: "PSM-I (Scrum.org)",
      q: "O Time de Desenvolvimento não consegue entregar todos os itens selecionados do Backlog da Sprint. O que deve ser feito?",
      options: [
        { key: "A", text: "Prorrogar a duração da Sprint por mais alguns dias para finalizar o trabalho." },
        { key: "B", text: "Adicionar desenvolvedores na metade da Sprint para acelerar o ritmo." },
        { key: "C", text: "Negociar o escopo da Sprint com o Product Owner conforme os aprendizados surjam." },
        { key: "D", text: "Cancelar a Sprint imediatamente e iniciar o planejamento de uma nova Sprint." }
      ],
      correct: "C",
      explanation: "Correto! O escopo da Sprint é flexível e pode ser renegociado entre o Time de Desenvolvimento e o PO conforme novos aprendizados surjam, contanto que a Meta da Sprint (Sprint Goal) permaneça válida. O tempo da Sprint é fixo (time-boxed) e nunca deve ser estendido."
    },
    {
      cert: "AWS Cloud Practitioner",
      q: "Qual serviço da AWS permite armazenar objetos de forma altamente escalável e segura na nuvem?",
      options: [
        { key: "A", text: "Amazon EC2 (Elastic Compute Cloud)" },
        { key: "B", text: "Amazon RDS (Relational Database Service)" },
        { key: "C", text: "Amazon S3 (Simple Storage Service)" },
        { key: "D", text: "AWS Lambda" }
      ],
      correct: "C",
      explanation: "Correto! O Amazon S3 (Simple Storage Service) é um serviço de armazenamento de objetos projetado para armazenar e recuperar qualquer quantidade de dados de qualquer lugar da web, com durabilidade líder do setor."
    },
    {
      cert: "KMP I (Kanban University)",
      q: "Qual é a principal métrica utilizada em Kanban para medir o tempo total que um item leva para percorrer todo o fluxo, desde o início até a conclusão?",
      options: [
        { key: "A", text: "Throughput (Vazão de itens entregues)" },
        { key: "B", text: "Lead Time (Tempo de ciclo de entrega)" },
        { key: "C", text: "WIP (Work in Progress / Trabalho em Andamento)" },
        { key: "D", text: "Velocity (Velocidade de queima)" }
      ],
      correct: "B",
      explanation: "Correto! O Lead Time mede o tempo total decorrido desde o momento em que o trabalho é colocado em andamento (ou solicitado) até que seja totalmente entregue ao cliente final."
    }
  ];

  const handleSelectAnswer = (key: string) => {
    if (simSubmitted) return;
    setSelectedAns(key);
  };

  const handleSubmitSim = () => {
    if (!selectedAns) return;
    setSimSubmitted(true);
  };

  const handleNextQuestion = () => {
    setSelectedAns(null);
    setSimSubmitted(false);
    setSimQuestionIdx((prev) => (prev + 1) % simulatorQuestions.length);
  };

  // Certifications data
  const certifications = [
    {
      code: "PSM-I",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      category: "agility",
      desc: "A certificação mais reconhecida no mercado ágil. Comprova seu entendimento profundo da estrutura Scrum e como aplicá-la em equipes de desenvolvimento."
    },
    {
      code: "SAFe",
      name: "Leading SAFe 6.0",
      issuer: "Scaled Agile",
      category: "agility",
      desc: "Comprova que você sabe como orquestrar a agilidade em nível corporativo de grande escala, alinhando múltiplos times de Scrum e Kanban."
    },
    {
      code: "KMP I",
      name: "Kanban System Design",
      issuer: "Kanban University",
      category: "agility",
      desc: "Certificação oficial que valida a capacidade de projetar e implantar um sistema Kanban eficiente focado na redução de gargalos."
    },
    {
      code: "KMP II",
      name: "Kanban Systems Improvement",
      issuer: "Kanban University",
      category: "agility",
      desc: "Nível avançado de Kanban. Focado na otimização contínua de fluxo, governança, métricas de vazão (Throughput) e Lead Time."
    },
    {
      code: "PSPO-I",
      name: "Professional Scrum Product Owner I",
      issuer: "Scrum.org",
      category: "product",
      desc: "Focado em maximizar o valor de entrega do produto. Valida habilidades de gestão de backlog, ROI e alinhamento com stakeholders."
    },
    {
      code: "PMP",
      name: "Project Management Professional",
      issuer: "PMI",
      category: "project",
      desc: "O padrão ouro global em gestão de projetos. Valida o controle de orçamentos, escopo, riscos e cronogramas tradicionais e híbridos."
    },
    {
      code: "Cloud Practitioner",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      category: "it",
      desc: "Comprova conhecimento básico de arquitetura global em nuvem da AWS, segurança, cobrança e serviços de computação fundamentais."
    },
    {
      code: "Azure AI Associate",
      name: "Microsoft Certified: Azure AI Engineer",
      issuer: "Microsoft",
      category: "it",
      desc: "Valida sua capacidade de implantar e gerenciar soluções cognitivas de Inteligência Artificial na nuvem da Microsoft Azure."
    },
    {
      code: "Cloud Digital Leader",
      name: "Google Cloud Digital Leader",
      issuer: "Google Cloud",
      category: "it",
      desc: "Comprova a compreensão dos recursos principais do Google Cloud Platform (GCP) e como utilizá-los para agregar valor ao negócio."
    }
  ];

  const filteredCertifications = activeCategory === "all"
    ? certifications
    : certifications.filter(c => c.category === activeCategory);

  const faqData = [
    {
      q: "O Avan.TI realiza os exames oficiais de certificação?",
      a: "Não. Os exames oficiais são realizados e cobrados pelas respectivas certificadoras (Scrum.org, Scaled Agile, Kanban University, PMI, AWS, Microsoft, etc.). Nós fornecemos o treinamento preparatório completo, com instrutores autorizados, simulados e mentorias para você ser aprovado de primeira."
    },
    {
      q: "Como funcionam os simulados assistidos por Inteligência Artificial?",
      a: "Nossa ferramenta possui milhares de questões no padrão oficial dos exames. Ao responder, a IA analisa sua justificativa e, caso você erre, explica de forma interativa os conceitos exatos que motivaram o gabarito oficial, otimizando seus estudos."
    },
    {
      q: "Os treinamentos possuem aulas ao vivo ou gravadas?",
      a: "Temos ambas as modalidades. Nossas trilhas incluem videoaulas gravadas em alta resolução para estudos autônomos e encontros semanais ao vivo para resolução de dúvidas práticas e simulados com os instrutores."
    },
    {
      q: "Qual a garantia de aprovação?",
      a: "Se você concluir 100% da nossa trilha de estudos e atingir média igual ou superior a 85% nos nossos simulados da plataforma, mas não passar na prova oficial, oferecemos acesso estendido gratuito e mentorias individuais extras até sua aprovação."
    }
  ];

  const currentQuestion = simulatorQuestions[simQuestionIdx];

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 flex flex-col font-sans overflow-x-hidden selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-purple-900/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-indigo-900/10 blur-[130px]" />
        <div className="absolute top-[25%] left-[50%] -translate-x-1/2 w-[70%] h-[40%] rounded-full bg-purple-500/[0.02] blur-[150px]" />
      </div>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#09090e]/80 backdrop-blur-md border-b border-white/5 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-purple transition-transform group-hover:scale-105">
              <img src="/favicon.svg" alt="Avan.TI Logo" className="w-5 h-5 object-contain invert brightness-200" />
            </div>
            <span className="font-extrabold text-xl tracking-wider text-white">
              Avan.TI <span className="text-xs font-black text-purple-400 align-super tracking-normal">TRAINING</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center bg-neutral-900/40 border border-white/[0.06] backdrop-blur-md rounded-full px-1.5 py-1">
            {["Home", "Certificações", "Simulador IA", "Admissões", "FAQ"].map((item, idx) => (
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
              className="bg-gradient-primary hover:bg-gradient-primary-neon text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple"
            >
              Falar com Instrutor
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 flex flex-col lg:flex-row items-center justify-center min-h-[85vh] max-w-7xl mx-auto gap-12 text-left z-20">
        
        {/* Left Copy */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            Preparatórios Oficiais Avançados
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Passe de primeira nos exames de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Certificações de TI & Ágil.</span>
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Acelere sua carreira conquistando as credenciais mais valiosas do mercado. Treinamentos intensivos com simulados assistidos por IA em Agilidade, Produtos, Projetos, Nuvem e Inteligência Artificial.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-gradient-primary hover:bg-gradient-primary-neon text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple text-sm tracking-wide"
            >
              Conhecer Preparatórios
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto bg-neutral-900/40 hover:bg-neutral-900/70 border border-white/10 text-neutral-300 hover:text-white font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-sm tracking-wide"
            >
              Testar Simulado Grátis
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
            className="absolute z-20 pointer-events-none drop-shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          />
        </div>
      </section>

      {/* Certification Career Path Timeline */}
      <section className="py-24 px-6 border-t border-white/[0.03] bg-[#09090e]/30 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              A Trilha do Profissional de Sucesso.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Mapeie sua jornada de certificações e potencialize sua atratividade para grandes recrutadores globais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Steps */}
            {[
              {
                step: "01",
                phase: "Fundações e Entrada",
                desc: "Construa a base conceitual de TI e metodologias. Ideal para conquistar vagas de nível pleno e estruturar processos.",
                certs: ["PSM-I (Scrum)", "Cloud Practitioner (AWS)"]
              },
              {
                step: "02",
                phase: "Especialista Avançado",
                desc: "Amplie a visão com agilidade escalada em múltiplos times e fluxos otimizados com Kanban avançado.",
                certs: ["Leading SAFe 6.0", "KMP I & KMP II"]
              },
              {
                step: "03",
                phase: "Líder & Arquiteto",
                desc: "Gerencie portfólios corporativos híbridos e implante soluções avançadas de IA e Machine Learning na Nuvem.",
                certs: ["PMP (PMI)", "Azure AI Engineer"]
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-neutral-900/10 border border-white/[0.03] p-8 rounded-2xl relative text-left flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300">
                <div className="space-y-4">
                  <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500/20 to-pink-500/20 block">{item.step}</span>
                  <h3 className="font-extrabold text-lg text-neutral-100">{item.phase}</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.04]">
                  <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500 block mb-2">Certificações de Foco:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.certs.map((c, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid Section */}
      <section className="py-24 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Preparatórios Oficiais Disponíveis.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Filtre pelas principais categorias para encontrar a credencial certa para o seu próximo passo profissional.
            </p>
            
            {/* Category Filter Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {[
                { id: "all", label: "Todas" },
                { id: "agility", label: "Agilidade & Processos" },
                { id: "product", label: "Produtos" },
                { id: "project", label: "Projetos" },
                { id: "it", label: "TI (Nuvem & IA)" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                    activeCategory === cat.id 
                      ? "bg-gradient-primary text-white shadow-purple scale-105" 
                      : "bg-neutral-900/60 hover:bg-neutral-800/60 text-neutral-400 hover:text-white border border-white/[0.05]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {filteredCertifications.map((cert, index) => (
              <div
                key={index}
                onClick={() => navigate("/login")}
                className="group bg-[#0d0d15]/50 hover:bg-[#0e0e16] border border-white/[0.04] hover:border-purple-500/25 p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-purple cursor-pointer flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/25 text-purple-400 tracking-wide uppercase">
                      {cert.code}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono tracking-wider">
                      {cert.issuer}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-neutral-100 mb-3 group-hover:text-purple-300 transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {cert.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest mt-4">
                  Acessar Simulados &gt;
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AI Simulator LIVE Interactive Widget */}
      <section className="py-24 px-6 border-t border-white/[0.03] bg-[#09090e]/30 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual representation of LIVE AI simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[440px] rounded-2xl border border-white/5 bg-[#0e0e16] p-6 shadow-purple relative overflow-hidden flex flex-col gap-5 text-left">
              <div className="absolute top-[-30%] left-[-30%] w-[60%] aspect-square rounded-full bg-purple-500/10 blur-[80px]" />
              
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 tracking-widest uppercase pb-3 border-b border-white/5">
                <span className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                  SIMULADOR INTERATIVO (DEMO AO VIVO)
                </span>
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">QUESTÃO PREPARATÓRIA: {currentQuestion.cert}</span>
                <h4 className="font-bold text-sm sm:text-base text-neutral-200 leading-relaxed">
                  {currentQuestion.q}
                </h4>
              </div>

              <div className="space-y-2.5">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAns === option.key;
                  let optionStyle = "border-white/5 bg-neutral-950/40 text-neutral-400 hover:border-white/10";
                  
                  if (isSelected) {
                    optionStyle = "border-purple-500/40 bg-purple-500/5 text-purple-300";
                  }
                  if (simSubmitted) {
                    if (option.key === currentQuestion.correct) {
                      optionStyle = "border-green-500/50 bg-green-500/5 text-green-300";
                    } else if (isSelected) {
                      optionStyle = "border-red-500/50 bg-red-500/5 text-red-300";
                    }
                  }

                  return (
                    <button
                      key={option.key}
                      disabled={simSubmitted}
                      onClick={() => handleSelectAnswer(option.key)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 text-xs leading-relaxed ${optionStyle}`}
                    >
                      <span className="font-extrabold mr-2">{option.key})</span>
                      {option.text}
                    </button>
                  );
                })}
              </div>

              {simSubmitted ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedAns === currentQuestion.correct 
                      ? "bg-green-500/10 border-green-500/20 text-green-300"
                      : "bg-red-500/10 border-red-500/20 text-red-300"
                  }`}>
                    <span className="font-bold block mb-1">
                      {selectedAns === currentQuestion.correct ? "Excelente! Resposta Certa!" : "Não foi dessa vez."}
                    </span>
                    {currentQuestion.explanation}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-xs font-bold border border-white/10 hover:border-white/20 transition-all text-neutral-200"
                  >
                    Próxima Questão Demo &gt;
                  </button>
                </div>
              ) : (
                <button
                  disabled={!selectedAns}
                  onClick={handleSubmitSim}
                  className={`w-full py-2.5 rounded-full text-xs font-bold transition-all ${
                    selectedAns 
                      ? "bg-gradient-primary hover:bg-gradient-primary-neon text-white shadow shadow-purple"
                      : "bg-neutral-900/40 text-neutral-500 border border-white/5 cursor-not-allowed"
                  }`}
                >
                  Enviar Resposta
                </button>
              )}
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6 uppercase tracking-widest animate-pulse">
              <Brain className="w-3.5 h-3.5" />
              Treinamento Inteligente
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight max-w-xl">
              Simulados guiados por Inteligência Artificial.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Nossa tecnologia reconstrói exames com lógica oficial e detalha os feedbacks didaticamente na ponta da tela. Caso erre, a IA gera micro-aulas instantâneas para fixar o conteúdo que você precisa revisar antes da prova.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-primary hover:bg-gradient-primary-neon text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-purple text-sm tracking-wide"
            >
              Criar Conta e Estudar
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Pricing Section (REDESIGNED AS TICKETS) */}
      <section className="py-24 px-6 relative z-20 text-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Ingressos de Admissão aos Bootcamps.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Adquira seu passaporte de estudos para aprovação oficial. Vagas limitadas por lote de mentoria.
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-12">
            {[
              {
                title: "PREPARATÓRIO INDIVIDUAL",
                desc: "Acesso a 1 trilha preparatória oficial por 12 meses.",
                price: "290",
                features: ["Acesso por 1 ano à trilha oficial selecionada", "Simulados ilimitados assistidos por IA", "Suporte no fórum de dúvidas"],
                tag: "Lote 1: Disponível",
                highlight: false
              },
              {
                title: "COMBO CATEGORY PASS",
                desc: "Acesso a todas as trilhas de uma categoria (Agilidade ou TI).",
                price: "590",
                features: ["Todas as trilhas preparatórias da categoria escolhida", "Mentorias mensais ao vivo para simulados e dúvidas", "Garantia de aprovação estendida"],
                tag: "Lote 2: Restam apenas 4 vagas",
                highlight: true
              },
              {
                title: "ALL-ACCESS PASS",
                desc: "Acesso ilimitado a todas as certificações e simulados da plataforma.",
                price: "890",
                features: ["Acesso completo a todas as trilhas (Agilidade, Produtos, Projetos e TI)", "Mentorias ao vivo semanais com os instrutores", "Acesso por 2 anos com simulados e ferramentas exclusivas com IA"],
                tag: "Lote Final: Poucos disponíveis",
                highlight: false
              }
            ].map((ticket, idx) => (
              <div 
                key={idx}
                className={`bg-[#0d0d15]/80 border rounded-2xl overflow-hidden flex flex-col md:flex-row relative shadow transition-all duration-300 hover:scale-[1.01] ${
                  ticket.highlight 
                    ? "border-purple-500/40 shadow-purple" 
                    : "border-white/[0.04] hover:border-white/10"
                }`}
              >
                {/* Left Ticket Segment */}
                <div className="flex-1 p-8 text-left flex flex-col justify-between relative">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-black tracking-widest text-purple-400">{ticket.title}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">{ticket.tag}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mb-6">{ticket.desc}</p>
                    
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
                      {ticket.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dashed Separator Line */}
                <div className="hidden md:flex flex-col items-center justify-between relative py-4 w-px shrink-0">
                  <div className="absolute top-[-8px] left-[-7px] w-3 h-3 rounded-full bg-[#07070a] border-b border-white/[0.04]" />
                  <div className="h-full border-l border-dashed border-white/10" />
                  <div className="absolute bottom-[-8px] left-[-7px] w-3 h-3 rounded-full bg-[#07070a] border-t border-white/[0.04]" />
                </div>

                {/* Right Ticket Segment (Price / CTA) */}
                <div className="bg-neutral-900/30 md:w-64 p-8 flex flex-col items-center justify-center shrink-0 min-h-[160px] md:min-h-0">
                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500 block mb-1">VALOR DO INGRESSO</span>
                  <div className="flex items-baseline mb-6">
                    <span className="text-xs text-neutral-500 mr-1">R$</span>
                    <span className="text-4xl font-black text-white">{ticket.price}</span>
                    <span className="text-[10px] text-neutral-500 font-bold ml-1">/único</span>
                  </div>
                  <button
                    onClick={() => navigate("/login")}
                    className={`w-full py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 ${
                      ticket.highlight
                        ? "bg-gradient-primary hover:bg-gradient-primary-neon text-white shadow shadow-purple"
                        : "border border-white/10 hover:border-white/20 text-neutral-200 hover:bg-white/[0.02]"
                    }`}
                  >
                    Garantir Vaga
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion (REDESIGNED SIDE-BY-SIDE) */}
      <section className="py-24 px-6 border-t border-white/[0.03] bg-[#09090e]/30 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column (FAQ Intro) */}
          <div className="lg:col-span-5 text-left space-y-4 lg:sticky lg:top-24 h-fit">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ Oficial
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ficou com alguma dúvida?
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-md">
              Veja as respostas para as perguntas mais comuns de nossos estudantes sobre os exames e a plataforma.
            </p>
          </div>

          {/* Right Column (Accordion) */}
          <div className="lg:col-span-7 space-y-4">
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
                      isOpen ? "max-h-[220px] opacity-100 mb-4" : "max-h-0 opacity-0"
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

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.03] bg-neutral-950/40 text-center text-xs text-neutral-600 font-medium z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Avan.TI Training. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/")} className="hover:text-neutral-300 transition-colors">Voltar para Home</button>
            <button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Termos e Condições</button>
            <button onClick={() => navigate("/login")} className="hover:text-neutral-300 transition-colors">Suporte</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
