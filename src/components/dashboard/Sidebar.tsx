import { Home, BookOpen, TrendingUp, Users, Target, ShoppingBag, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useSidebar } from "@/contexts/SidebarContext";

const sidebarItems = [
  { icon: Home, label: "nav.home", path: "/inicio" },
  { icon: BookOpen, label: "nav.learning", path: "/learning" },
  { icon: TrendingUp, label: "nav.career", path: "/career" },
  { icon: Users, label: "nav.culture", path: "/culture" },
  { icon: Target, label: "nav.challenges", path: "/challenges" },
];

export const Sidebar = () => {
  const { isExpanded, setIsExpanded } = useSidebar();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div 
      className={cn(
        "bg-sidebar border-r border-sidebar-border h-screen py-6 transition-all duration-300 flex flex-col fixed left-0 top-0 z-40",
        isExpanded ? "w-64 px-6" : "w-20 px-4"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 mb-8 overflow-hidden", !isExpanded && "justify-center")}>
        <img src="/favicon.svg" alt="Logo" className="w-8 h-8 object-contain flex-shrink-0" />
        {isExpanded && (
          <span className="text-sidebar-foreground font-bold text-xl transition-opacity duration-300">
            AVANTI
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center rounded-xl transition-all duration-300 group text-left",
                isExpanded 
                  ? "w-full h-12 px-4 gap-3 justify-start" 
                  : "w-12 h-12 p-0 justify-center mx-auto",
                isActive
                  ? "bg-gradient-primary text-white shadow-purple"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-transform group-hover:scale-110 flex-shrink-0",
                  isActive ? "text-white" : "text-sidebar-foreground"
                )} 
              />
              {isExpanded && (
                <span className="font-medium transition-opacity duration-300">
                  {t(item.label)}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Excellent Points Card */}
      <button 
        onClick={() => navigate("/excellent-points")}
        className={cn(
          "bg-gradient-accent relative overflow-hidden hover:scale-105 transition-transform duration-300 mb-4 flex items-center justify-center mx-auto",
          isExpanded ? "w-full p-4 rounded-xl" : "w-12 h-12 p-0 rounded-xl"
        )}
      >
        {isExpanded && (
          <div className="absolute top-2 right-2 bg-white/20 text-xs px-2 py-1 rounded-full text-white font-medium">
            NEW
          </div>
        )}
        <div className={cn("text-white", !isExpanded && "flex items-center justify-center w-full h-full")}>
          <div className={cn(
            "bg-white/20 rounded-lg flex items-center justify-center mx-auto",
            isExpanded ? "w-12 h-12 mb-3" : "w-8 h-8"
          )}>
            <ShoppingBag className={cn("text-white", isExpanded ? "w-6 h-6" : "w-4 h-4")} />
          </div>
          {isExpanded && (
            <>
              <h3 className="font-bold text-sm mb-1">{t('excellent.points')}</h3>
              <h3 className="font-bold text-sm">{t('excellent.points.subtitle')}</h3>
            </>
          )}
        </div>
      </button>

      {/* Support Button */}
      <button
        onClick={() => navigate("/support")}
        className={cn(
          "flex items-center rounded-xl transition-all duration-300 group text-left",
          isExpanded 
            ? "w-full h-12 px-4 gap-3 justify-start" 
            : "w-12 h-12 p-0 justify-center mx-auto",
          location.pathname === "/support"
            ? "bg-gradient-primary text-white shadow-purple"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        <HelpCircle 
          size={20} 
          className={cn(
            "transition-transform group-hover:scale-110 flex-shrink-0",
            location.pathname === "/support" ? "text-white" : "text-sidebar-foreground"
          )} 
        />
        {isExpanded && (
          <span className="font-medium transition-opacity duration-300">
            Suporte
          </span>
        )}
      </button>
    </div>
  );
};