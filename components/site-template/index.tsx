import type { StoredSite } from "@/lib/types";
import { SiteNav } from "./SiteNav";
import { SiteHero } from "./SiteHero";
import { SiteServices } from "./SiteServices";
import { SiteAbout } from "./SiteAbout";
import { SiteSocialProof } from "./SiteSocialProof";
import { SiteContact } from "./SiteContact";
import { SiteFooter } from "./SiteFooter";

interface Props {
  site: StoredSite;
}

export function SiteTemplate({ site }: Props) {
  const { lead, content, theme } = site;

  return (
    <div
      style={
        {
          "--accent": theme.accent,
          "--sun": theme.sun,
        } as React.CSSProperties
      }
    >
      <SiteNav nome={lead.nome} telefone={lead.telefone} />

      <SiteHero
        hero={content.hero}
        theme={theme}
        segmento={lead.segmento}
        cidade={lead.cidade}
        estado={lead.estado}
        telefone={lead.telefone}
      />

      <SiteServices services={content.services} theme={theme} />

      <SiteAbout about={content.about} nome={lead.nome} theme={theme} />

      <SiteSocialProof
        socialProof={content.social_proof}
        rating={lead.source_data?.rating}
        reviewsCount={lead.source_data?.reviews_count}
        theme={theme}
      />

      <SiteContact
        contact={content.contact}
        theme={theme}
        telefone={lead.telefone}
        email={lead.email}
        cidade={lead.cidade}
        estado={lead.estado}
      />

      <SiteFooter
        nome={lead.nome}
        instagram={lead.instagram}
        theme={theme}
      />
    </div>
  );
}
