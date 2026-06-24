import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageCircle, Youtube, ArrowRight, CheckCircle2, Clock, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const ContatoTab = () => {
  const { t } = useLanguage();
  
  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/gabriel-nunes-barbosa-nogueira/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/Gabriel-boop-deep", label: "GitHub" },
    { icon: Youtube, href: "https://www.youtube.com/@IdeIA-f7l5i", label: "YouTube" },
  ];

  const guarantees = [
    { icon: Clock, textKey: "contact.guarantee1" },
    { icon: Shield, textKey: "contact.guarantee2" },
    { icon: CheckCircle2, textKey: "contact.guarantee3" },
  ];

  const faqs = [
    { qKey: "contact.faq1.q", aKey: "contact.faq1.a" },
    { qKey: "contact.faq2.q", aKey: "contact.faq2.a" },
    { qKey: "contact.faq3.q", aKey: "contact.faq3.a" },
  ];
  
  const phoneNumber = "5571999428340";
  const whatsappMessage = encodeURIComponent(t("whatsapp.message"));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-20 md:pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Contato</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">
              {t("contact.headline1")} <span className="text-primary">{t("contact.headline2")}</span>
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {t("contact.description")}
              <span className="text-primary font-medium"> {t("contact.noCommitment")}</span>
            </p>

            {/* Guarantees */}
            <div className="space-y-4 mb-8">
              {guarantees.map((g, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <g.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t(g.textKey)}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a href="mailto:gabrielnbn@hotmail.com" className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                gabrielnbn@hotmail.com
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                +55 71 99942-8340
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-md bg-muted border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — CTA card + FAQ */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main CTA */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-primary text-sm font-medium">{t("contact.available")}</span>
              </div>

              <h2 className="text-xl font-bold mb-6">Escolha o melhor canal para você</h2>

              <div className="grid sm:grid-cols-2 gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-md h-12"
                >
                  <a href="mailto:gabrielnbn@hotmail.com?subject=Contato%20pelo%20portf%C3%B3lio&body=Ol%C3%A1%20Gabriel%2C%0A%0AVisitei%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%3A%0A%0A%5BDescreva%20o%20contexto%2C%20objetivo%20e%20links%20relevantes%5D">
                    <Mail className="mr-2 h-4 w-4" />
                    {t("contact.cta")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-semibold rounded-md h-12 border-border hover:border-primary/50"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div className="grid sm:grid-cols-3 gap-4">
              {faqs.map((faq) => (
                <div key={faq.qKey} className="bg-card border border-border rounded-xl p-5">
                  <h4 className="font-semibold text-primary text-sm mb-2">{t(faq.qKey)}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(faq.aKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContatoTab;
