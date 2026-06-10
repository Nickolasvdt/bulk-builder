import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { loadSite, listSlugs } from "@/lib/storage";
import { SiteTemplate } from "@/components/site-template";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await loadSite(slug);
  if (!site) return { title: "Site não encontrado" };
  return {
    title: site.content.meta.titulo,
    description: site.content.meta.descricao,
  };
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const site = await loadSite(slug);
  if (!site) notFound();

  return <SiteTemplate site={site} />;
}
