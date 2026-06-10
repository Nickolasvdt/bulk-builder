import type { SiteContent, SiteTheme } from "@/lib/types";
import { toWhatsAppLink } from "@/lib/utils";

interface Props {
  hero: SiteContent["hero"];
  theme: SiteTheme;
  segmento: string | null | undefined;
  cidade: string | null | undefined;
  estado: string | null | undefined;
  telefone: string | null | undefined;
}

export function SiteHero({
  hero,
  theme,
  segmento,
  cidade,
  estado,
  telefone,
}: Props) {
  const waLink = toWhatsAppLink(telefone, hero.cta_primario);
  const eyebrow = [segmento, cidade && estado ? `${cidade}/${estado}` : cidade]
    .filter(Boolean)
    .join(" · ");

  return (
    <section
      className="relative bg-ink text-bg min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${theme.heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-ink/75" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-8 pt-24 pb-24">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="txt-eyebrow text-bg/40 mb-6">{eyebrow}</p>
          )}

          <div className="w-8 h-px bg-bg/20 mb-6" />

          <h1 className="font-display font-bold text-[clamp(38px,5.5vw,72px)] leading-[0.92] tracking-[-0.03em] text-bg whitespace-pre-line">
            {hero.headline}
          </h1>

          <p className="mt-7 text-[15px] leading-[1.65] text-bg/55 max-w-[400px]">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {waLink ? (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white min-h-[44px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.accent }}
              >
                {hero.cta_primario} →
              </a>
            ) : (
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-semibold text-white min-h-[44px] transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.accent }}
              >
                {hero.cta_primario} →
              </a>
            )}

            <a
              href="#servicos"
              className="text-[13px] text-bg/40 hover:text-bg transition-colors"
            >
              {hero.cta_secundario} ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
