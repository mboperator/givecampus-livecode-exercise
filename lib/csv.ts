import { promises as fs } from "fs";
import Papa from 'papaparse';

export async function load(path: string): Promise<any[]> {
  const file = await fs.readFile(process.cwd() + path, 'utf8')
  const { data }: { data: Record<string, any>[] } = Papa.parse(file, { header: true, skipEmptyLines: true });
  return data;
}
