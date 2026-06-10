import type { SiteContent, SiteTheme } from "@/lib/types";

interface Props {
  about: SiteContent["about"];
  nome: string;
  theme: SiteTheme;
}

export function SiteAbout({ about, nome, theme }: Props) {
  return (
    <section
      id="sobre"
      className="relative bg-ink py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${theme.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-ink/85" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <p className="txt-eyebrow text-bg/40 mb-4">Nossa história</p>
            <h2 className="font-display font-bold text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-[-0.025em] text-bg mb-6">
              Sobre a{" "}
              <span
                className="italic"
                style={{ color: theme.accent }}
              >
                {nome}
              </span>
            </h2>
            <p className="text-[15px] text-bg/55 leading-relaxed max-w-lg">
              {about.texto}
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-6 lg:gap-8">
            {about.highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span
                  className="font-display font-bold text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.04em]"
                  style={{ color: theme.accent }}
                >
                  {h.valor}
                </span>
                <span className="mt-2 text-[11px] font-mono tracking-[0.14em] uppercase text-bg/50 leading-tight">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
