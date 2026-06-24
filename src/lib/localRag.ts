export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

type RagDocument = {
  id: string;
  title: string;
  category: "perfil" | "stack" | "projetos" | "contato" | "processo" | "servicos";
  text: string;
  keywords: string[];
};

type SearchHit = RagDocument & {
  score: number;
};

const STOP_WORDS = new Set([
  "a",
  "as",
  "ao",
  "aos",
  "de",
  "da",
  "das",
  "do",
  "dos",
  "e",
  "em",
  "eu",
  "me",
  "meu",
  "minha",
  "o",
  "os",
  "ou",
  "para",
  "por",
  "que",
  "se",
  "sobre",
  "um",
  "uma",
  "voce",
  "voces",
  "com",
  "como",
  "qual",
  "quais",
]);

const SYNONYMS: Record<string, string[]> = {
  ai: ["ia", "inteligencia", "artificial", "machine", "learning"],
  chatbot: ["assistente", "bot", "gabot", "rag"],
  contato: ["email", "whatsapp", "linkedin", "telefone", "falar"],
  dados: ["data", "analytics", "engenharia", "pipeline", "dbt", "sql"],
  portfolio: ["projetos", "cases", "trabalhos", "experiencia"],
  site: ["web", "frontend", "aplicacao", "landing", "interface"],
};

export const RAG_CONFIG = {
  topK: 4,
  minScore: 0.12,
  maxContextChars: 1250,
  maxInputChars: 700,
};

const corpus: RagDocument[] = [
  {
    id: "perfil-profissional",
    title: "Perfil profissional",
    category: "perfil",
    keywords: ["gabriel", "nunes", "perfil", "experiência", "full-stack", "ia", "dados"],
    text:
      "Gabriel Nunes é desenvolvedor full-stack com atuação em desenvolvimento web, inteligência artificial e engenharia de dados. Seu portfólio apresenta projetos com React, TypeScript, Python, SQL, dbt, pipelines analíticos e modelos de machine learning. O foco profissional é construir soluções digitais claras, performáticas, seguras e úteis para problemas reais.",
  },
  {
    id: "stack-tecnica",
    title: "Stack técnica",
    category: "stack",
    keywords: ["react", "typescript", "python", "fastapi", "node", "dbt", "sql", "tensorflow", "docker"],
    text:
      "Principais tecnologias: React, TypeScript, Tailwind CSS, Framer Motion, Python, FastAPI, Node.js, SQL, dbt, Pandas, NumPy, TensorFlow, PyTorch, Scikit-learn, Keras, Docker, Git e CI/CD. Gabriel também trabalha com SEO técnico, acessibilidade, performance web, integração de APIs e boas práticas de segurança.",
  },
  {
    id: "projetos-destaque",
    title: "Projetos em destaque",
    category: "projetos",
    keywords: ["projetos", "portfolio", "discorama", "velotech", "banvic", "cnn", "dbt"],
    text:
      "Projetos em destaque incluem Discorama Insights Hub, plataforma de análise de dados musicais; Velotech Bike Yourself, experiência web para catálogo e presença digital; BANVIC Analytics, pipeline analítico com SQL e dbt; Classificação CNN, modelo de deep learning para imagens; e Academy DBT, projeto educacional de engenharia de dados com testes e qualidade.",
  },
  {
    id: "servicos-profissionais",
    title: "Atuação profissional",
    category: "servicos",
    keywords: ["serviços", "web", "ui", "ux", "automação", "ia", "dados"],
    text:
      "Gabriel pode colaborar em desenvolvimento web, interfaces UI/UX, automações com IA, chatbots, integrações de API, análise de dados, dashboards e pipelines de engenharia de dados. O trabalho é conduzido com discovery, definição de escopo, implementação incremental, validação técnica e documentação suficiente para manutenção.",
  },
  {
    id: "gabot-rag-local",
    title: "GABOT e RAG local",
    category: "servicos",
    keywords: ["gabot", "chatbot", "bot", "rag", "busca", "semântica", "vetorizado", "local"],
    text:
      "O GABOT usa um RAG local no próprio frontend, com corpus versionado, normalização de acentos para busca, expansão simples de sinônimos, vetorização por frequência de termos e similaridade de cosseno. As respostas preservam a acentuação do conteúdo original e não dependem de Supabase, Lovable, chaves públicas ou chamadas para APIs externas.",
  },
  {
    id: "processo-qualidade",
    title: "Processo e qualidade",
    category: "processo",
    keywords: ["processo", "qualidade", "segurança", "performance", "acessibilidade", "testes"],
    text:
      "O processo valoriza clareza de requisitos, arquitetura simples, versionamento com Git, componentes reutilizáveis, testes quando o risco pede, revisão de performance, responsividade, acessibilidade, SEO técnico e atenção a segurança. Em projetos de dados, a prioridade é rastreabilidade, qualidade, validação e monitoramento.",
  },
  {
    id: "contato-canais",
    title: "Canais de contato",
    category: "contato",
    keywords: ["contato", "email", "whatsapp", "github", "linkedin", "youtube"],
    text:
      "Contato profissional: email gabrielnbn@hotmail.com, WhatsApp +55 71 99942-8340, GitHub github.com/Gabriel-boop-deep, LinkedIn linkedin.com/in/gabriel-nunes-barbosa-nogueira e YouTube youtube.com/@IdeIA-f7l5i. Para conversar sobre uma oportunidade, envie contexto, objetivo, prazo desejado e links ou materiais relevantes.",
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) => {
  const baseTokens = normalize(value)
    .split(" ")
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));

  const expanded = new Set(baseTokens);
  baseTokens.forEach((token) => {
    Object.entries(SYNONYMS).forEach(([root, terms]) => {
      if (token === root || terms.includes(token)) {
        expanded.add(root);
        terms.forEach((term) => expanded.add(term));
      }
    });
  });

  return [...expanded];
};

