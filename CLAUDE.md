# Bulk Builder — Gerador de Sites para Leads

## O que este projeto faz

Gera sites profissionais para leads B2B da Bulk Studio. Cada site é um arquivo JSON em `sites/[slug].json`, renderizado automaticamente em `https://bulk-builder.vercel.app/[slug]`. Quando um novo arquivo é commitado e enviado ao GitHub, a Vercel reconstrói e o site vai ao ar automaticamente.

---

## Instruções para Claude Code

Quando o usuário colar dados de um lead, **execute o processo completo abaixo sem perguntar** — a menos que falte informação crítica (nome ou segmento).

### Passo 1 — Gerar o slug

- Deriva do nome do negócio: `"Barbearia do Zé"` → `barbearia-do-ze`
- Apenas letras minúsculas, números e hífens (sem acentos, sem espaços)
- Máximo 40 caracteres — se necessário, truncar no último hífen antes do limite
- Verificar se `sites/[slug].json` já existe. Se existir, adicionar sufixo: `[slug]-2`, `[slug]-3`
- Exemplos: `clinica-odonto-silva`, `academia-corpo-e-saude`, `restaurante-da-familia`

### Passo 2 — Selecionar tema por segmento

| Segmento (contém) | accent | sun |
|---|---|---|
| barbearia, barber | `#92400e` | `#78350f` |
| restaurante, lanchonete, pizzaria | `#c2410c` | `#9a3412` |
| clínica, saúde, médico, odonto, farmácia | `#0369a1` | `#075985` |
| academia, fitness, personal | `#b91c1c` | `#991b1b` |
| advocacia, jurídico, advogado | `#1e40af` | `#1e3a8a` |
| tecnologia, software, dev, ti | `#6d28d9` | `#5b21b6` |
| qualquer outro | `#7a0000` | `#420000` |

**heroImage** por segmento (usar exatamente estas URLs):
- barbearia → `https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80`
- restaurante → `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80`
- clínica/saúde → `https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80`
- academia → `https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80`
- advocacia → `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80`
- tecnologia → `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80`
- default → `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80`

### Passo 3 — Gerar o conteúdo do site

Crie conteúdo profissional em **português do Brasil**, persuasivo, humano e local. Use os dados do lead como base.

#### meta
- `titulo`: "[Nome] — [Segmento] em [Cidade]" — máximo **60 caracteres** (conta espaços e traços)
  - Se sem cidade: "[Nome] — [Segmento]"
  - Se ainda longo: abrevie o segmento ("Odont." em vez de "Odontologia")
- `descricao`: inclui benefício principal + CTA ("Agende", "Peça pelo WhatsApp", "Marque sua consulta") — máximo **155 caracteres**

#### hero
- `headline`: frase de impacto em até **8 palavras**. Deve ter ritmo e causar impacto na primeira leitura.
  - Bons exemplos: "Corte que define. Estilo que dura." / "Sabor de casa no coração da cidade." / "Seu sorriso começa aqui."
  - Ruins (reescrever): "Estamos aqui para servir você" / "Seu negócio em boas mãos" / "Qualidade e excelência sempre"
- `subheadline`: 1-2 frases sobre o benefício real. Tom próximo e local. Mencione a cidade se disponível.
- `cta_primario`: verbo de ação + canal
  - Com telefone: "Agendar pelo WhatsApp", "Fazer pedido", "Marcar consulta"
  - Sem telefone: "Ver serviços", "Conheça a gente", "Nosso cardápio"
- `cta_secundario`: navegação suave → "Ver serviços", "Conheça a gente", "Nosso cardápio"

#### services (3 a 6 itens)
Gere serviços **reais e específicos** para o segmento. Nunca use genéricos.
- Barbearia: Corte Masculino, Barba, Degradê, Hidratação Capilar, Sobrancelha
- Restaurante: Almoço Executivo, Delivery, Lanches, Sobremesas, Cardápio Kids
- Clínica odonto: Limpeza, Clareamento, Aparelho, Implante, Emergência
- Academia: Musculação, Personal Trainer, Spinning, Funcional, Avaliação Física
- Advocacia: Direito Trabalhista, Direito Civil, Direito Familiar, Previdenciário, Consultoria

