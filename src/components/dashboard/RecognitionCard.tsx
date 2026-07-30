import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, X, Send, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Member {
  name: string;
  avatar: string;
  verified?: boolean;
  custom?: boolean;
}

const team: Member[] = [
  { name: "Alfredo", verified: true, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
  { name: "Maria", verified: true, avatar: "https://images.unsplash.com/photo-1494790108755-2616b5b8a9e5?w=150&h=150&fit=crop&crop=face" },
  { name: "Carlos", verified: true, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
  { name: "Ana", verified: true, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
  { name: "Paula", verified: true, avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face" },
  { name: "João", verified: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
];

export const RecognitionCard = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [customName, setCustomName] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [points, setPoints] = useState<number>(50);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    
    const recipientName = selectedMember.custom ? customName : selectedMember.name;
    if (!recipientName.trim()) {
      toast.error("Por favor, informe o nome do destinatário.");
      return;
    }
    
    // Simular envio de reconhecimento
    toast.success(`Reconhecimento enviado para ${recipientName} com sucesso! (+${points} EP)`);
    setSelectedMember(null);
    setCustomName("");
    setFeedbackText("");
    setPoints(50);
  };

  return (
    <>
      <Card className="p-6 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Envie um Reconhecimento</h3>
          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="relative group cursor-pointer"
              onClick={() => {
                setSelectedMember(member);
                setCustomName("");
                setFeedbackText("");
                setPoints(50);
              }}
            >
              <Avatar className="w-12 h-12 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {member.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {member.name}
              </span>
            </div>
          ))}
          
          <button 
            onClick={() => {
              setSelectedMember({ name: "", avatar: "", custom: true });
              setCustomName("");
              setFeedbackText("");
              setPoints(50);
            }}
            className="w-12 h-12 bg-primary/10 border-2 border-dashed border-primary/30 rounded-full flex items-center justify-center hover:bg-primary/20 transition-all duration-300 group"
          >
            <Plus className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </Card>

      {/* Floating Dialog Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedMember(null)}
          />
          
          {/* Modal Container */}
          <Card className="relative w-full max-w-md bg-card border-border shadow-2xl p-6 rounded-2xl flex flex-col gap-5 animate-scale-in z-10">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-primary rounded-xl">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Enviar Reconhecimento</h3>
                  <p className="text-xs text-muted-foreground">Compartilhe um feedback positivo</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMember(null)}
                className="text-muted-foreground hover:bg-secondary h-8 w-8 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Member Profile Card or Input Name */}
              {selectedMember.custom ? (
                <div className="flex flex-col gap-2 p-3 bg-secondary/30 rounded-xl border border-border">
                  <label htmlFor="customName" className="text-xs font-semibold text-foreground">
                    Nome do Destinatário
                  </label>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-primary/20 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">?</AvatarFallback>
                    </Avatar>
                    <Input
                      id="customName"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Digite o nome da pessoa..."
                      required
                      className="flex-1"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl border border-border">
                  <Avatar className="w-10 h-10 border border-primary/20">
                    <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                    <AvatarFallback>{selectedMember.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Destinatário</p>
                    <p className="text-xs text-muted-foreground">{selectedMember.name}</p>
                  </div>
                </div>
              )}

              {/* Feedback Textarea */}
              <div className="flex flex-col gap-2">
                <label htmlFor="feedback" className="text-xs font-semibold text-foreground">
                  Mensagem de Feedback
                </label>
                <Textarea
                  id="feedback"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder={
                    selectedMember.custom 
                      ? "Escreva por que você gostaria de elogiar essa pessoa..."
                      : `Escreva por que você gostaria de elogiar ${selectedMember.name}...`
                  }
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Points Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-foreground">
                  Quantidade de Excellent Points (EP)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={1000}
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    required
                    className="w-24 text-center font-bold"
                  />
                  <div className="flex-1 flex gap-1 justify-between">
                    {[50, 100, 200, 500].map((preset) => (
                      <Button
                        key={preset}
                        type="button"
                        variant={points === preset ? "default" : "outline"}
                        onClick={() => setPoints(preset)}
                        className="flex-1 text-xs py-1 h-9 rounded-lg"
                      >
                        +{preset}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-primary text-white hover:opacity-90 py-3 rounded-xl font-bold flex items-center justify-center gap-2 mt-2 shadow-purple"
              >
                <Send className="w-4 h-4" />
                Enviar Elogio
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};