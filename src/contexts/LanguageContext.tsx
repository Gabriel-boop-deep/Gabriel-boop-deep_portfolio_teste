import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navbar
  "nav.home": { pt: "Início", en: "Home" },
  "nav.services": { pt: "Serviços", en: "Services" },
  "nav.portfolio": { pt: "Portfólio", en: "Portfolio" },
  "nav.results": { pt: "Resultados", en: "Results" },
  "nav.contact": { pt: "Contato", en: "Contact" },
  "nav.quote": { pt: "Contato", en: "Contact" },
  "nav.urgency": { pt: "Portfólio profissional em desenvolvimento web, IA e dados", en: "Professional portfolio in web development, AI, and data" },
  
  // Hero/Inicio
  "hero.available": { pt: "Desenvolvimento web • IA • Engenharia de dados", en: "Web development • AI • Data engineering" },
  "hero.title": { pt: "Full-Stack Developer & AI/Data Specialist", en: "Full-Stack Developer & AI/Data Specialist" },
  "hero.headline1": { pt: "Portfólio de soluções", en: "Portfolio of" },
  "hero.headline2": { pt: "web, IA e dados.", en: "web, AI, and data solutions." },
  "hero.headline3": { pt: "Projetos claros, performáticos e sustentáveis.", en: "Clear, fast, and maintainable projects." },
  "hero.description": { pt: "Sou Gabriel Nunes. Desenvolvo interfaces, automações inteligentes, pipelines e produtos digitais com foco em clareza técnica, performance, segurança e experiência de uso.", en: "I'm Gabriel Nunes. I build interfaces, intelligent automations, pipelines, and digital products focused on technical clarity, performance, security, and user experience." },
  "hero.sites": { pt: "sites profissionais", en: "professional websites" },
  "hero.convert": { pt: "resolver problemas reais", en: "solve real problems" },
  "hero.point1": { pt: "Arquitetura frontend e integrações", en: "Frontend architecture and integrations" },
  "hero.point2": { pt: "IA aplicada e automações", en: "Applied AI and automations" },
  "hero.point3": { pt: "Dados, qualidade e pipelines", en: "Data, quality, and pipelines" },
  "hero.projects": { pt: "Projetos", en: "Projects" },
  "hero.satisfaction": { pt: "Qualidade", en: "Quality" },
  "hero.delivery": { pt: "Stack", en: "Stack" },
  "hero.cta": { pt: "Ver Portfólio", en: "View Portfolio" },
  "hero.results": { pt: "Stack Técnica", en: "Technical Stack" },
  "hero.commitment": { pt: "Projetos web • IA aplicada • Engenharia de dados", en: "Web projects • Applied AI • Data engineering" },
  "hero.webExpert": { pt: "Web Expert", en: "Web Expert" },
  "hero.fast": { pt: "Rápido", en: "Fast" },
  
  // Contact
  "contact.available": { pt: "Aberto a conversas profissionais", en: "Open to professional conversations" },
  "contact.headline1": { pt: "Vamos conversar sobre", en: "Let's talk about" },
  "contact.headline2": { pt: "tecnologia e produto?", en: "technology and product?" },
  "contact.description": { pt: "Envie uma mensagem com contexto, objetivo e links relevantes.", en: "Send a message with context, goals, and relevant links." },
  "contact.noCommitment": { pt: "Respondo com clareza e próximos passos.", en: "I'll respond with clarity and next steps." },
  "contact.cta": { pt: "ENVIAR EMAIL", en: "SEND EMAIL" },
  "contact.guarantee1": { pt: "Comunicação objetiva", en: "Clear communication" },
  "contact.guarantee2": { pt: "Escopo e prioridades bem definidos", en: "Well-defined scope and priorities" },
  "contact.guarantee3": { pt: "Atenção a manutenção e segurança", en: "Focus on maintenance and security" },
  "contact.connect": { pt: "ou conecte-se comigo", en: "or connect with me" },
  "contact.urgency": { pt: "Compartilhe contexto técnico para uma resposta mais útil.", en: "Share technical context for a more useful response." },
  "contact.faq1.q": { pt: "Que tipo de projeto faz sentido?", en: "What kind of project fits?" },
  "contact.faq1.a": { pt: "Aplicações web, automações com IA, dashboards, pipelines de dados e integrações.", en: "Web apps, AI automations, dashboards, data pipelines, and integrations." },
  "contact.faq2.q": { pt: "Como iniciar uma conversa?", en: "How should we start?" },
  "contact.faq2.a": { pt: "Envie objetivo, contexto, prazo desejado, stack atual e links ou documentos úteis.", en: "Send goals, context, desired timeline, current stack, and useful links or docs." },
  "contact.faq3.q": { pt: "O que costumo priorizar?", en: "What do I usually prioritize?" },
  "contact.faq3.a": { pt: "Clareza técnica, UX, performance, segurança, manutenção e documentação.", en: "Technical clarity, UX, performance, security, maintenance, and documentation." },
  
  // Services
  "services.title": { pt: "Serviços", en: "Services" },
  "services.subtitle": { pt: "Soluções digitais com base técnica sólida e experiência de uso bem cuidada.", en: "Digital solutions with a solid technical base and careful user experience." },
  "services.web.title": { pt: "Desenvolvimento Web", en: "Web Development" },
  "services.web.desc": { pt: "Interfaces modernas, rápidas, acessíveis e sustentáveis para produto e presença digital.", en: "Modern, fast, accessible, and maintainable interfaces for product and digital presence." },
  "services.uiux.title": { pt: "Design UI/UX", en: "UI/UX Design" },
  "services.uiux.desc": { pt: "Interfaces intuitivas e experiências que encantam e retêm usuários.", en: "Intuitive interfaces and experiences that delight and retain users." },
  "services.ai.title": { pt: "Automação com IA", en: "AI Automation" },
  "services.ai.desc": { pt: "Chatbots inteligentes e automações que aumentam sua eficiência.", en: "Smart chatbots and automations that increase your efficiency." },
  "services.popular": { pt: "MAIS POPULAR", en: "MOST POPULAR" },
  
  // Portfolio
  "portfolio.title": { pt: "Projetos que", en: "Projects that" },
  "portfolio.highlight": { pt: "geram resultados", en: "generate results" },
  "portfolio.subtitle": { pt: "Não são apenas projetos — são soluções que resolvem problemas reais.", en: "Not just projects — they're solutions that solve real problems." },
  "portfolio.featured": { pt: "Destaques", en: "Featured" },
  "portfolio.others": { pt: "Outros Projetos", en: "Other Projects" },
  "portfolio.view": { pt: "Ver projeto", en: "View project" },
  "portfolio.badge.featured": { pt: "DESTAQUE", en: "FEATURED" },
  
  // Results
  "results.title": { pt: "Resultados que", en: "Results that" },
  "results.highlight": { pt: "falam por si", en: "speak for themselves" },
  "results.subtitle": { pt: "Números reais de projetos reais. Transformando ideias em sucesso mensurável.", en: "Real numbers from real projects. Transforming ideas into measurable success." },
  "results.testimonials": { pt: "O que dizem meus clientes", en: "What my clients say" },
  "results.tech": { pt: "Tecnologias que Domino", en: "Technologies I Master" },
  
  // Footer
  "footer.rights": { pt: "Todos os direitos reservados.", en: "All rights reserved." },
  "footer.made": { pt: "Feito com", en: "Made with" },
  "footer.by": { pt: "por", en: "by" },
  
  // WhatsApp
  "whatsapp.message": { pt: "Olá Gabriel! Visitei seu portfólio e gostaria de conversar sobre um projeto ou oportunidade.", en: "Hello Gabriel! I visited your portfolio and would like to talk about a project or opportunity." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.pt || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
