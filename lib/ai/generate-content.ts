import Anthropic from "@anthropic-ai/sdk";
import { env } from "../env";
import { siteContentSchema, type Lead, type SiteContent } from "../types";

let client: Anthropic | undefined;

function getClient(): Anthropic {
  if (!client) client = new Anthropic({ apiKey: env().ANTHROPIC_API_KEY });
  return client;
}

function buildPrompt(lead: Lead): string {
  const rating = lead.source_data?.rating;
  const reviews = lead.source_data?.reviews_count;
  const lines: string[] = [
    `## Dados do negócio`,
    `- Nome: ${lead.nome}`,
    `- Segmento: ${lead.segmento ?? "negócio local"}`,
    `- Cidade: ${lead.cidade ?? "Brasil"}${lead.estado ? `/${lead.estado}` : ""}`,
  ];

  if (rating != null)
    lines.push(
      `- Avaliação Google: ${rating} estrelas (${reviews ?? 0} avaliações)`
    );
  if (lead.tags.length > 0) lines.push(`- Tags: ${lead.tags.join(", ")}`);
  if (lead.pitch_sugerido)
    lines.push(`- Pitch (contexto): "${lead.pitch_sugerido}"`);
  if (lead.heat_reasoning)
    lines.push(`- Análise: "${lead.heat_reasoning}"`);

  return `Você é um copywriter especialista em sites para pequenos negócios brasileiros.

${lines.join("\n")}

## Tarefa
Crie conteúdo profissional e persuasivo para o site desse negócio. Retorne APENAS um objeto JSON válido com a estrutura abaixo. Sem markdown, sem \`\`\`json, sem texto antes ou depois.

{
  "meta": {
    "titulo": "Título SEO da página (máx 60 chars, inclua nome e cidade)",
    "descricao": "Meta description (máx 155 chars, com call-to-action)"
  },
  "hero": {
    "headline": "Frase de impacto em até 8 palavras relacionada ao segmento",
    "subheadline": "Complemento em 1-2 frases focado no benefício ao cliente",
    "cta_primario": "Texto do botão principal (ex: 'Agendar pelo WhatsApp')",
    "cta_secundario": "Texto do botão secundário (ex: 'Ver nossos serviços')"
  },
  "services": [
    { "emoji": "✂️", "titulo": "Nome do serviço", "descricao": "Descrição em 1 frase curta" }
  ],
  "about": {
    "texto": "2-3 frases sobre história e diferenciais do negócio. Tom humano e local.",
    "highlights": [
      { "valor": "10+", "label": "Anos de experiência" },
      { "valor": "500+", "label": "Clientes atendidos" },
      { "valor": "5★", "label": "Avaliação média" }
    ]
  },
  "social_proof": {
    "titulo": "Título da seção de depoimentos",
    "testimonials": [
      { "nome": "Nome Sobrenome", "texto": "Depoimento realista em 2 frases", "estrelas": 5 }
    ]
  },
  "contact": {
    "headline": "Headline da seção de contato (ex: 'Vamos conversar?')",
    "subtexto": "1 frase convidando o cliente a entrar em contato"
  }
}

## Regras
- Gere entre 3 e 6 serviços relevantes para "${lead.segmento ?? "negócio local"}"
- Gere EXATAMENTE 3 highlights com números plausíveis para o porte do negócio
- Gere 2 ou 3 depoimentos com nomes brasileiros comuns e texto genuíno
- Use linguagem natural e próxima, evite clichês corporativos
- Responda APENAS com JSON válido`;
}

export interface GenerateContentResult {
  content: SiteContent;
  tokensIn: number;
  tokensOut: number;
}

export async function generateSiteContent(
  lead: Lead
): Promise<GenerateContentResult> {
  const c = getClient();
  const model = env().ANTHROPIC_MODEL;
  const maxRetries = 2;
  let lastRaw: string | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const prompt =
      attempt === 0
        ? buildPrompt(lead)
        : buildPrompt(lead) +
          "\n\nIMPORTANTE: retorne APENAS JSON válido, sem nenhum texto adicional.";

    const message = await c.messages.create({
      model,
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });

    const tokensIn = message.usage.input_tokens;
    const tokensOut = message.usage.output_tokens;

    const block = message.content[0];
    if (block.type !== "text") continue;

    lastRaw = block.text.trim();

    const jsonStr = lastRaw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      continue;
    }

    const validated = siteContentSchema.safeParse(parsed);
    if (validated.success) {
      return { content: validated.data, tokensIn, tokensOut };
    }
  }

  throw new Error(
    `Claude não retornou JSON válido após ${maxRetries + 1} tentativas. Último output: ${lastRaw?.slice(0, 400)}`
  );
}
