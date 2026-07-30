import { User, Trophy, Star, Clock, LogOut, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

const userData = {
  name: "Ivo Santos",
  level: 29,
  xp: 28750,
  nextLevelXp: 30000,
  excellentPoints: 1250,
  monthlyRanking: 7,
  badges: 24,
  achievements: 12,
  learningHours: 142,
  learningStatus: 'gold' as 'bronze' | 'silver' | 'gold',
  specialTag: 'SS'
};

export const UserMenu = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-3">
      {/* Special Tag */}
      {userData.specialTag && (
        <Badge 
          variant="outline" 
          className="bg-gradient-primary text-white border-0 text-xs font-bold px-2 py-1"
        >
          {userData.specialTag}
        </Badge>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-auto p-0">
            <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>IV</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-80 p-0" align="end">
          {/* Header */}
          <div className="p-4 bg-gradient-primary">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>IV</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white">{userData.name}</h3>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <span>{t('user.level')} {userData.level}</span>
                  {userData.specialTag && (
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                      Super Star
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="p-4 grid grid-cols-2 gap-4 border-b border-border">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{userData.excellentPoints}</div>
              <div className="text-xs text-muted-foreground">Excellent Points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">#{userData.monthlyRanking}</div>
              <div className="text-xs text-muted-foreground">{t('user.ranking')}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{userData.badges}</div>
              <div className="text-xs text-muted-foreground">{t('user.badges')}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{userData.learningHours}h</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  userData.learningStatus === 'bronze' ? 'bg-yellow-600' :
                  userData.learningStatus === 'silver' ? 'bg-gray-400' :
                  'bg-yellow-400'
                }`} />
                {t(`user.status.${userData.learningStatus}`)}
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="p-2">
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
              <User className="w-4 h-4 mr-2" />
              {t('user.profile')}
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/level-xp")}>
              <Trophy className="w-4 h-4 mr-2" />
              {t('user.level')} & XP
              <div className="ml-auto text-xs text-muted-foreground">
                {userData.xp} / {userData.nextLevelXp}
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/badges")}>
              <Award className="w-4 h-4 mr-2" />
              {t('user.badges')}
              <Badge variant="secondary" className="ml-auto text-xs">
                {userData.badges + userData.achievements}
              </Badge>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/learning-hours")}>
              <Clock className="w-4 h-4 mr-2" />
              {t('user.hours')}
              <div className="ml-auto text-xs text-muted-foreground">
                {userData.learningHours}h
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={() => navigate("/")}>
              <LogOut className="w-4 h-4 mr-2" />
              {t('user.logout')}
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};