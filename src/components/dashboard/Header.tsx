import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NotificationDropdown } from "./NotificationDropdown";
import { LanguageSelector } from "./LanguageSelector";
import { UserMenu } from "./UserMenu";
import { LevelTooltip } from "./LevelTooltip";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/contexts/SearchContext";
import { useEffect } from "react";

export const Header = () => {
  const { t, language } = useLanguage();
  const { searchQuery, setSearchQuery } = useSearch();

  // Mock data for user level
  const userLevel = { level: 29, currentXp: 28750, nextLevelXp: 30000 };

  // Simulate search functionality
  useEffect(() => {
    if (searchQuery) {
      // Here you would filter your actual content
      console.log('Searching for:', searchQuery);
    }
  }, [searchQuery]);

  return (
    <header className="flex items-center justify-between p-6 bg-background border-b border-border">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold text-foreground">{t('dashboard.title')}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder={t('search.placeholder')} 
            className="pl-10 w-64 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Level Badge with Tooltip */}
        <LevelTooltip {...userLevel}>
          <div className="bg-gradient-primary px-3 py-1 rounded-full cursor-pointer hover:scale-105 transition-transform">
            <span className="text-white text-sm font-medium">{t('level')} {userLevel.level}</span>
          </div>
        </LevelTooltip>
        
        {/* Actions */}
        <ThemeToggle />
        <NotificationDropdown />
        <LanguageSelector />
        
        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};