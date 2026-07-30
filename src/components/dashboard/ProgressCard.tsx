import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProgressCardProps {
  title: string;
  subtitle: string;
  progress: number;
  buttonText: string;
}

export const ProgressCard = ({ title, subtitle, progress, buttonText }: ProgressCardProps) => {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{subtitle}</p>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <div className="w-full bg-learning-progress-bg rounded-full h-2">
          <div 
            className="bg-learning-progress h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <Button variant="secondary" size="sm" className="w-full">
        {buttonText}
      </Button>
    </Card>
  );
};