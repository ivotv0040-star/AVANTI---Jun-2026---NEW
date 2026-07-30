import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { AIChat } from "@/components/dashboard/AIChat";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  MessageSquare, 
  Heart, 
  BarChart3, 
  Users, 
  Plus, 
  TrendingUp,
  Clock,
  Vote,
  Send
} from "lucide-react";

const Culture = () => {
  const { t } = useLanguage();
  const { isExpanded } = useSidebar();
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  // Mock data
  const stats = {
    totalPosts: 247,
    totalLikes: 1832,
    activePolls: 8,
    contributors: 156
  };

  const recentPosts = [
    {
      id: 1,
      title: "Proposta: Horário flexível às sextas-feiras",
      author: "Maria Silva",
      time: "2h atrás",
      likes: 23,
      comments: 8,
      category: "Flexibilidade"
    },
    {
      id: 2,
      title: "Evento: Workshop de inovação mensal",
      author: "João Santos",
      time: "4h atrás",
      likes: 15,
      comments: 12,
      category: "Inovação"
    },
    {
      id: 3,
      title: "Campanha: Sustentabilidade no escritório",
      author: "Ana Costa",
      time: "1 dia atrás",
      likes: 31,
      comments: 18,
      category: "Sustentabilidade"
    }
  ];

  const activePolls = [
    {
      id: 1,
      title: "Qual horário preferem para eventos internos?",
      votes: 89,
      timeLeft: "3 dias"
    },
    {
      id: 2,
      title: "Que tipo de benefício gostariam de ver implementado?",
      votes: 134,
      timeLeft: "1 semana"
    }
  ];

  const handleSubmitPost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // Mock submission
      console.log("New post:", { title: newPostTitle, content: newPostContent });
      setNewPostTitle("");
      setNewPostContent("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 min-w-0",
        isExpanded ? "ml-64" : "ml-20"
      )}>
        <Header />
        
        {/* Culture Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('culture.page.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('culture.page.subtitle')}
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPosts}</p>
                  <p className="text-sm text-muted-foreground">{t('culture.stats.posts')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalLikes}</p>
                  <p className="text-sm text-muted-foreground">{t('culture.stats.likes')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activePolls}</p>
                  <p className="text-sm text-muted-foreground">{t('culture.stats.polls')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.contributors}</p>
                  <p className="text-sm text-muted-foreground">{t('culture.stats.contributors')}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* New Post Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  {t('culture.new.post.title')}
                </h2>
                <div className="space-y-4">
                  <Input
                    placeholder={t('culture.new.post.title.placeholder')}
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder={t('culture.new.post.content.placeholder')}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Badge variant="secondary">Engajamento</Badge>
                    <Badge variant="secondary">Inovação</Badge>
                    <Badge variant="secondary">Eventos</Badge>
                    <Badge variant="secondary">Campanhas</Badge>
                  </div>
                  <Button 
                    onClick={handleSubmitPost}
                    className="w-full"
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t('culture.new.post.submit')}
                  </Button>
                </div>
              </Card>

              {/* Recent Posts */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {t('culture.recent.posts')}
                </h2>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-foreground hover:text-primary cursor-pointer">
                          {post.title}
                        </h3>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Por {post.author} • {post.time}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Active Polls */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Vote className="w-5 h-5" />
                  {t('culture.active.polls')}
                </h2>
                <div className="space-y-4">
                  {activePolls.map((poll) => (
                    <div key={poll.id} className="border border-border rounded-lg p-4">
                      <h3 className="font-medium text-foreground mb-2">{poll.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                        <span>{poll.votes} votos</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {poll.timeLeft}
                        </span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        {t('culture.poll.vote')}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Contributors */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {t('culture.top.contributors')}
                </h2>
                <div className="space-y-3">
                  {[
                    { name: "Maria Silva", posts: 23, likes: 145 },
                    { name: "João Santos", posts: 19, likes: 98 },
                    { name: "Ana Costa", posts: 15, likes: 87 }
                  ].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{contributor.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {contributor.posts} posts • {contributor.likes} likes
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      {/* AI Chat Button */}
      <AIChat />
    </div>
  );
};

export default Culture;