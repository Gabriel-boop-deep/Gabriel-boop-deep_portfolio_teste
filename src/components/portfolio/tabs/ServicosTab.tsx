import { motion } from "framer-motion";
import { TrendingUp, Smartphone, Zap, Shield, HeadphonesIcon, Search, Code, Palette, Rocket, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Aplicações, portfólios e interfaces com tecnologias modernas, código limpo e manutenção previsível.",
    features: ["React / TypeScript", "Performance", "Acessibilidade", "Arquitetura de componentes"],
    highlight: "Frontend",
    popular: true,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces funcionais e consistentes, projetadas para clareza, navegação fluida e uso recorrente.",
    features: ["Design System", "Responsivo", "Fluxos de uso", "Prototipagem"],
    highlight: "Produto",
    popular: false,
  },
  {
    icon: Rocket,
    title: "Automação & IA",
    description: "Soluções com chatbots locais, RAG, automações de processos e integração com dados.",
    features: ["RAG local", "Automações", "Integrações API", "Machine Learning"],
    highlight: "IA e Dados",
    popular: false,
  },
];

const benefits = [
  { icon: TrendingUp, title: "Clareza", description: "Decisões técnicas rastreáveis" },
  { icon: Smartphone, title: "100% Responsivo", description: "Perfeito em qualquer tela" },
  { icon: Zap, title: "Alta Performance", description: "Carregamento otimizado" },
  { icon: Search, title: "SEO Incluído", description: "Visibilidade orgânica" },
  { icon: Shield, title: "Segurança", description: "SSL e boas práticas" },
  { icon: HeadphonesIcon, title: "Documentação", description: "Evolução mais simples" },
];

interface ServicosTabProps {
  onNavigate: (tab: string) => void;
}

const ServicosTab = ({ onNavigate }: ServicosTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-20 md:pt-16 pb-12"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Serviços</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 leading-tight">
            Soluções digitais para produto, IA e dados
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Desenvolvimento profissional com foco em clareza técnica, UX, performance, segurança e manutenção.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-card rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg ${
                service.popular ? "border-primary ring-1 ring-primary/20" : "border-border hover:border-primary/30"
              }`}
            >
              {/* Top bar */}
              <div className={`px-6 py-3 text-xs font-semibold ${
                service.popular 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {service.highlight}
              </div>

              <div className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-2.5 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => onNavigate("contato")}
                  variant={service.popular ? "default" : "outline"}
                  className={`w-full rounded-md ${
                    service.popular 
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  Conversar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits strip */}
        <div className="border-t border-border pt-12">
          <h2 className="text-xl font-bold mb-8 text-center">
            Incluído em todos os projetos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="text-center p-4"
              >
                <benefit.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm mb-0.5">{benefit.title}</h4>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicosTab;
