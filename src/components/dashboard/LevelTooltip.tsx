import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

interface LevelTooltipProps {
  level: number;
  currentXp: number;
  nextLevelXp: number;
  children: React.ReactNode;
}

export const LevelTooltip = ({ level, currentXp, nextLevelXp, children }: LevelTooltipProps) => {
  const { t } = useLanguage();
  const progress = (currentXp / nextLevelXp) * 100;
  const remainingXp = nextLevelXp - currentXp;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="w-64 p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{t('user.level')} {level}</span>
              <span className="text-sm font-medium">{t('user.level')} {level + 1}</span>
            </div>
            
            <Progress value={progress} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-medium text-muted-foreground">{t('level.current')}</div>
                <div className="font-bold text-primary">{currentXp.toLocaleString()}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">{t('level.remaining')}</div>
                <div className="font-bold text-warning">{remainingXp.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-xs text-muted-foreground">{t('level.next')}</div>
              <div className="font-bold text-foreground">{nextLevelXp.toLocaleString()} XP</div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};