Cada serviço:
- `emoji`: relevante ao serviço (✂️ 🍕 🦷 💪 ⚖️). Nunca use 🔷 ✅ ⭐ 🌟 como emoji de serviço.
- `titulo`: nome do serviço (2-4 palavras, pesquisável no Google)
- `descricao`: uma frase curta e direta sobre o benefício

#### about
- `texto`: 2-3 frases sobre a história ou diferenciais. Use a cidade se disponível. Tom humano, como o dono falando.
- `highlights`: **exatamente 3 itens**
  - Se `source_data.rating` disponível: use como avaliação (ex: "4.8★")
  - Se `source_data.reviews_count` disponível: use como base para "Clientes atendidos"
  - Negócio novo/pequeno: "3+", "50+", "4.8★"
  - Negócio estabelecido: "10+", "500+", "5★"

#### social_proof
- `titulo`: "O que nossos clientes dizem" ou variação natural
- `testimonials`: 2 ou 3 depoimentos com:
  - Nomes brasileiros comuns: João Silva, Maria Santos, Carlos Oliveira, Ana Costa, Pedro Lima
  - Nunca: Kevin, Tyler, John, Ashley, Jennifer
  - Texto em 2 frases, tom WhatsApp, menciona algo específico do serviço
  - `estrelas`: sempre 5

#### contact
- `headline`: "Vamos conversar?", "Pronto para começar?", "Fale com a gente"
- `subtexto`: frase curta e acolhedora

### Passo 4 — Criar o arquivo JSON

Criar `sites/[slug].json` com este formato exato:

```json
{
  "id": "[slug]",
  "createdAt": "[ISO 8601 — data atual]",
  "lead": {
    "nome": "[nome do negócio]",
    "segmento": "[segmento ou null]",
    "cidade": "[cidade ou null]",
    "estado": "[UF ou null]",
    "telefone": "[telefone ou null]",
    "email": "[email ou null]",
    "instagram": "[handle sem @ ou null]",
    "pitch_sugerido": "[pitch ou null]",
    "tags": [],
    "heat_score": null,
    "heat_reasoning": null,
    "source_data": {
      "rating": "[número ou null]",
      "reviews_count": "[número ou null]"
    }
  },
  "content": {
    "meta": { "titulo": "...", "descricao": "..." },
    "hero": {
      "headline": "...",
      "subheadline": "...",
      "cta_primario": "...",
      "cta_secundario": "..."
    },
    "services": [
      { "emoji": "✂️", "titulo": "...", "descricao": "..." }
    ],
    "about": {
      "texto": "...",
      "highlights": [
        { "valor": "10+", "label": "Anos de experiência" },
        { "valor": "500+", "label": "Clientes atendidos" },
        { "valor": "5★", "label": "Avaliação média" }
      ]
    },
    "social_proof": {
      "titulo": "...",
      "testimonials": [
        { "nome": "...", "texto": "...", "estrelas": 5 }
      ]
    },
    "contact": { "headline": "...", "subtexto": "..." }
  },
  "theme": {
    "accent": "[hex do segmento]",
    "sun": "[hex do segmento]",
    "heroImage": "[URL do Unsplash do segmento]"
  }
}
```

### Passo 5 — Pipeline de Qualidade

Após criar o arquivo, **antes de commitar**, execute o pipeline de qualidade. Despache os 4 agentes abaixo **em paralelo** usando o `Agent` tool. Cada agente recebe como contexto o caminho do arquivo `sites/[slug].json` e o slug do lead.

---

#### Agente 1 — Copy Agent

**Prompt completo para o agente:**

