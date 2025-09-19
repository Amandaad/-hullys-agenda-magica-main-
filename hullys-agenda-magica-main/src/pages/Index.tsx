import { Header } from "@/components/Header";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Brain, MessageCircle, Clock, Users, Video } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-background via-secondary/30 to-accent/10">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Cuidando da sua{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                saúde mental
              </span>{" "}
              com dedicação
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Hully Rodrigues Mangueira oferece atendimento psicológico online 
              personalizado e acolhedor. Agende sua sessão de forma rápida e prática.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            {[
              { icon: Users, label: "Pacientes Atendidos", value: "500+" },
              { icon: Brain, label: "Anos de Experiência", value: "8+" },
              { icon: Video, label: "Atendimento Online", value: "100%" },
              { icon: MessageCircle, label: "WhatsApp", value: "Disponível" }
            ].map((stat, index) => (
              <div key={index} className="bg-card/60 backdrop-blur-sm rounded-lg p-6 shadow-soft border border-border/50">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Agendar Sessão Online
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha o formulário abaixo e entraremos em contato pelo WhatsApp 
              para confirmar sua sessão online no melhor horário para você.
            </p>
          </div>
          
          <AppointmentForm />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Como Entrar em Contato
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">WhatsApp</h4>
              <p className="text-muted-foreground">(83) 99999-2191</p>
              <a 
                href="https://wa.me/5583999992191" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mt-2 text-sm text-primary hover:text-primary-hover transition-colors"
              >
                Iniciar conversa
              </a>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Modalidade</h4>
              <p className="text-muted-foreground">Atendimento Online</p>
              <p className="text-xs text-muted-foreground">Via videochamada</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Agendamento</h4>
              <p className="text-muted-foreground">Flexível e personalizado</p>
              <p className="text-xs text-muted-foreground">Confirme pelo WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
