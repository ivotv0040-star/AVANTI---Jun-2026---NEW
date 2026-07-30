import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Header
    'search.placeholder': 'Pesquisar Aqui...',
    'level': 'Lv.',
    'notifications': 'Notificações',
    'language': 'Idioma',
    'profile': 'Perfil',
    
    // Dashboard
    'dashboard.title': 'Dashboard Inicial',
    'dashboard.greeting': 'Olá, bom dia',
    'dashboard.subtitle': 'O que vamos fazer hoje? :)',
    
    // Learning Progress
    'learning.progress': 'Progresso do Aprendizado',
    'learning.tracks': 'Trilhas ativas',
    'learning.resume': 'Retomar',
    
    // Goals
    'goals.annual': 'Meta Anual de Aprendizado',
    'goals.career': 'Metas de Carreira',
    'goals.defined': 'Metas Definidas',
    'goals.details': 'Ver detalhes',
    
    // Activities
    'forum.activities': 'Atividades no Fórum de Cultura',
    'forum.discussions': 'Novas Discussões',
    'challenges': 'Desafios',
    'challenges.available': 'Desafios Disponíveis',
    
    // Recognition
    'recognition.title': 'Envie seu reconhecimento',
    'recognition.subtitle': 'Reconheça colegas e conquiste badges especiais',
    'recognition.send': 'Enviar Reconhecimento',
    
    // Events
    'events.upcoming': 'Próximos Eventos',
    'events.view': 'Ver Agenda Completa',
    
    // Recent Activities
    'activities.recent': 'Atividades Recentes',
    'activities.view': 'Ver Todas',
    
    // Sidebar
    'nav.home': 'Início',
    'nav.learning': 'Aprendizado',
    'nav.career': 'Carreira',
    'nav.culture': 'Cultura',
    'nav.challenges': 'Desafios',
    'excellent.points': 'Troque seus',
    'excellent.points.subtitle': 'Excelent Points!',
    
    // User Menu
    'user.profile': 'Meu Perfil',
    'user.level': 'Nível',
    'user.xp': 'XP',
    'user.ranking': 'Ranking do Mês',
    'user.badges': 'Badges e Conquistas',
    'user.hours': 'Horas de Aprendizado',
    'user.status.bronze': 'Bronze',
    'user.status.silver': 'Prata',
    'user.status.gold': 'Ouro',
    'user.logout': 'Sair',
    
    // Notifications
    'notification.new.course': 'Novo curso disponível: "React Avançado"',
    'notification.badge.earned': 'Parabéns! Você ganhou o badge "Primeiro Curso"',
    'notification.deadline': 'Lembrete: Prazo da trilha "JavaScript" em 3 dias',
    'notification.recognition': 'Você recebeu um reconhecimento de João Silva',
    
    // Level tooltip
    'level.current': 'XP Atual',
    'level.next': 'Próximo Nível',
    'level.remaining': 'XP Restante',
    
    // Learning Page
    'learning.page.title': 'Aprendizado',
    'learning.page.subtitle': 'Gerencie suas trilhas e descubra novos cursos',
    'learning.enrolled.title': 'Minhas Trilhas Ativas',
    'learning.continue': 'Continuar',
    'learning.search.placeholder': 'Buscar cursos...',
    'learning.filter.category': 'Categoria',
    'learning.filter.difficulty': 'Dificuldade',
    'learning.filter.all': 'Todos',
    'learning.available.title': 'Cursos Disponíveis',
    'learning.enroll': 'Matricular-se',
    'learning.no.results': 'Nenhum curso encontrado',
    'learning.try.different.filters': 'Tente filtros diferentes para encontrar cursos',
    
    // Career Page
    'career.page.title': 'Carreira',
    'career.page.subtitle': 'Planeje sua trajetória profissional e alcance suas metas',
    'career.tab.planning': 'Planejamento',
    'career.tab.goals': 'Metas',
    'career.tab.feedback': 'Feedback',
    'career.tab.plans': 'Planos',
    'career.current.position': 'Posição Atual',
    'career.path.title': 'Trajetória de Carreira',
    'career.path.description': 'Defina suas metas de curto, médio e longo prazo',
    'career.timeframe.short': 'Curto Prazo (6 meses)',
    'career.timeframe.medium': 'Médio Prazo (1.5 anos)',
    'career.timeframe.long': 'Longo Prazo (3 anos)',
    'career.months': 'meses',
    'career.goals.add': 'Adicionar Nova Meta',
    'career.goals.placeholder': 'Digite sua meta...',
    'career.goals.type.annual': 'Anual',
    'career.goals.type.semestral': 'Semestral',
    'career.goals.deadline': 'Prazo',
    'career.goals.progress': 'Progresso',
    'career.feedback.request': 'Solicitar Feedback',
    'career.feedback.description': 'Peça feedback específico sobre suas competências e desempenho',
    'career.feedback.placeholder': 'Sobre que aspecto você gostaria de receber feedback?',
    'career.feedback.send': 'Enviar Solicitação',
    'career.feedback.recent': 'Feedbacks Recentes',
    'career.plans.annual': 'Planos Anuais',
    'career.plans.semestral': 'Planos Semestrais',
    'career.plans.status.concluido': 'Concluído',
    'career.plans.status.em-andamento': 'Em Andamento',
    'career.plans.status.planejado': 'Planejado',
    
    // Culture Page
    'culture.page.title': 'Fórum de Cultura',
    'culture.page.subtitle': 'Participe da construção da cultura da empresa com suas ideias e sugestões',
    'culture.stats.posts': 'Posts Totais',
    'culture.stats.likes': 'Likes Totais',
    'culture.stats.polls': 'Enquetes Ativas',
    'culture.stats.contributors': 'Contribuidores',
    'culture.new.post.title': 'Nova Sugestão',
    'culture.new.post.title.placeholder': 'Título da sua sugestão...',
    'culture.new.post.content.placeholder': 'Descreva sua ideia para melhorar nossa cultura, eventos, campanhas ou iniciativas...',
    'culture.new.post.submit': 'Publicar Sugestão',
    'culture.recent.posts': 'Discussões Recentes',
    'culture.active.polls': 'Enquetes Ativas',
    'culture.poll.vote': 'Votar',
    'culture.top.contributors': 'Top Contribuidores',
    
    // Challenges Page
    'challenges.page.title': 'Desafios',
    'challenges.page.subtitle': 'Participe dos desafios e forme equipes para resolver problemas da empresa',
    'challenges.stats.active': 'Desafios Ativos',
    'challenges.stats.enrolled': 'Inscritos',
    'challenges.stats.completed': 'Concluídos',
    'challenges.stats.points.earned': 'Pontos Ganhos',
    'challenges.search.placeholder': 'Buscar desafios...',
    'challenges.filter.all': 'Todas',
    'challenges.filter.easy': 'Fácil',
    'challenges.filter.medium': 'Médio',
    'challenges.filter.hard': 'Difícil',
    'challenges.create.new': 'Novo Desafio',
    'challenges.create.title': 'Criar Novo Desafio',
    'challenges.create.title.placeholder': 'Título do desafio...',
    'challenges.create.description.placeholder': 'Descreva o desafio e o que precisa ser resolvido...',
    'challenges.create.difficulty': 'Dificuldade',
    'challenges.create.reward': 'Recompensa (pontos)',
    'challenges.create.deadline': 'Prazo',
    'challenges.create.tag': 'Tag/Objetivo',
    'challenges.create.submit': 'Criar Desafio',
    'challenges.create.cancel': 'Cancelar',
    'challenges.enrolled': 'Inscrito',
    'challenges.join': 'Participar',
    'challenges.details': 'Detalhes',
    'challenges.no.results': 'Nenhum desafio encontrado',
    'challenges.try.different.filters': 'Tente filtros diferentes para encontrar desafios'
  },
  en: {
    // Header
    'search.placeholder': 'Search Here...',
    'level': 'Lv.',
    'notifications': 'Notifications',
    'language': 'Language',
    'profile': 'Profile',
    
    // Dashboard
    'dashboard.title': 'Initial Dashboard',
    'dashboard.greeting': 'Hello, good morning',
    'dashboard.subtitle': 'What shall we do today? :)',
    
    // Learning Progress
    'learning.progress': 'Learning Progress',
    'learning.tracks': 'Active Tracks',
    'learning.resume': 'Resume',
    
    // Goals
    'goals.annual': 'Annual Learning Goal',
    'goals.career': 'Career Goals',
    'goals.defined': 'Goals Defined',
    'goals.details': 'View Details',
    
    // Activities
    'forum.activities': 'Culture Forum Activities',
    'forum.discussions': 'New Discussions',
    'challenges': 'Challenges',
    'challenges.available': 'Available Challenges',
    
    // Recognition
    'recognition.title': 'Send your recognition',
    'recognition.subtitle': 'Recognize colleagues and earn special badges',
    'recognition.send': 'Send Recognition',
    
    // Events
    'events.upcoming': 'Upcoming Events',
    'events.view': 'View Full Calendar',
    
    // Recent Activities
    'activities.recent': 'Recent Activities',
    'activities.view': 'View All',
    
    // Sidebar
    'nav.home': 'Home',
    'nav.learning': 'Learning',
    'nav.career': 'Career',
    'nav.culture': 'Culture',
    'nav.challenges': 'Challenges',
    'excellent.points': 'Exchange your',
    'excellent.points.subtitle': 'Excellent Points!',
    
    // User Menu
    'user.profile': 'My Profile',
    'user.level': 'Level',
    'user.xp': 'XP',
    'user.ranking': 'Monthly Ranking',
    'user.badges': 'Badges & Achievements',
    'user.hours': 'Learning Hours',
    'user.status.bronze': 'Bronze',
    'user.status.silver': 'Silver',
    'user.status.gold': 'Gold',
    'user.logout': 'Logout',
    
    // Notifications
    'notification.new.course': 'New course available: "Advanced React"',
    'notification.badge.earned': 'Congratulations! You earned the "First Course" badge',
    'notification.deadline': 'Reminder: "JavaScript" track deadline in 3 days',
    'notification.recognition': 'You received recognition from João Silva',
    
    // Level tooltip
    'level.current': 'Current XP',
    'level.next': 'Next Level',
    'level.remaining': 'XP Remaining',
    
    // Learning Page
    'learning.page.title': 'Learning',
    'learning.page.subtitle': 'Manage your tracks and discover new courses',
    'learning.enrolled.title': 'My Active Tracks',
    'learning.continue': 'Continue',
    'learning.search.placeholder': 'Search courses...',
    'learning.filter.category': 'Category',
    'learning.filter.difficulty': 'Difficulty',
    'learning.filter.all': 'All',
    'learning.available.title': 'Available Courses',
    'learning.enroll': 'Enroll',
    'learning.no.results': 'No courses found',
    'learning.try.different.filters': 'Try different filters to find courses',
    
    // Career Page
    'career.page.title': 'Career',
    'career.page.subtitle': 'Plan your professional journey and achieve your goals',
    'career.tab.planning': 'Planning',
    'career.tab.goals': 'Goals',
    'career.tab.feedback': 'Feedback',
    'career.tab.plans': 'Plans',
    'career.current.position': 'Current Position',
    'career.path.title': 'Career Path',
    'career.path.description': 'Define your short, medium and long term goals',
    'career.timeframe.short': 'Short Term (6 months)',
    'career.timeframe.medium': 'Medium Term (1.5 years)',
    'career.timeframe.long': 'Long Term (3 years)',
    'career.months': 'months',
    'career.goals.add': 'Add New Goal',
    'career.goals.placeholder': 'Enter your goal...',
    'career.goals.type.annual': 'Annual',
    'career.goals.type.semestral': 'Semestral',
    'career.goals.deadline': 'Deadline',
    'career.goals.progress': 'Progress',
    'career.feedback.request': 'Request Feedback',
    'career.feedback.description': 'Ask for specific feedback about your skills and performance',
    'career.feedback.placeholder': 'What aspect would you like to receive feedback on?',
    'career.feedback.send': 'Send Request',
    'career.feedback.recent': 'Recent Feedback',
    'career.plans.annual': 'Annual Plans',
    'career.plans.semestral': 'Semestral Plans',
    'career.plans.status.concluido': 'Completed',
    'career.plans.status.em-andamento': 'In Progress',
    'career.plans.status.planejado': 'Planned',
    
    // Culture Page
    'culture.page.title': 'Culture Forum',
    'culture.page.subtitle': 'Participate in building company culture with your ideas and suggestions',
    'culture.stats.posts': 'Total Posts',
    'culture.stats.likes': 'Total Likes',
    'culture.stats.polls': 'Active Polls',
    'culture.stats.contributors': 'Contributors',
    'culture.new.post.title': 'New Suggestion',
    'culture.new.post.title.placeholder': 'Title of your suggestion...',
    'culture.new.post.content.placeholder': 'Describe your idea to improve our culture, events, campaigns or initiatives...',
    'culture.new.post.submit': 'Publish Suggestion',
    'culture.recent.posts': 'Recent Discussions',
    'culture.active.polls': 'Active Polls',
    'culture.poll.vote': 'Vote',
    'culture.top.contributors': 'Top Contributors',
    
    // Challenges Page
    'challenges.page.title': 'Challenges',
    'challenges.page.subtitle': 'Participate in challenges and form teams to solve company problems',
    'challenges.stats.active': 'Active Challenges',
    'challenges.stats.enrolled': 'Enrolled',
    'challenges.stats.completed': 'Completed',
    'challenges.stats.points.earned': 'Points Earned',
    'challenges.search.placeholder': 'Search challenges...',
    'challenges.filter.all': 'All',
    'challenges.filter.easy': 'Easy',
    'challenges.filter.medium': 'Medium',
    'challenges.filter.hard': 'Hard',
    'challenges.create.new': 'New Challenge',
    'challenges.create.title': 'Create New Challenge',
    'challenges.create.title.placeholder': 'Challenge title...',
    'challenges.create.description.placeholder': 'Describe the challenge and what needs to be solved...',
    'challenges.create.difficulty': 'Difficulty',
    'challenges.create.reward': 'Reward (points)',
    'challenges.create.deadline': 'Deadline',
    'challenges.create.tag': 'Tag/Objective',
    'challenges.create.submit': 'Create Challenge',
    'challenges.create.cancel': 'Cancel',
    'challenges.enrolled': 'Enrolled',
    'challenges.join': 'Join',
    'challenges.details': 'Details',
    'challenges.no.results': 'No challenges found',
    'challenges.try.different.filters': 'Try different filters to find challenges'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['pt', 'en'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}