```
Você é o Copy Agent do pipeline de qualidade do bulk-builder.

Sua tarefa: ler o arquivo sites/[slug].json, revisar todos os campos de texto e corrigir automaticamente qualquer problema. Depois, salvar o arquivo com as correções.

CLICHÊS PROIBIDOS — se qualquer um aparecer em qualquer campo de texto, reescreva o campo:
excelência, qualidade premium, líder de mercado, missão é servir, referência em, inovação, soluções, diferenciado, compromisso com, parceiro ideal, visando sempre, foco no cliente, atendimento diferenciado, superando expectativas

HEADLINE (content.hero.headline):
- Máximo 8 palavras (conta cada palavra separada por espaço)
- Deve ter ritmo — leia em voz alta, deve soar bem
- Frases planas que devem ser reescritas: "Estamos aqui para você", "Seu negócio em boas mãos", "Atendemos com qualidade"
- Boas referências: "Corte que define. Estilo que dura." / "Sabor de casa no coração da cidade." / "Seu sorriso, nossa especialidade."

SUBHEADLINE (content.hero.subheadline):
- 1-2 frases sobre benefício real para o cliente (não o negócio)
- Deve mencionar algo específico (não "serviços com qualidade")
- Se lead.cidade está disponível, mencione a cidade naturalmente

SERVIÇOS (content.services[*].descricao):
- Cada descrição deve ser específica ao serviço listado
- Genéricos inaceitáveis: "Atendimento diferenciado", "Serviço de qualidade", "Profissionais especializados"
- Reescreva se for genérica: descreva o benefício real em uma frase

DEPOIMENTOS (content.social_proof.testimonials[*]):
- Nomes aceitáveis: João Silva, Maria Santos, Carlos Oliveira, Ana Costa, Pedro Lima, Fernanda Souza, Roberto Alves
- Nomes inaceitáveis: Kevin, Tyler, John, Ashley, Jennifer, Alex (ambíguo), Sam (ambíguo)
- Tom: como alguém escreveria no WhatsApp, não como review formal
- Deve mencionar algo específico (serviço, experiência, resultado)
- Se um depoimento for genérico ("Muito bom!"), reescreva com 2 frases concretas

ABOUT (content.about.texto):
- Tom humano — como se o dono do negócio estivesse falando
- 2-3 frases
- Deve mencionar a cidade se lead.cidade está disponível
- Evitar: tom corporativo, "nossa empresa", "nossos colaboradores", "missão"

Após revisar e corrigir, salve o arquivo sites/[slug].json com as alterações.
Retorne um resumo das correções feitas (campo → problema → como foi corrigido), ou "Nenhuma correção necessária" se tudo estava ok.
```

---

#### Agente 2 — SEO Agent

**Prompt completo para o agente:**

```
Você é o SEO Agent do pipeline de qualidade do bulk-builder.

Sua tarefa: ler o arquivo sites/[slug].json, verificar e otimizar todos os campos relevantes para SEO. Corrigir automaticamente e salvar o arquivo.

META TÍTULO (content.meta.titulo):
- Máximo 60 caracteres (contando espaços, traços e tudo)
- Formato ideal: "[Nome do Negócio] — [Segmento] em [Cidade]"
- Se sem cidade: "[Nome do Negócio] — [Segmento]"
- Se muito longo: abrevie o segmento, nunca corte o nome do negócio
- Exemplos bons (≤60 chars):
  "Barbearia do Zé — Barbearia em São Paulo" (41 chars ✓)
  "Clínica Silva — Odontologia em Campinas" (40 chars ✓)
- Exemplos ruins (>60 chars): reescrever

META DESCRIÇÃO (content.meta.descricao):
- Máximo 155 caracteres
- Deve incluir CTA natural: "Agende agora", "Peça pelo WhatsApp", "Marque sua consulta", "Entre em contato"
- Deve incluir palavra-chave principal: segmento + cidade
- Se muito longa: corte detalhes secundários, preserve o CTA e a keyword
- Conta os caracteres após escrever e ajuste se necessário

MENÇÃO DE LOCALIZAÇÃO:
- lead.cidade e/ou lead.estado devem aparecer em pelo menos 1 campo de conteúdo além do meta.titulo
- Campos válidos: hero.subheadline ou about.texto
- Se a cidade não aparece em nenhum: adicione naturalmente em hero.subheadline ou about.texto

TÍTULOS DE SERVIÇOS (content.services[*].titulo):
- Devem ser termos que pessoas pesquisam no Google
- Normalizar termos poéticos para termos práticos:
  "Transformação Capilar" → "Corte Masculino"
  "Cuidado Bucal" → "Limpeza Dental"
  "Arte em Barba" → "Barba"
  "Renove Seu Visual" → "Coloração"
  "Bem-estar Físico" → "Personal Trainer"

Após revisar e corrigir, salve o arquivo sites/[slug].json com as alterações.
Retorne um resumo das correções feitas, ou "Nenhuma correção necessária".
```

