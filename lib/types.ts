import { z } from "zod";

// ── Lead (input — formato idêntico ao agencia-hub) ─────────────────────────

export const sourceDataSchema = z
  .object({
    rating: z.number().nullable().optional(),
    reviews_count: z.number().int().nullable().optional(),
  })
  .passthrough();

export const leadSchema = z.object({
  nome: z.string().min(1),
  segmento: z.string().nullable().optional(),
  cidade: z.string().nullable().optional(),
  estado: z.string().nullable().optional(),
  telefone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  pitch_sugerido: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  heat_score: z.number().int().min(0).max(100).nullable().optional(),
  heat_reasoning: z.string().nullable().optional(),
  source_data: sourceDataSchema.nullable().optional(),
});

export type Lead = z.infer<typeof leadSchema>;

// ── SiteContent (output Claude — validado com Zod) ─────────────────────────

export const serviceItemSchema = z.object({
  emoji: z.string(),
  titulo: z.string(),
  descricao: z.string(),
});

export const highlightSchema = z.object({
  valor: z.string(),
  label: z.string(),
});

export const testimonialSchema = z.object({
  nome: z.string(),
  texto: z.string(),
  estrelas: z.number().int().min(1).max(5).default(5),
});

export const siteContentSchema = z.object({
  meta: z.object({
    titulo: z.string(),
    descricao: z.string(),
  }),
  hero: z.object({
    headline: z.string(),
    subheadline: z.string(),
    cta_primario: z.string(),
    cta_secundario: z.string(),
  }),
  services: z.array(serviceItemSchema).min(3).max(6),
  about: z.object({
    texto: z.string(),
    highlights: z.array(highlightSchema).length(3),
  }),
  social_proof: z.object({
    titulo: z.string(),
    testimonials: z.array(testimonialSchema).min(2).max(3),
  }),
  contact: z.object({
    headline: z.string(),
    subtexto: z.string(),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

// ── SiteTheme ──────────────────────────────────────────────────────────────

export interface SiteTheme {
  accent: string;
  sun: string;
  heroImage: string;
}

// ── StoredSite (persiste em data/sites/[id].json) ──────────────────────────

export interface StoredSite {
  id: string;
  createdAt: string;
  lead: Lead;
  content: SiteContent;
  theme: SiteTheme;
}
