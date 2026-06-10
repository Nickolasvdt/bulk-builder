import type { SiteContent, SiteTheme } from "@/lib/types";
import { toWhatsAppLink } from "@/lib/utils";

interface Props {
  contact: SiteContent["contact"];
  theme: SiteTheme;
  telefone: string | null | undefined;
  email: string | null | undefined;
  cidade: string | null | undefined;
  estado: string | null | undefined;
}

export function SiteContact({
  contact,
  theme,
  telefone,
  email,
  cidade,
  estado,
}: Props) {
  const waLink = toWhatsAppLink(telefone, contact.headline);
  const localidade = [cidade, estado].filter(Boolean).join("/");

  return (
    <section id="contato" className="bg-ink py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 text-center">
        <p className="txt-eyebrow text-bg/40 mb-4">Entre em contato</p>
        <h2 className="font-display font-bold text-[clamp(28px,3.5vw,44px)] leading-[1.1] tracking-[-0.025em] text-bg mb-4">
          {contact.headline}
        </h2>
        <p className="text-[15px] text-bg/50 mb-10 max-w-lg mx-auto">
          {contact.subtexto}
        </p>

        {/* Cards de contato */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-bg/20 px-6 py-4 text-[14px] font-semibold text-bg hover:border-bg/40 transition-colors bg-bg/5"
            >
              <span className="text-xl">💬</span>
              <div className="text-left">
                <div className="text-[11px] text-bg/40 font-mono tracking-wider uppercase mb-0.5">WhatsApp</div>
                <div>{telefone}</div>
              </div>
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 rounded-xl border border-bg/20 px-6 py-4 text-[14px] font-semibold text-bg hover:border-bg/40 transition-colors bg-bg/5"
            >
              <span className="text-xl">✉️</span>
              <div className="text-left">
                <div className="text-[11px] text-bg/40 font-mono tracking-wider uppercase mb-0.5">E-mail</div>
                <div>{email}</div>
              </div>
            </a>
          )}

          {localidade && (
            <div className="flex items-center gap-3 rounded-xl border border-bg/20 px-6 py-4 text-[14px] text-bg bg-bg/5">
              <span className="text-xl">📍</span>
              <div className="text-left">
                <div className="text-[11px] text-bg/40 font-mono tracking-wider uppercase mb-0.5">Localização</div>
                <div>{localidade}</div>
              </div>
            </div>
          )}
        </div>

        {/* CTA principal */}
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-[15px] font-semibold text-white min-h-[52px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.accent }}
          >
            Falar pelo WhatsApp →
          </a>
        )}
      </div>
    </section>
  );
}
