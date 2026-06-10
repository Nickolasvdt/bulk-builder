import { promises as fs } from "fs";
import path from "path";
import type { StoredSite } from "./types";

function sitesDir(): string {
  return path.join(process.cwd(), "sites");
}

function sitePath(slug: string): string {
  return path.join(sitesDir(), `${slug}.json`);
}

export async function loadSite(slug: string): Promise<StoredSite | null> {
  try {
    const raw = await fs.readFile(sitePath(slug), "utf-8");
    return JSON.parse(raw) as StoredSite;
  } catch {
    return null;
  }
}

export async function listSites(): Promise<StoredSite[]> {
  try {
    const files = await fs.readdir(sitesDir());
    const results = await Promise.all(
      files
        .filter((f) => f.endsWith(".json") && f !== ".gitkeep")
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

export async function listSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(sitesDir());
    return files
      .filter((f) => f.endsWith(".json") && f !== ".gitkeep")
      .map((f) => f.replace(".json", ""));
  } catch {
    return [];
  }
}
