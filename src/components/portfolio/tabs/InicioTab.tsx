import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, TrendingUp, Shield, Zap, Target, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import profileImage from "@/assets/profile.jpeg";
import VideoSection from "@/components/portfolio/VideoSection";


interface InicioTabProps {
  onNavigate: (tab: string) => void;
}

const InicioTab = ({ onNavigate }: InicioTabProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero — Full-bleed dark section */}
      <section className="pt-20 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="molecular-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-xs font-medium text-primary">{t("hero.available")}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
              >
                {t("hero.headline1")}
                <br />
                <span className="text-primary">{t("hero.headline2")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed"
              >
                {t("hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button
                  onClick={() => onNavigate("portfolio")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md px-8 h-12 text-sm"
                >
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onNavigate("portfolio")}
                  variant="outline"
                  size="lg"
                  className="rounded-md px-8 h-12 border-border hover:border-primary/50 font-medium text-sm"
                >
                  {t("hero.results")}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </div>

            {/* Right — Profile + Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <div className="molecular-panel rounded-2xl p-6 md:p-8">
                {/* Profile header */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-border flex-shrink-0">
                    <img
                      src={profileImage}
                      alt="Gabriel Nunes"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Gabriel Nunes</h2>
                    <p className="text-sm text-muted-foreground">{t("hero.title")}</p>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { number: "20+", labelKey: "hero.projects", icon: TrendingUp },
                    { number: "A+", labelKey: "hero.satisfaction", icon: CheckCircle2 },
                    { number: "12+", labelKey: "hero.delivery", icon: Clock },
                  ].map((stat) => (
                    <div key={stat.labelKey} className="molecular-tile text-center p-3 rounded-lg">
                      <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                      <div className="text-xl font-bold text-foreground">{stat.number}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                        {t(stat.labelKey)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Differentiators */}
                <div className="space-y-3">
                  {[
                    { icon: Target, textKey: "hero.point1" },
                    { icon: Zap, textKey: "hero.point2" },
                    { icon: Shield, textKey: "hero.point3" },
                  ].map((point) => (
                    <div key={point.textKey} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <point.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{t(point.textKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="molecular-band">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />{t("hero.commitment")}</span>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" />SSL & Segurança</span>
            <span className="hidden sm:block w-px h-4 bg-border" />
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" />Performance A+</span>
          </div>
        </div>
      </section>

      {/* Professional highlights */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Destaques</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">Como costumo resolver problemas</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Frontend e Produto",
                role: "React, TypeScript, UI/UX",
                content: "Interfaces responsivas, componentes consistentes, estados claros e atenção a performance, acessibilidade e manutenção.",
                avatar: "FE",
              },
              {
                name: "IA Aplicada",
                role: "RAG, automações e modelos",
                content: "Soluções com busca semântica, interpretação de linguagem natural e automações conectadas a fluxos reais de trabalho.",
                avatar: "IA",
              },
              {
                name: "Engenharia de Dados",
                role: "SQL, dbt, Python",
                content: "Pipelines, validações e dashboards criados com rastreabilidade, qualidade dos dados e visão analítica.",
                avatar: "DB",
              },
              {
                name: "Segurança",
                role: "Boas práticas web",
                content: "Menor exposição de chaves, validação de entradas, dependências enxutas e atenção a rotas, headers e conteúdo externo.",
                avatar: "SE",
              },
              {
                name: "Qualidade",
                role: "Testes e revisão",
                content: "Mudanças verificáveis, testes focados no risco e revisões que procuram bugs, regressões e pontos frágeis de UX.",
                avatar: "QA",
              },
              {
                name: "Comunicação",
                role: "Clareza de escopo",
                content: "Contexto, decisões técnicas e próximos passos documentados de forma simples para facilitar evolução do projeto.",
                avatar: "UX",
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="molecular-panel rounded-xl p-6 transition-all duration-200 hover:border-primary/30 hover:-translate-y-0.5"
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{testimonial.content}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <VideoSection />
        </div>
      </section>
    </motion.div>
  );
};

export default InicioTab;
