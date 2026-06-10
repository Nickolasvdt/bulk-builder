import Link from "next/link";
import { listSites } from "@/lib/storage";
import type { StoredSite } from "@/lib/types";

export const dynamic = "force-dynamic";

function SiteCard({ site }: { site: StoredSite }) {
  const date = new Date(site.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const localidade = [site.lead.cidade, site.lead.estado]
    .filter(Boolean)
    .join("/");

  return (
    <div className="rounded-xl border border-rule bg-bg p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display font-bold text-[16px] text-ink">
            {site.lead.nome}
          </h2>
          <p className="mt-0.5 text-[13px] text-mute">
            {[site.lead.segmento, localidade].filter(Boolean).join(" · ")}
          </p>
        </div>

        {/* Dot de cor do accent do tema */}
        <span
          className="mt-1 shrink-0 w-3 h-3 rounded-full"
          style={{ backgroundColor: site.theme.accent }}
        />
      </div>

      <p className="mt-3 line-clamp-2 text-[13px] text-mute leading-relaxed italic">
        "{site.content.hero.headline}"
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] text-mute/70 font-mono">{date}</span>
        <Link
          href={`/preview/${site.id}`}
          target="_blank"
          className="rounded-md px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: site.theme.accent }}
        >
          Ver site →
        </Link>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const sites = await listSites();

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-rule bg-bg px-6 py-5">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-[20px] text-ink">
              Bulk Builder
            </h1>
            <p className="text-[13px] text-mute">
              Sites gerados para leads — Bulk Studio
            </p>
          </div>
          <span className="rounded-full bg-ink/5 px-3 py-1 text-[12px] font-mono text-mute">
            {sites.length} {sites.length === 1 ? "site" : "sites"}
          </span>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        {/* Instrução de uso */}
        <div className="mb-8 rounded-xl border border-rule bg-ink/[0.02] p-5">
          <p className="txt-eyebrow text-mute mb-2">Como usar</p>
          <code className="block text-[12px] text-ink/70 leading-relaxed whitespace-pre-wrap">
            {`POST /api/generate\nContent-Type: application/json\n\n{ "nome": "...", "segmento": "...", "cidade": "...", "telefone": "..." }`}
          </code>
        </div>

        {sites.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-rule p-16 text-center">
            <p className="text-5xl mb-4">🏗️</p>
            <p className="font-display font-bold text-[20px] text-ink mb-2">
              Nenhum site gerado ainda
            </p>
            <p className="text-[14px] text-mute">
              Faça um POST em <code className="font-mono">/api/generate</code>{" "}
              com os dados do lead para começar.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s) => (
              <SiteCard key={s.id} site={s} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
