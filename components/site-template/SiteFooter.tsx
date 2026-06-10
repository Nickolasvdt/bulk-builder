import type { SiteTheme } from "@/lib/types";

interface Props {
  nome: string;
  instagram: string | null | undefined;
  theme: SiteTheme;
}

export function SiteFooter({ nome, instagram, theme }: Props) {
  const igHandle = instagram
    ?.replace(/^@/, "")
    .replace(/^https?:\/\/(?:www\.)?instagram\.com\//, "")
    .replace(/\/$/, "");
  const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

  return (
    <footer className="bg-ink text-bg">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <div className="h-px bg-bg/[0.08] mb-8" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-display font-bold text-[16px] text-bg">
              {nome}
            </span>
            <p className="text-[12px] text-bg/30">
              Todos os direitos reservados.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[13px] text-bg/40">
            {igUrl && (
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-bg transition-colors"
              >
                @{igHandle}
              </a>
            )}
            <span className="text-bg/20">·</span>
            <a
              href="https://bulkstudio.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bg transition-colors"
            >
              Desenvolvido por{" "}
              <span style={{ color: theme.accent }}>Bulk Studio</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
