import { z } from "zod";

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(10),
  GEMINI_MODEL: z.string().default("gemini-2.0-flash"),
  STORAGE_DIR: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

export function env(): Env {
  if (!cachedEnv) {
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const msg = Object.entries(errors)
        .map(([k, v]) => `  - ${k}: ${(v ?? []).join(", ")}`)
        .join("\n");
      throw new Error(`Variáveis de ambiente inválidas:\n${msg}`);
    }
    cachedEnv = parsed.data;
  }
  return cachedEnv;
}
