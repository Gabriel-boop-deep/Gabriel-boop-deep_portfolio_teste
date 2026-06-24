import { motion } from "framer-motion";
import { Code2, Database, TrendingUp, Award, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const results = [
  { metric: "20+", label: "Projetos Entregues", icon: Award },
  { metric: "12+", label: "Tecnologias no Stack", icon: Code2 },
  { metric: "3", label: "Frentes Técnicas", icon: TrendingUp },
  { metric: "A+", label: "Foco em Qualidade", icon: Clock },
];

const highlights = [
  {
    name: "Web e Produto",
    role: "React, TypeScript, UX",
    content: "Interfaces responsivas, componentes consistentes, feedbacks claros e cuidado com performance e acessibilidade.",
    result: "Frontend",
  },
  {
    name: "Dados",
    role: "SQL, dbt, Python",
    content: "Pipelines e análises com validação, rastreabilidade, organização de métricas e visão prática para tomada de decisão.",
    result: "Data",
  },
  {
    name: "IA Aplicada",
    role: "RAG, ML, automações",
    content: "Chatbots, busca semântica, interpretação de linguagem natural e modelos aplicados a problemas específicos.",
    result: "AI",
  },
];

const technologies = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "Python", "TensorFlow", "PostgreSQL"
];

interface ResultadosTabProps {
  onNavigate: (tab: string) => void;
}

const ResultadosTab = ({ onNavigate }: ResultadosTabProps) => {
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
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">Resultados</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 leading-tight">
            Resultados que comprovam <span className="text-primary">qualidade</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Métricas reais de projetos entregues que demonstram impacto profissional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Stats — horizontal bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden mb-20">
          {results.map((result, index) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.08 }}
              className="bg-card p-6 md:p-8 text-center"
            >
              <result.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{result.metric}</div>
              <div className="text-sm text-muted-foreground">{result.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <h2 className="text-xl font-bold mb-8">Evidências de atuação</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Database className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{highlight.result}</span>
              </div>

              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{highlight.content}</p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {highlight.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{highlight.name}</div>
                  <div className="text-xs text-muted-foreground">{highlight.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technologies */}
        <div className="border-t border-border pt-12 mb-16">
          <h3 className="text-lg font-bold mb-6 text-center">Stack Tecnológico</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-md bg-card border border-border text-sm font-medium">{tech}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Pronto para o <span className="text-primary">próximo nível</span>?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Seu projeto pode alcançar resultados semelhantes.
          </p>
          <Button onClick={() => onNavigate("contato")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md px-8">
            Iniciar Conversa <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultadosTab;
