import { describe, expect, it } from "vitest";
import { generateLocalRagAnswer, searchPortfolioKnowledge } from "./localRag";

describe("local RAG", () => {
  it("recupera contato com variações naturais de entrada", () => {
    const hits = searchPortfolioKnowledge("como falo com o gabriel pelo zap ou email?");

    expect(hits[0]?.category).toBe("contato");
    expect(hits[0]?.text).toContain("gabrielnbn@hotmail.com");
  });

  it("entende consulta sem acento e responde preservando acentuação do corpus", () => {
    const { answer } = generateLocalRagAnswer("quais projetos de inteligencia artificial e dados ele fez?");

    expect(answer).toContain("inteligência artificial");
    expect(answer).toMatch(/Classificação CNN|BANVIC Analytics|Discorama/);
  });

  it("usa sinônimos para aproximar perguntas sobre bot e RAG", () => {
    const hits = searchPortfolioKnowledge("o bot usa busca semantica local?");

    expect(hits.some((hit) => hit.text.includes("RAG"))).toBe(true);
  });
});
