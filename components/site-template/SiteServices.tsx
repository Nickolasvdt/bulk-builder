import type { SiteContent, SiteTheme } from "@/lib/types";

interface Props {
  services: SiteContent["services"];
  theme: SiteTheme;
}

export function SiteServices({ services, theme }: Props) {
  return (
    <section
      id="servicos"
      className="bg-bg border-y border-rule py-16 md:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <p className="txt-eyebrow mb-3" style={{ color: theme.accent }}>
          O que fazemos
        </p>
        <h2 className="txt-display text-3xl md:text-5xl text-ink mb-12">
          Nossos Serviços
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="rounded-xl border border-rule p-6 hover:shadow-md transition-shadow bg-bg"
            >
              <span className="text-4xl">{service.emoji}</span>
              <h3 className="mt-4 font-display font-bold text-[18px] text-ink">
                {service.titulo}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mute">
                {service.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
