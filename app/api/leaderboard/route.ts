import {load} from "@/lib/csv";
import camelcaseKeys from 'camelcase-keys';

export async function GET() {
  const data = await load('/data.csv')
  return Response.json({ data: camelcaseKeys(data) });
}
