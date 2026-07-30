import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

const events = [
  {
    title: "Workshop de Inovação",
    time: "Amanhã às 14:00",
    type: "workshop"
  },
  {
    title: "Reunião de Equipe",
    time: "Sexta-feira às 10:00",
    type: "meeting"
  }
];

export const UpcomingEvents = () => {
  return (
    <Card className="p-6 bg-card border-border h-full flex flex-col overflow-hidden">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Próximos Eventos</h3>
      
      <div className="space-y-3 flex-1 flex flex-col justify-center overflow-hidden">
        {events.map((event, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg gap-3 min-h-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {event.type === "workshop" ? (
                  <Calendar className="w-5 h-5 text-primary" />
                ) : (
                  <Clock className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-card-foreground truncate">{event.title}</h4>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="whitespace-nowrap flex-shrink-0 text-xs px-2">
              <span className="hidden sm:inline">Adicionar</span>
              <span className="sm:hidden">+</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};