---

#### Agente 3 — Design Agent

**Prompt completo para o agente:**

```
Você é o Design Agent do pipeline de qualidade do bulk-builder.

Sua tarefa: ler o arquivo sites/[slug].json, verificar coerência visual e dados, corrigir automaticamente e salvar.

TEMA — CORES E IMAGEM (theme.accent, theme.sun, theme.heroImage):
Verifique se os valores batem com o segmento (lead.segmento). Use esta tabela:

| Segmento | accent | sun | heroImage (sufixo Unsplash) |
|---|---|---|---|
| barbearia, barber | #92400e | #78350f | photo-1503951914875-452162b0f3f1 |
| restaurante, lanchonete, pizzaria | #c2410c | #9a3412 | photo-1517248135467-4c7edcad34c4 |
| clínica, saúde, médico, odonto, farmácia | #0369a1 | #075985 | photo-1584820927498-cfe5211fd8bf |
| academia, fitness, personal | #b91c1c | #991b1b | photo-1534438327276-14e5300c3a48 |
| advocacia, jurídico, advogado | #1e40af | #1e3a8a | photo-1589829545856-d10d557cf95f |
| tecnologia, software, dev, ti | #6d28d9 | #5b21b6 | photo-1518770660439-4636190af475 |
| qualquer outro | #7a0000 | #420000 | photo-1556742049-0cfed4f6a45d |

URL completa do heroImage: https://images.unsplash.com/[sufixo]?auto=format&fit=crop&w=1200&q=80

Se os valores não batem com o segmento, corrija para os valores corretos.

SERVIÇOS (content.services):
- Mínimo 3, máximo 6 itens
- Emojis: devem ser relevantes ao serviço específico
  - Proibidos como emoji principal de serviço: 🔷 ✅ ⭐ 🌟 💯 🎯
  - Bons para barbearia: ✂️ 🪒 💈 🧴 🪮
  - Bons para restaurante: 🍕 🥩 🍝 🥗 🍰 🚗(delivery)
  - Bons para clínica: 🦷 😁 🔬 💊 🩺
  - Bons para academia: 💪 🏋️ 🚴 🧘 📊
  - Bons para advocacia: ⚖️ 📋 🏛️ 📜 🤝
  - Bons para tech: 💻 📱 🔧 🌐 ⚙️
- Títulos: 2-4 palavras

HIGHLIGHTS (content.about.highlights):
- Deve ter EXATAMENTE 3 itens com {valor, label}
- Se lead.source_data.rating está disponível: use para o item de avaliação (ex: "4.8★")
- Se lead.source_data.reviews_count está disponível: use como base para o item de clientes
- Números plausíveis para o porte:
  - Negócio novo (reviews_count < 50 ou ausente): "3+", "50+", "4.8★"
  - Negócio médio (reviews_count 50-500): "5+", "200+", "4.9★"
  - Negócio consolidado (reviews_count > 500): "10+", "500+", "5★"
- Labels sugeridos: "Anos de experiência", "Clientes atendidos", "Avaliação média"

CTAs:
- cta_primario: deve começar com verbo de ação
  - Com telefone disponível: "Agendar pelo WhatsApp", "Fazer pedido", "Marcar consulta"
  - Sem telefone: "Ver serviços", "Conheça a gente", "Nosso cardápio"
- cta_secundario: deve ser navegação suave, sem verbo imperativo forte
  - Exemplos bons: "Ver serviços", "Conheça a gente", "Nosso cardápio"
  - Exemplo ruim: "CLIQUE AQUI"

Após revisar e corrigir, salve o arquivo sites/[slug].json com as alterações.
Retorne um resumo das correções feitas, ou "Nenhuma correção necessária".
```

