#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

function getStagedSiteFiles() {
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    });
    return out
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.startsWith('sites/') && f.endsWith('.json') && f !== 'sites/.gitkeep');
  } catch {
    return [];
  }
}

function validateSite(filePath) {
  const errors = [];
  let data;

  const abs = resolve(filePath);
  if (!existsSync(abs)) {
    return [`Arquivo não encontrado: ${filePath}`];
  }

  try {
    data = JSON.parse(readFileSync(abs, 'utf-8'));
  } catch (e) {
    return [`JSON inválido: ${e.message}`];
  }

  // id/slug
  if (!data.id || typeof data.id !== 'string') {
    errors.push('id ausente');
  } else {
    if (!/^[a-z0-9-]+$/.test(data.id))
      errors.push(`id inválido: "${data.id}" (apenas [a-z0-9-] permitido)`);
    if (data.id.length > 40)
      errors.push(`id muito longo: ${data.id.length} chars (máx 40)`);
  }

  // createdAt
  if (!data.createdAt || isNaN(Date.parse(data.createdAt))) {
    errors.push(`createdAt inválido: "${data.createdAt}"`);
  }

  // lead.nome
  if (!data.lead?.nome || data.lead.nome.trim() === '') {
    errors.push('lead.nome ausente ou vazio');
  }

  // meta
  const titulo = data.content?.meta?.titulo ?? '';
  if (!titulo.trim()) errors.push('meta.titulo ausente');
  else if (titulo.length > 60)
    errors.push(`meta.titulo: ${titulo.length} chars (máx 60)`);

  const descricao = data.content?.meta?.descricao ?? '';
  if (!descricao.trim()) errors.push('meta.descricao ausente');
  else if (descricao.length > 155)
    errors.push(`meta.descricao: ${descricao.length} chars (máx 155)`);

  // hero
  const headline = data.content?.hero?.headline ?? '';
  if (!headline.trim()) errors.push('hero.headline ausente');
  else {
    const words = headline.trim().split(/\s+/).length;
    if (words > 8) errors.push(`hero.headline: ${words} palavras (máx 8)`);
  }

  const subheadline = data.content?.hero?.subheadline ?? '';
  if (!subheadline.trim()) errors.push('hero.subheadline ausente ou vazio');

  const ctaPrimario = data.content?.hero?.cta_primario ?? '';
  if (!ctaPrimario.trim()) errors.push('hero.cta_primario ausente ou vazio');

  const ctaSecundario = data.content?.hero?.cta_secundario ?? '';
  if (!ctaSecundario.trim()) errors.push('hero.cta_secundario ausente ou vazio');

  // services
  const services = data.content?.services;
  if (!Array.isArray(services)) {
    errors.push('content.services deve ser um array');
  } else {
    if (services.length < 3)
      errors.push(`services: ${services.length} itens (mín 3)`);
    if (services.length > 6)
      errors.push(`services: ${services.length} itens (máx 6)`);
    services.forEach((s, i) => {
      if (!s.emoji) errors.push(`services[${i}].emoji ausente`);
      if (!s.titulo?.trim()) errors.push(`services[${i}].titulo ausente`);
      if (!s.descricao?.trim()) errors.push(`services[${i}].descricao ausente`);
    });
  }

  // about.highlights
  const highlights = data.content?.about?.highlights;
  if (!Array.isArray(highlights)) {
    errors.push('about.highlights deve ser um array');
  } else if (highlights.length !== 3) {
    errors.push(`highlights: ${highlights.length} itens (esperado exatamente 3)`);
  }

  // about.texto
  if (!data.content?.about?.texto?.trim()) {
    errors.push('about.texto ausente ou vazio');
  }

  // social_proof.testimonials
  const testimonials = data.content?.social_proof?.testimonials;
  if (!Array.isArray(testimonials)) {
    errors.push('social_proof.testimonials deve ser um array');
  } else {
    if (testimonials.length < 2)
      errors.push(`testimonials: ${testimonials.length} itens (mín 2)`);
    if (testimonials.length > 3)
      errors.push(`testimonials: ${testimonials.length} itens (máx 3)`);
    testimonials.forEach((t, i) => {
      if (!t.nome?.trim()) errors.push(`testimonials[${i}].nome ausente`);
      if (!t.texto?.trim()) errors.push(`testimonials[${i}].texto ausente`);
      if (t.estrelas !== 5)
        errors.push(`testimonials[${i}].estrelas: ${t.estrelas} (esperado 5)`);
    });
  }

  // contact
  if (!data.content?.contact?.headline?.trim())
    errors.push('contact.headline ausente ou vazio');
  if (!data.content?.contact?.subtexto?.trim())
    errors.push('contact.subtexto ausente ou vazio');

  // theme
  if (!data.theme?.accent) errors.push('theme.accent ausente');
  if (!data.theme?.sun) errors.push('theme.sun ausente');
  if (!data.theme?.heroImage) errors.push('theme.heroImage ausente');
  if (data.theme?.accent && !/^#[0-9a-f]{6}$/i.test(data.theme.accent))
    errors.push(`theme.accent inválido: "${data.theme.accent}" (formato esperado: #rrggbb)`);
  if (data.theme?.heroImage && !data.theme.heroImage.startsWith('https://images.unsplash.com/'))
    errors.push(`theme.heroImage inválido: deve começar com https://images.unsplash.com/`);

  return errors;
}

// Modo: pre-commit (sem args) ou validação direta (com caminho como arg)
const args = process.argv.slice(2);
const files = args.length > 0 ? args : getStagedSiteFiles();

if (files.length === 0) {
  process.exit(0);
}

let hasErrors = false;

for (const file of files) {
  const errors = validateSite(file);
  if (errors.length > 0) {
    hasErrors = true;
    console.error(`\n✗ ${file}`);
    for (const err of errors) {
      console.error(`  → ${err}`);
    }
  } else {
    console.log(`✓ ${file}`);
  }
}

if (hasErrors) {
  console.error(
    '\nCorrija os erros acima ou rode novamente o pipeline de qualidade.\n'
  );
  process.exit(1);
}

process.exit(0);
