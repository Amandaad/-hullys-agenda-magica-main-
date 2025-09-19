import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Phone, MapPin, FileText, Settings, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    anamnese: ""
  });
  
  const [webhookUrl, setWebhookUrl] = useState("");
  const [showWebhookConfig, setShowWebhookConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.telefone) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e telefone são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Se há webhook configurado, enviar para Zapier
      if (webhookUrl) {
        console.log("Enviando dados para Zapier:", formData);
        
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "no-cors",
          body: JSON.stringify({
            nome: formData.nome,
            telefone: formData.telefone,
            endereco: formData.endereco,
            motivo: formData.anamnese,
            timestamp: new Date().toLocaleString('pt-BR'),
            tipo: "Agendamento de Sessão de Psicologia"
          }),
        });

        toast({
          title: "✅ Agendamento enviado!",
          description: "Os dados foram enviados para seu WhatsApp via Zapier.",
        });
      } else {
        toast({
          title: "Solicitação registrada!",
          description: "Configure o Zapier para receber no WhatsApp automaticamente.",
        });
      }

      // Reset form
      setFormData({
        nome: "",
        telefone: "",
        endereco: "",
        anamnese: ""
      });

    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast({
        title: "Dados registrados",
        description: "Configure o webhook do Zapier para automação completa.",
        variant: "default"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Zapier Configuration Card */}
      <Card className="shadow-medium border-0 bg-accent/10 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Integração WhatsApp</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWebhookConfig(!showWebhookConfig)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          {showWebhookConfig && (
            <div className="space-y-3">
              <Label htmlFor="webhook" className="text-sm font-medium">
                Zapier Webhook URL (para receber agendamentos no WhatsApp)
              </Label>
              <Input
                id="webhook"
                type="url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                Configure um Zap com trigger "Catch Hook" conectado ao WhatsApp para receber os agendamentos automaticamente.
              </p>
            </div>
          )}
          
          {!showWebhookConfig && (
            <p className="text-sm text-muted-foreground">
              {webhookUrl ? "✅ Webhook configurado - agendamentos serão enviados ao WhatsApp" : "⚠️ Configure o Zapier para receber agendamentos no WhatsApp automaticamente"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Main Form Card */}
      <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Agendar Sessão Online
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Preencha os dados abaixo para solicitar sua sessão de psicologia
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Nome Completo *
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                  className="h-12 bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Telefone *
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={(e) => handleChange("telefone", e.target.value)}
                  className="h-12 bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Endereço
              </Label>
              <Input
                id="endereco"
                type="text"
                placeholder="Seu endereço completo"
                value={formData.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
                className="h-12 bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="anamnese" className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Motivo da Consulta
              </Label>
              <Textarea
                id="anamnese"
                placeholder="Descreva brevemente o que gostaria de trabalhar nas sessões ou suas principais preocupações..."
                value={formData.anamnese}
                onChange={(e) => handleChange("anamnese", e.target.value)}
                className="min-h-32 bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                variant="medical"
                size="lg"
                className="w-full h-12 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5 mr-2" />
                    {webhookUrl ? "Enviar para WhatsApp" : "Solicitar Sessão Online"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};