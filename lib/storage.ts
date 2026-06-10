import { promises as fs } from "fs";
import path from "path";
import type { StoredSite } from "./types";

function sitesDir(): string {
  const custom = process.env.STORAGE_DIR;
  if (custom) return custom;
  return path.join(process.cwd(), "data", "sites");
}

function sitePath(id: string): string {
  return path.join(sitesDir(), `${id}.json`);
}

export async function saveSite(site: StoredSite): Promise<void> {
  await fs.mkdir(sitesDir(), { recursive: true });
  await fs.writeFile(sitePath(site.id), JSON.stringify(site, null, 2), "utf-8");
}

export async function loadSite(id: string): Promise<StoredSite | null> {
  try {
    const raw = await fs.readFile(sitePath(id), "utf-8");
    return JSON.parse(raw) as StoredSite;
  } catch {
    return null;
  }
}

export async function listSites(): Promise<StoredSite[]> {
  try {
    await fs.mkdir(sitesDir(), { recursive: true });
    const files = await fs.readdir(sitesDir());
    const results = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          try {
            const raw = await fs.readFile(path.join(sitesDir(), f), "utf-8");
            return JSON.parse(raw) as StoredSite;
          } catch {
            return null;
          }
        })
    );
    return results
      .filter((s): s is StoredSite => s !== null)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch {
    return [];
  }
}

export async function deleteSite(id: string): Promise<boolean> {
  try {
    await fs.unlink(sitePath(id));
    return true;
  } catch {
    return false;
  }
}

export function generateSiteId(nome: string): string {
  const slug = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return `${slug}-${Date.now()}`;
}
