import type { SiteTheme } from "./types";

interface SegmentTheme {
  accent: string;
  sun: string;
  heroImage: string;
}

const UNSPLASH_BASE = "https://images.unsplash.com";

const SEGMENT_THEMES: Record<string, SegmentTheme> = {
  barbearia: {
    accent: "#92400e",
    sun: "#78350f",
    heroImage: `${UNSPLASH_BASE}/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80`,
  },
  barber: {
    accent: "#92400e",
    sun: "#78350f",
    heroImage: `${UNSPLASH_BASE}/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80`,
  },
  restaurante: {
    accent: "#c2410c",
    sun: "#9a3412",
    heroImage: `${UNSPLASH_BASE}/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80`,
  },
  clinica: {
    accent: "#0369a1",
    sun: "#075985",
    heroImage: `${UNSPLASH_BASE}/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80`,
  },
  saude: {
    accent: "#0369a1",
    sun: "#075985",
    heroImage: `${UNSPLASH_BASE}/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80`,
  },
  medico: {
    accent: "#0369a1",
    sun: "#075985",
    heroImage: `${UNSPLASH_BASE}/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80`,
  },
  academia: {
    accent: "#b91c1c",
    sun: "#991b1b",
    heroImage: `${UNSPLASH_BASE}/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80`,
  },
  fitness: {
    accent: "#b91c1c",
    sun: "#991b1b",
    heroImage: `${UNSPLASH_BASE}/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80`,
  },
  advocacia: {
    accent: "#1e40af",
    sun: "#1e3a8a",
    heroImage: `${UNSPLASH_BASE}/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80`,
  },
  juridico: {
    accent: "#1e40af",
    sun: "#1e3a8a",
    heroImage: `${UNSPLASH_BASE}/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80`,
  },
  advogado: {
    accent: "#1e40af",
    sun: "#1e3a8a",
    heroImage: `${UNSPLASH_BASE}/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80`,
  },
  tecnologia: {
    accent: "#6d28d9",
    sun: "#5b21b6",
    heroImage: `${UNSPLASH_BASE}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`,
  },
  tech: {
    accent: "#6d28d9",
    sun: "#5b21b6",
    heroImage: `${UNSPLASH_BASE}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`,
  },
  software: {
    accent: "#6d28d9",
    sun: "#5b21b6",
    heroImage: `${UNSPLASH_BASE}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`,
  },
};

const DEFAULT_THEME: SegmentTheme = {
  accent: "#7a0000",
  sun: "#420000",
  heroImage: `${UNSPLASH_BASE}/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80`,
};

export function getTheme(segmento: string | null | undefined): SiteTheme {
  if (!segmento) return DEFAULT_THEME;

  const normalized = segmento
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

  if (normalized in SEGMENT_THEMES) return SEGMENT_THEMES[normalized];

  for (const [key, theme] of Object.entries(SEGMENT_THEMES)) {
    if (normalized.includes(key) || key.includes(normalized)) return theme;
  }

  return DEFAULT_THEME;
}
