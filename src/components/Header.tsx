import { Brain, Phone, MessageCircle, Clock } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Hully Rodrigues Mangueira
              </h1>
              <p className="text-sm text-muted-foreground">
                Consultório de Psicologia
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>(83) 99999-2191</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Atendimento Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};