import { promises as fs } from "fs";
import Papa from 'papaparse';

export async function load(path: string): Promise<any[]> {
  const file = await fs.readFile(process.cwd() + '/data.csv', 'utf8')
  return Papa.parse(file, { header: true, skipEmptyLines: true }).data;
}
