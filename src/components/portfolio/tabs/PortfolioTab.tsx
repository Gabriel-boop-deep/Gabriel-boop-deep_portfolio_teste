import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
  {
    title: "Discorama Insights Hub",
    description: "Plataforma de análise de dados musicais com insights e visualizações interativas.",
    tags: ["React", "TypeScript", "Data Viz"],
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
    githubUrl: "https://github.com/Nuono-Cyber/discorama-insights-hub",
    featured: true,
    result: "Data Analytics",
  },
  {
    title: "Velotech Bike Yourself",
    description: "Experiência web para bicicletas com catálogo de produtos, SEO técnico e navegação responsiva.",
    tags: ["React", "Tailwind CSS", "SEO"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    githubUrl: "https://github.com/Nuono-Cyber/velotechbikeyourself",
    featured: true,
    result: "Web Experience",
  },
  {
    title: "BANVIC Analytics",
    description: "Pipeline de dados com dbt e Modern Data Stack para decisões estratégicas.",
    tags: ["dbt", "SQL", "Python"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    featured: false,
    result: "Data Driven",
  },
  {
    title: "Classificação CNN",
    description: "Modelo de Deep Learning para classificação de imagens usando TensorFlow.",
    tags: ["TensorFlow", "Python", "AI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
    featured: false,
    result: "Machine Learning",
  },
  {
    title: "Academy DBT",
    description: "Projeto educacional de Data Engineering com testes automatizados.",
    tags: ["dbt", "SQL", "Data Quality"],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600",
    featured: false,
    result: "Data Engineering",
  },
  {
    title: "Sistema de Agendamento",
    description: "Gestão de agendamentos com calendário integrado, painel administrativo e estados de uso claros.",
    tags: ["Next.js", "PostgreSQL", "Auth"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
    featured: false,
    result: "Product Flow",
  },
];

interface PortfolioTabProps {
  onNavigate: (tab: string) => void;
}

const PortfolioTab = ({ onNavigate }: PortfolioTabProps) => {
  const { t } = useLanguage();

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
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">{t("nav.portfolio")}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4 leading-tight">
            {t("portfolio.title")} <span className="text-primary">{t("portfolio.highlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("portfolio.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Featured — large cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />{t("portfolio.badge.featured")}
                  </span>
                </div>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-card/90 text-foreground text-xs font-medium backdrop-blur-sm">
                  {project.result}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">{tag}</span>
                    ))}
                  </div>
                  {project.githubUrl && (
                    <Button asChild variant="ghost" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1.5" />{t("portfolio.view")}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects — compact grid */}
        <h2 className="text-lg font-bold mb-6">{t("portfolio.others")}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {projects.filter(p => !p.featured).map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.06 }}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-md"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-card/90 text-foreground text-[10px] font-medium backdrop-blur-sm">{project.result}</span>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-sm mb-1">{project.title}</h4>
                <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{project.description}</p>
                <div className="flex gap-1">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Quer conversar sobre um projeto <span className="text-primary">como esses</span>?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Compartilhe contexto, objetivos e restrições para avaliarmos uma solução bem desenhada.
          </p>
          <Button onClick={() => onNavigate("contato")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md px-8">
            Iniciar Conversa <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioTab;
