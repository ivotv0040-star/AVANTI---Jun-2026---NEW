import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Medal, Trophy, Award, Crown } from "lucide-react";

interface RankingUser {
  id: string;
  name: string;
  xp: number;
  avatar?: string;
  isCurrentUser?: boolean;
}

const rankingData: RankingUser[] = [
  {
    id: "1",
    name: "Ana Silva",
    xp: 2850,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2", 
    name: "Carlos Santos",
    xp: 2720,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Maria Costa",
    xp: 2650,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    name: "Ivo",
    xp: 2340,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isCurrentUser: true
  },
  {
    id: "5",
    name: "Pedro Lima",
    xp: 2180,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

const getRankIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return null;
  }
};

const getRankBadgeVariant = (position: number) => {
  switch (position) {
    case 1:
      return "default";
    case 2:
      return "secondary";
    case 3:
      return "outline";
    default:
      return "outline";
  }
};

export const MonthlyRanking = () => {
  return (
    <Card className="h-full bg-card border-border flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5 text-primary" />
          Ranking do mês
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-3 overflow-y-auto">
        {rankingData.map((user, index) => {
          const position = index + 1;
          const isTopThree = position <= 3;
          
          return (
            <div 
              key={user.id} 
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                user.isCurrentUser 
                  ? 'bg-primary/10 border border-primary/20' 
                  : isTopThree 
                    ? 'bg-secondary/50' 
                    : 'bg-secondary/30'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {getRankIcon(position)}
                  <Badge variant={getRankBadgeVariant(position)} className="min-w-8 h-8 text-sm font-bold">
                    {position}º
                  </Badge>
                </div>
                
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium truncate ${
                      user.isCurrentUser ? 'text-primary' : 'text-card-foreground'
                    }`}>
                      {user.name}
                    </p>
                  </div>
                  {user.isCurrentUser && (
                    <p className="text-xs text-primary">Seu ranking atual</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {user.xp.toLocaleString()} XP
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Ranking baseado no XP acumulado este mês
          </p>
        </div>
      </CardContent>
    </Card>
  );
};