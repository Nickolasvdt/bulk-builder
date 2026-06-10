# Design: Pipeline de Qualidade com Agentes Especializados

**Data:** 2026-06-10  
**Projeto:** bulk-builder  
**Status:** Aprovado

---

## Contexto

O bulk-builder gera sites profissionais para leads B2B da Bulk Studio. O fluxo atual é:
1. Usuário cola dados do lead no Claude Code
2. Claude Code lê CLAUDE.md e gera `sites/[slug].json`
3. git commit + push → Vercel reconstrói automaticamente

O problema: o JSON gerado não passa por nenhuma revisão de qualidade antes de ir ao ar. Headlines fracas, SEO negligente, dados incoerentes ou campos inválidos podem entrar em produção sem ser detectados.

---

## Objetivo

Adicionar um pipeline de qualidade automático entre a geração do JSON e o commit, composto por 4 agentes especializados rodando em paralelo, mais um pré-commit hook como rede de segurança técnica.

---

## Pipeline Completo

```
[1] Gerar slug + tema
[2] Gerar conteúdo inicial → sites/[slug].json
[3] Pipeline de Qualidade (NOVO)
     ├─ Copy Agent     — revisa/reescreve copy
     ├─ SEO Agent      — otimiza metadados + keywords      ← paralelo
     ├─ Design Agent   — valida coerência visual + dados
     └─ Tech Agent     — valida schema, sanitiza, formatos
     └─ Orquestrador aplica todas as correções ao JSON
[4] Pre-commit hook: Zod schema + regras mínimas
[5] git add + commit + push
[6] Confirmar URL no ar
```

---

## Os 4 Agentes Especializados

### Copy Agent

**Escopo:** toda linguagem textual do site.

Critérios de rejeição (reescreve automaticamente se falhar):
- Headline contém clichês proibidos: "excelência", "qualidade premium", "líder de mercado", "missão é servir", "referência", "inovação", "soluções"
- Headline tem mais de 8 palavras
- Headline não tem ritmo ou impacto (frases planas como "Estamos aqui para atender você")
- Subheadline não menciona benefício real ou é genérica demais
- Descrições de serviços são genéricas (ex: "Atendimento de qualidade") em vez de específicas
- Depoimentos têm nomes não-brasileiros, tom corporativo, ou não mencionam nada específico
- `about.texto` soa como marketing corporativo em vez de dono falando

Ação: reescreve os campos que falham mantendo o segmento, cidade e contexto do lead.

---

### SEO Agent

**Escopo:** metadados e estrutura semântica para indexação.

Critérios e correções:
- `meta.titulo`: deve ter no máximo 60 chars, formato "[Nome] — [Segmento] em [Cidade]". Trunca ou reformata se necessário.
- `meta.descricao`: deve ter no máximo 155 chars, incluir CTA natural ("Agende agora", "Peça pelo WhatsApp"). Reescreve se muito longa ou sem CTA.
- Cidade/estado devem aparecer em pelo menos um campo de conteúdo (hero.subheadline ou about.texto). Insere menção se ausente.
- Títulos de serviços devem ser termos pesquisáveis no Google (ex: "Corte Masculino" não "Transformação Capilar"). Normaliza se necessário.

---

### Design Agent

**Escopo:** coerência visual, dados plausíveis e estrutura do template.

Critérios:
- `theme.accent` e `theme.sun`: devem corresponder ao segmento conforme tabela do CLAUDE.md. Corrige se houver discrepância.
- `theme.heroImage`: deve ser a URL correta para o segmento. Corrige se houver discrepância.
- Serviços: mínimo 3, máximo 6. Emojis devem ser relevantes (não genéricos como 🔷). Títulos com 2-4 palavras.
- `about.highlights`: exatamente 3 itens. Números devem ser plausíveis para o porte — usa `source_data.rating` e `source_data.reviews_count` se disponíveis; para negócio pequeno/novo usa "3+", "50+"; para estabelecido usa "10+", "500+".
- CTA primário: deve começar com verbo de ação + canal ("Agendar pelo WhatsApp", "Fazer pedido"). CTA secundário: deve ser navegação suave ("Ver serviços", "Conheça a gente").

---

### Tech Agent

**Escopo:** integridade estrutural, segurança e conformidade de formatos.

