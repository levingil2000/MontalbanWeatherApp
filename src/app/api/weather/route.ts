
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'weatherdata.csv');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const lines = fileContents.split('\n').slice(1);
  const data = lines.map(line => {
    const [index, startTime, precipitationIntensity, temperature, weatherCode, location_id] = line.split(',');
    return {
      index,
      startTime,
      precipitationIntensity: parseFloat(precipitationIntensity),
      temperature: parseFloat(temperature),
      weatherCode,
      location_id
    };
  });

  return NextResponse.json(data);
}
