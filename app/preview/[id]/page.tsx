import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadSite } from "@/lib/storage";
import { SiteTemplate } from "@/components/site-template";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const site = await loadSite(id);
  if (!site) return { title: "Site não encontrado" };
  return {
    title: site.content.meta.titulo,
    description: site.content.meta.descricao,
  };
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params;
  const site = await loadSite(id);
  if (!site) notFound();

  return <SiteTemplate site={site} />;
}