---

#### Agente 4 — Tech Agent

**Prompt completo para o agente:**

```
Você é o Tech Agent do pipeline de qualidade do bulk-builder.

Sua tarefa: ler o arquivo sites/[slug].json, validar e corrigir a estrutura técnica, segurança e conformidade de formatos. Salvar o arquivo após correções.

ID E SLUG:
- id deve conter apenas [a-z0-9-], máximo 40 caracteres
- Deve ser idêntico ao nome do arquivo (sem .json)
- Se contiver caracteres inválidos: normalize (lowercase, remove acentos, troca espaços/pontos por hífens)
- Exemplo de correção: "Barbearia_do_Zé!" → "barbearia-do-ze"

CREATED_AT:
- Deve ser ISO 8601 válido, ex: "2026-06-10T00:00:00.000Z"
- Se ausente, errado ou malformado: use a data atual no formato correto

TELEFONE (lead.telefone):
- Se presente: deve conter apenas dígitos, parênteses, hífens, espaços e o símbolo +
- Deve ter no mínimo 10 dígitos numéricos (DDD + número)
- Se inválido e não pode ser inferido: defina como null
- Não altere números válidos mesmo que sem formatação

INSTAGRAM (lead.instagram):
- Se começa com @: remova o @
- Se contém URL completa (ex: "instagram.com/nome" ou "https://www.instagram.com/nome"): extraia apenas o handle
- Resultado deve ser apenas o handle (ex: "barbeariadoze")

SANITIZAÇÃO XSS — verifique todos os campos de texto:
- Remova qualquer ocorrência de: <script, </script>, javascript:, onerror=, onclick=, onload=, <iframe, <img src=
- Se campo ficou vazio após sanitização: defina como null (se opcional) ou substitua por texto padrão adequado ao contexto
- Campos a verificar: todos os valores string em content.* e lead.*

CAMPOS OBRIGATÓRIOS — nenhum deve ser string vazia "":
- id, createdAt
- lead.nome
- content.meta.titulo, content.meta.descricao
- content.hero.headline, content.hero.subheadline, content.hero.cta_primario, content.hero.cta_secundario
- content.about.texto
- content.contact.headline, content.contact.subtexto

ESTRUTURA DOS ARRAYS:
- content.services: entre 3 e 6 itens. Cada item deve ter emoji (string), titulo (string), descricao (string).
- content.about.highlights: exatamente 3 itens. Cada item deve ter valor (string) e label (string).
- content.social_proof.testimonials: entre 2 e 3 itens. Cada item deve ter nome (string), texto (string), estrelas (número inteiro = 5).
  - Se estrelas não for 5: corrija para 5.

Após revisar e corrigir, salve o arquivo sites/[slug].json com as alterações.
Retorne um resumo das correções feitas, ou "Nenhuma correção necessária".
```

---

**Após todos os 4 agentes concluírem:**

1. Leia o arquivo `sites/[slug].json` corrigido
2. Verifique se há inconsistências entre as correções (ex: Design Agent e Tech Agent divergiram em highlights)
3. Se houver conflito, aplique a versão mais correta e salve novamente
4. Confirme: "Pipeline concluído. Correções: [lista resumida]"

### Passo 6 — Commitar e enviar

```bash
git add sites/[slug].json
git commit -m "feat: site [nome do negócio] ([cidade/UF])"
git push
```

**Se o pre-commit hook bloquear:** leia o erro, corrija o campo indicado no JSON, salve, e rode o `git commit` novamente.

### Passo 7 — Confirmar deploy

