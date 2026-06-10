# Bulk Builder — Gerador de Sites para Leads

## O que este projeto faz

Gera sites profissionais para leads B2B da Bulk Studio. Cada site é um arquivo JSON em `sites/[slug].json`, renderizado automaticamente em `https://bulk-builder.vercel.app/[slug]`. Quando um novo arquivo é commitado e enviado ao GitHub, a Vercel reconstrói e o site vai ao ar automaticamente.

---

## Instruções para Claude Code

Quando o usuário colar dados de um lead, **execute o processo completo abaixo sem perguntar** — a menos que falte informação crítica (nome ou segmento).

### Passo 1 — Gerar o slug

- Deriva do nome do negócio: `"Barbearia do Zé"` → `barbearia-do-ze`
- Apenas letras minúsculas, números e hífens (sem acentos)
- Máximo 40 caracteres
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
- `titulo`: "[Nome] — [Segmento] em [Cidade]" (máx 60 chars)
- `descricao`: frase de valor + call-to-action (máx 155 chars)

#### hero
- `headline`: frase de impacto em até 8 palavras. Deve ser forte, direta, focada no resultado. Exemplos de qualidade:
  - Barbearia: "Corte que define. Estilo que dura."
  - Restaurante: "Sabor de casa no coração da cidade."
  - Clínica: "Saúde com cuidado e confiança."
  - Academia: "Seu corpo. Seu ritmo. Seu resultado."
- `subheadline`: 1-2 frases sobre o benefício real para o cliente. Tom próximo e local.
- `cta_primario`: ação direta → "Agendar pelo WhatsApp", "Fazer pedido", "Marcar consulta"
- `cta_secundario`: ação leve → "Ver serviços", "Conheça a gente", "Nosso cardápio"

#### services (3 a 6 itens)
Gere serviços **reais e específicos** para o segmento. Não use genéricos como "Atendimento de qualidade".
- Barbearia: Corte masculino, Barba, Degradê, Hidratação capilar, Sobrancelha...
- Restaurante: Almoço executivo, Delivery, Lanches, Sobremesas, Cardápio kids...
- Clínica odonto: Limpeza, Clareamento, Aparelho, Implante, Emergência...
- Academia: Musculação, Personal trainer, Spinning, Funcional, Avaliação física...
- Advocacia: Direito trabalhista, Civil, Familiar, Previdenciário, Consultoria...

Cada serviço:
- `emoji`: emoji relevante (✂️ 🍕 🦷 💪 ⚖️ etc.)
- `titulo`: nome do serviço (2-4 palavras)
- `descricao`: uma frase curta e direta sobre o benefício

#### about
- `texto`: 2-3 frases sobre a história ou diferenciais do negócio. Use a cidade se disponível. Tom humano, como se o dono estivesse falando.
- `highlights`: EXATAMENTE 3 itens. Números plausíveis para o porte (não exagere para negócio pequeno):
  - Para negócio novo/pequeno: "3+", "50+", "4.8★"
  - Para negócio estabelecido: "10+", "500+", "5★"
  - Prefira dados reais se disponíveis (rating, reviews_count do lead)

#### social_proof
- `titulo`: ex: "O que nossos clientes dizem", "Clientes satisfeitos", "Quem nos conhece indica"
- `testimonials`: 2 ou 3 depoimentos. Regras:
  - Nomes brasileiros comuns e realistas (João Silva, Maria Santos, Carlos Oliveira, Ana Costa...)
  - Texto em 2 frases, natural, como alguém escreveria no WhatsApp
  - Menciona algo específico do serviço ou experiência
  - estrelas: sempre 5

#### contact
- `headline`: "Vamos conversar?", "Pronto para começar?", "Fale com a gente"
- `subtexto`: frase curta e acolhedora convidando o contato

### Passo 4 — Criar o arquivo JSON

Crie `sites/[slug].json` com este formato exato:

```json
{
  "id": "[slug]",
  "createdAt": "[ISO 8601 — use a data atual]",
  "lead": {
    "nome": "[nome do negócio]",
    "segmento": "[segmento]",
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
      "rating": [número ou null],
      "reviews_count": [número ou null]
    }
  },
  "content": {
    "meta": {
      "titulo": "...",
      "descricao": "..."
    },
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
    "contact": {
      "headline": "...",
      "subtexto": "..."
    }
  },
  "theme": {
    "accent": "[hex do segmento]",
    "sun": "[hex do segmento]",
    "heroImage": "[URL do Unsplash do segmento]"
  }
}
```

### Passo 5 — Commitar e enviar

Após criar o arquivo, execute:

```bash
git add sites/[slug].json
git commit -m "feat: site [nome do negócio] ([cidade/UF])"
git push
```

A Vercel detecta o push, reconstrói automaticamente e o site fica disponível em:
`https://bulk-builder.vercel.app/[slug]`

---

## Padrões de qualidade

- **Nunca use clichês**: "excelência", "qualidade premium", "líder de mercado", "missão é servir"
- **Use linguagem próxima**: como um dono de negócio local falaria, não como marketing corporativo
- **Seja específico**: serviços reais do segmento, não genéricos
- **Respeite a cidade**: mencione a cidade quando tiver — "no centro de São Paulo", "aqui em Campinas"
- **Headlines fortes**: curtas, com ritmo, que causam impacto na primeira leitura

---

## Estrutura do projeto

```
bulk-builder/
├── sites/               ← aqui ficam os JSONs gerados (um por lead)
├── app/
│   ├── page.tsx         ← dashboard listando todos os sites
│   └── [slug]/page.tsx  ← renderiza o site de cada lead
├── components/site-template/  ← seções do site (Nav, Hero, etc.)
└── lib/
    ├── types.ts         ← interfaces TypeScript
    ├── theme.ts         ← cores por segmento
    └── utils.ts         ← helper de WhatsApp
```

**Não modifique** os arquivos de template (`components/`, `app/[slug]/page.tsx`, `lib/`) a menos que seja explicitamente solicitado. Sua única tarefa é criar o JSON correto em `sites/`.
