import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Users } from "lucide-react";

const activities = [
  {
    type: "challenge",
    title: "Participou do Desafio RH mais Tech",
    time: "2h atrás",
    icon: Trophy,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export const RecentActivities = () => {
  return (
    <Card className="p-6 bg-gradient-primary border-border">
      <h3 className="text-lg font-semibold text-white mb-4">Atividades Recentes</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={activity.avatar} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-white" />
                  <p className="text-sm text-white">{activity.title}</p>
                </div>
                <p className="text-xs text-white/70">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};