Após o push, informe ao usuário:

```
✓ Site no ar: https://bulk-builder.vercel.app/[slug]
  (Vercel reconstrói em ~30s após o push)
```

---

## Casos de Borda

### Sem telefone (lead.telefone = null)
- `cta_primario`: use "Ver serviços", "Conheça a gente" ou variante — nunca "Agendar pelo WhatsApp"
- O componente SiteHero.tsx já trata o fallback (href="#servicos"), mas o texto do CTA deve ser coerente

### Sem cidade (lead.cidade = null)
- `meta.titulo`: "[Nome] — [Segmento]" (omita "em [Cidade]")
- Não mencione localização no conteúdo — mantenha frase genérica

### Segmento desconhecido ou null
- Use tema default (#7a0000 / #420000 / heroImage default)
- Para serviços: use `pitch_sugerido` como guia; se ausente, derive do nome do negócio
- Headline e copy: genéricos mas humanos

### Nome muito longo (>40 chars)
- Truncar slug no último hífen antes do limite de 40 chars
- Ex: "Clínica de Estética e Saúde da Família Silva" → "clinica-de-estetica-e-saude-da-familia"

### Lead duplicado (slug já existe)
- Verificar com `ls sites/[slug].json` antes de criar
- Se existir: usar `[slug]-2`, `[slug]-3`, etc.

### Dados do lead em formato JSON (já estruturado)
- O agencia-hub pode enviar os dados já como JSON
- Nesse caso, leia os campos diretamente — não tente parsear texto livre

---

## Recuperação de Erros

### Pre-commit hook bloqueou o commit
```
✗ sites/barbearia-do-ze.json
  → meta.titulo: 65 chars (máx 60)
```
→ Abra `sites/[slug].json`, corrija o campo indicado, salve, e rode `git commit` novamente.

### Push falhou (sem conexão ou conflito)
→ Verifique conexão e rode `git push` novamente. Se houver conflito de remote: `git pull --rebase && git push`.

### JSON malformado (erro de syntax)
→ Delete `sites/[slug].json` e gere novamente a partir dos dados originais do lead.

### Agente do pipeline retornou conteúdo inválido
→ Leia o arquivo resultante, corrija manualmente o campo problemático, e confirme com `node scripts/validate-site.mjs sites/[slug].json` antes de commitar.

---

## Padrões de Qualidade

**Nunca use:**
- Clichês: "excelência", "qualidade premium", "líder de mercado", "missão é servir", "referência em", "inovação", "soluções", "diferenciado", "compromisso com", "parceiro ideal"
- Emojis genéricos como emoji de serviço: 🔷 ✅ ⭐ 🌟 💯
- Nomes não-brasileiros nos depoimentos: Kevin, Tyler, John, Ashley, Jennifer

**Sempre use:**
- Linguagem próxima: como um dono de negócio local falaria, não marketing corporativo
- Serviços específicos: reais para o segmento, não genéricos
- Cidade quando disponível: "no centro de São Paulo", "aqui em Campinas"
- Headlines com ritmo: curtas, impactantes, que causam impacto na primeira leitura

---

## Estrutura do projeto

```
bulk-builder/
├── sites/               ← JSONs gerados (um por lead)
├── scripts/
│   └── validate-site.mjs  ← validador do pre-commit
├── app/
│   ├── page.tsx         ← dashboard listando todos os sites
│   └── [slug]/page.tsx  ← renderiza o site de cada lead
├── components/site-template/  ← seções do site (Nav, Hero, etc.)
└── lib/
    ├── types.ts         ← interfaces TypeScript + schemas Zod
    ├── theme.ts         ← cores por segmento
    ├── utils.ts         ← helper de WhatsApp
    └── storage.ts       ← leitura de arquivos JSON
```

**Não modifique** os arquivos de template (`components/`, `app/[slug]/page.tsx`, `lib/`) a menos que seja explicitamente solicitado. Sua tarefa é criar o JSON correto em `sites/` e executar o pipeline de qualidade.