const termFrequency = (tokens: string[]) =>
  tokens.reduce<Record<string, number>>((acc, token) => {
    acc[token] = (acc[token] ?? 0) + 1;
    return acc;
  }, {});

const magnitude = (vector: Record<string, number>) =>
  Math.sqrt(Object.values(vector).reduce((sum, value) => sum + value * value, 0));

const cosineSimilarity = (left: Record<string, number>, right: Record<string, number>) => {
  const leftMagnitude = magnitude(left);
  const rightMagnitude = magnitude(right);
  if (!leftMagnitude || !rightMagnitude) return 0;

  const dot = Object.entries(left).reduce((sum, [term, value]) => {
    return sum + value * (right[term] ?? 0);
  }, 0);

  return dot / (leftMagnitude * rightMagnitude);
};

const documentVectors = corpus.map((document) => {
  const weightedText = [
    document.title,
    document.text,
    document.keywords.join(" "),
    document.keywords.join(" "),
  ].join(" ");

  return {
    document,
    vector: termFrequency(tokenize(weightedText)),
  };
});

export const searchPortfolioKnowledge = (query: string): SearchHit[] => {
  const vector = termFrequency(tokenize(query));

  return documentVectors
    .map(({ document, vector: documentVector }) => ({
      ...document,
      score: cosineSimilarity(vector, documentVector),
    }))
    .filter((hit) => hit.score >= RAG_CONFIG.minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, RAG_CONFIG.topK);
};

const detectIntent = (input: string) => {
  const normalized = normalize(input);
  if (/^(oi|ola|olá|bom dia|boa tarde|boa noite)\b/.test(normalized)) return "greeting";
  if (/(contato|email|whats|whatsapp|telefone|linkedin|github|falar)/.test(normalized)) return "contact";
  if (/(projeto|portfolio|portifolio|case|trabalho|github|repositorio)/.test(normalized)) return "projects";
  if (/(tecnologia|stack|ferramenta|linguagem|framework|react|python|dados|ia|ai)/.test(normalized)) return "stack";
  if (/(preco|valor|orcamento|orçamento|custa|contratar|proposta)/.test(normalized)) return "proposal";
  return "general";
};

const leadByIntent: Record<string, string> = {
  greeting:
    "Olá! Sou o GABOT, assistente local do portfólio do Gabriel. Posso te orientar sobre perfil, stack, projetos, atuação profissional e contato.",
  contact:
    "Para falar com Gabriel, estes são os melhores canais:",
  projects:
    "Pelo portfólio, os projetos mais relevantes para esse contexto são:",
  stack:
    "A stack do Gabriel combina desenvolvimento web, IA e engenharia de dados:",
  proposal:
    "Para uma conversa profissional ou proposta, o ideal é enviar objetivo, prazo, escopo inicial e referências do projeto.",
  general:
    "Encontrei estas informações no conhecimento local do portfólio:",
};

const fallback =
  "Não encontrei contexto suficiente no RAG local para responder com segurança. Posso ajudar melhor se você perguntar sobre Gabriel, projetos, stack, IA, dados, desenvolvimento web ou contato.";

export const generateLocalRagAnswer = (input: string, history: ChatMessage[] = []) => {
  const safeInput = input.slice(0, RAG_CONFIG.maxInputChars);
  const expandedQuery = [
    safeInput,
    history
      .slice(-4)
      .map((message) => message.content)
      .join(" "),
  ].join(" ");

  const intent = detectIntent(safeInput);
  const hits = searchPortfolioKnowledge(expandedQuery);

  if (!hits.length) {
    return {
      answer: fallback,
      hits,
      intent,
    };
  }

  const context = hits
    .map((hit) => hit.text)
    .join("\n")
    .slice(0, RAG_CONFIG.maxContextChars);

  const sources = hits
    .map((hit) => hit.title)
    .filter((title, index, titles) => titles.indexOf(title) === index)
    .join(", ");

  return {
    answer: `${leadByIntent[intent]}\n\n${context}\n\nFontes locais consultadas: ${sources}.`,
    hits,
    intent,
  };
};
