import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  subtitle: string;
  buttonText: string;
  icon: LucideIcon;
}

export const MetricCard = ({ title, value, subtitle, buttonText, icon: Icon }: MetricCardProps) => {
  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">{title}</h3>
          <div className="flex items-center gap-2">
            <Icon className="w-8 h-8 text-primary" />
            <span className="text-3xl font-bold text-card-foreground">{value}</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        </div>
      </div>
      
      <Button variant="secondary" size="sm" className="w-full mt-auto">
        {buttonText}
      </Button>
    </Card>
  );
};