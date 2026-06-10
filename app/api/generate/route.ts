import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/types";
import { generateSiteContent } from "@/lib/ai/generate-content";
import { saveSite, generateSiteId } from "@/lib/storage";
import { getTheme } from "@/lib/theme";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Body inválido — esperava JSON" },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados do lead inválidos", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const lead = parsed.data;

  let content;
  try {
    const result = await generateSiteContent(lead);
    content = result.content;
    console.log(
      `[generate] ${lead.nome} — tokens: ${result.tokensIn}in/${result.tokensOut}out`
    );
  } catch (err) {
    console.error("[generate] Claude error:", err);
    return NextResponse.json(
      { error: "Falha ao gerar conteúdo com IA", details: String(err) },
      { status: 502 }
    );
  }

  const theme = getTheme(lead.segmento);
  const id = generateSiteId(lead.nome);

  try {
    await saveSite({ id, createdAt: new Date().toISOString(), lead, content, theme });
  } catch (err) {
    console.error("[generate] Storage error:", err);
    return NextResponse.json({ error: "Falha ao salvar site" }, { status: 500 });
  }

  const origin = req.nextUrl.origin;
  return NextResponse.json(
    { siteId: id, previewUrl: `${origin}/preview/${id}` },
    { status: 201 }
  );
}
