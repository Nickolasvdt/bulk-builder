import type { SiteContent, SiteTheme } from "@/lib/types";

interface Props {
  socialProof: SiteContent["social_proof"];
  rating: number | null | undefined;
  reviewsCount: number | null | undefined;
  theme: SiteTheme;
}

function Stars({ count, color }: { count: number; color?: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          fill={i < count ? (color ?? "#f59e0b") : "#e5e7eb"}
          className="w-4 h-4"
        >
          <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.873 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z" />
        </svg>
      ))}
    </div>
  );
}

export function SiteSocialProof({
  socialProof,
  rating,
  reviewsCount,
  theme,
}: Props) {
  return (
    <section className="bg-bg py-16 md:py-24 border-b border-rule">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Rating do Google se disponível */}
        {rating != null && (
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className="font-display font-bold text-[56px] leading-none tracking-[-0.04em]"
              style={{ color: theme.accent }}
            >
              {rating.toFixed(1)}
            </span>
            <div>
              <Stars count={Math.round(rating)} color="#f59e0b" />
              {reviewsCount != null && (
                <p className="mt-1 text-[13px] text-mute">
                  {reviewsCount.toLocaleString("pt-BR")} avaliações no Google
                </p>
              )}
            </div>
          </div>
        )}

        <p className="txt-eyebrow text-center mb-3" style={{ color: theme.accent }}>
          Depoimentos
        </p>
        <h2 className="txt-display text-3xl md:text-4xl text-ink text-center mb-12">
          {socialProof.titulo}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialProof.testimonials.map((t, i) => (
            <div key={i} className="rounded-xl border border-rule p-6 bg-bg">
              <Stars count={t.estrelas} color="#f59e0b" />
              <p className="mt-4 text-[14px] leading-relaxed text-mute">
                "{t.texto}"
              </p>
              <p className="mt-4 text-[13px] font-semibold text-ink">
                {t.nome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