Validações e correções:
- `id` deve ser idêntico ao slug derivado do nome (apenas `[a-z0-9-]`, max 40 chars)
- `createdAt`: ISO 8601 válido com a data atual (formato `2026-06-10T...`)
- `lead.telefone`: se presente, deve conter apenas dígitos, parênteses, hífens e espaços; mínimo 10 dígitos
- `lead.instagram`: se presente, remove `@` se existir
- Todos os campos de texto: sanitiza qualquer HTML tag, `<script>`, `javascript:`, `onerror=` e similares (proteção XSS)
- Campos obrigatórios não podem ser strings vazias `""`
- `social_proof.testimonials`: entre 2 e 3 itens, todos com `estrelas: 5`
- `about.highlights`: exatamente 3 itens (coordena com Design Agent — se ambos corrigirem, Tech tem precedência na estrutura)

---

## Pre-commit Hook

**Propósito:** rede de segurança técnica. Em condições normais, o Tech Agent já garante a estrutura. O hook bloqueia casos extremos.

**Implementação:**
- Script: `scripts/validate-site.mjs`
- Hook: `.husky/pre-commit` (se Husky instalado) ou `.git/hooks/pre-commit`

**O que valida:**
1. Encontra todos os arquivos `.json` staged em `sites/`
2. Para cada arquivo:
   - Parse JSON válido (não corrompido)
   - Validação Zod contra `StoredSite` schema (importado de `lib/types.ts`)
   - Regras adicionais de qualidade:
     - `meta.titulo` ≤ 60 chars
     - `meta.descricao` ≤ 155 chars
     - Headline ≤ 8 palavras
     - `highlights.length === 3`
     - `services.length` entre 3 e 6
     - `testimonials.length` entre 2 e 3
     - `id` só contém `[a-z0-9-]`
     - `createdAt` é data ISO válida
3. Se tudo passa → commit segue normalmente
4. Se falha → exibe erros específicos (arquivo + campo + problema) e sai com código 1

**Exemplo de saída ao bloquear:**
```
✗ sites/barbearia-do-ze.json
  → meta.titulo: 65 chars (máx 60)
  → highlights: 4 itens (esperado 3)

Corrija os erros acima ou rode novamente o pipeline de qualidade.
```

---

## CLAUDE.md — Estrutura Atualizada

### Seções mantidas (sem mudança de lógica)
- Passo 1: Gerar slug
- Passo 2: Selecionar tema por segmento
- Passo 4: Criar o arquivo JSON (formato exato)

### Seções expandidas
- Passo 3: Gerar conteúdo — adiciona critérios explícitos por campo que os agentes vão verificar
- Padrões de qualidade — adiciona lista de clichês proibidos e exemplos positivos por segmento

### Seções novas
- **Passo 5 — Pipeline de Qualidade**: instrução para invocar os 4 agentes em paralelo via `Agent` tool, com prompts completos para cada agente
- **Passo 6 — Commitar e enviar**: renumerado, sem mudança de lógica
- **Passo 7 — Confirmar deploy**: aguardar reconstrução Vercel e confirmar URL acessível
- **Casos de Borda**: sem telefone, sem cidade, segmento desconhecido, nome muito longo
- **Recuperação de Erros**: pre-commit bloqueou, push falhou, JSON malformado

---

## Arquivos Novos e Modificados

| Arquivo | Ação | Descrição |
|---|---|---|
| `CLAUDE.md` | Modificar | Reescrita completa com pipeline + agentes + edge cases |
| `scripts/validate-site.mjs` | Criar | Script de validação do pre-commit |
| `.husky/pre-commit` | Criar | Hook git chamando o script de validação |
| `package.json` | Modificar | Adicionar script `"validate"` + Husky se necessário |

---

## O que não muda

- Nenhum componente React (`components/site-template/`)
- Nenhum arquivo de rota Next.js (`app/`)
- Nenhum arquivo de lib (`lib/types.ts`, `lib/theme.ts`, `lib/utils.ts`, `lib/storage.ts`)
- Estrutura do JSON (`sites/[slug].json`) — o schema permanece idêntico

Os agentes apenas **melhoram o conteúdo** do JSON dentro do schema existente. Nunca adicionam campos novos.

---

## Critérios de Sucesso

1. Um JSON gerado por Claude Code passa pelo pipeline de qualidade sem erros no pre-commit
2. Headlines geradas não contêm nenhum dos clichês proibidos
3. `meta.titulo` sempre ≤ 60 chars e `meta.descricao` sempre ≤ 155 chars
4. O pipeline completo (geração + qualidade + commit) leva menos de 90 segundos
5. O pre-commit nunca bloqueia um JSON que passou pelos 4 agentes
