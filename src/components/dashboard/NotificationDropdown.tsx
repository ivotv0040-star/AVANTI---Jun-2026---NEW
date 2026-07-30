import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  {
    id: 1,
    type: 'course',
    key: 'notification.new.course',
    time: '2h',
    unread: true
  },
  {
    id: 2,
    type: 'badge',
    key: 'notification.badge.earned',
    time: '5h',
    unread: true
  },
  {
    id: 3,
    type: 'deadline',
    key: 'notification.deadline',
    time: '1d',
    unread: false
  },
  {
    id: 4,
    type: 'recognition',
    key: 'notification.recognition',
    time: '2d',
    unread: false
  }
];

export const NotificationDropdown = () => {
  const { t } = useLanguage();
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">{t('notifications')}</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors ${
                notification.unread ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">
                    {t(notification.key)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full text-sm text-muted-foreground">
            Ver todas as notificações
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};