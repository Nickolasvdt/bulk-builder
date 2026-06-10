"use client";

import { useState, useEffect } from "react";
import { toWhatsAppLink } from "@/lib/utils";

interface Props {
  nome: string;
  telefone: string | null | undefined;
}

export function SiteNav({ nome, telefone }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const waLink = toWhatsAppLink(telefone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerBg = scrolled
    ? "bg-bg/95 backdrop-blur-md border-b border-rule"
    : "bg-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${headerBg}`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between h-16">
        <span
          className={`font-display font-bold text-[18px] transition-colors duration-300 ${
            scrolled ? "text-ink" : "text-bg"
          }`}
        >
          {nome}
        </span>

        <div className="flex items-center gap-3">
          <a
            href="#servicos"
            className={`hidden md:inline-flex items-center text-[14px] transition-colors ${
              scrolled ? "text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
            }`}
          >
            Serviços
          </a>
          <a
            href="#sobre"
            className={`hidden md:inline-flex items-center text-[14px] transition-colors ${
              scrolled ? "text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
            }`}
          >
            Sobre
          </a>
          <a
            href="#contato"
            className={`hidden md:inline-flex items-center text-[14px] transition-colors ${
              scrolled ? "text-ink/60 hover:text-ink" : "text-bg/60 hover:text-bg"
            }`}
          >
            Contato
          </a>

          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[14px] font-semibold min-h-[44px] transition-colors ${
                scrolled
                  ? "bg-accent text-white hover:bg-sun"
                  : "bg-bg text-ink hover:bg-bg/90"
              }`}
            >
              💬 WhatsApp
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
