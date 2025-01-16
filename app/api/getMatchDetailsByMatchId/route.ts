import { getMatchDetailsByMatchId } from "@/lib/riotApi/route";
import { writeFile } from "fs/promises";
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
  const player = searchParams.get("player");
  const puuid = searchParams.get("puuid");

  if (!matchId) {
    return NextResponse.json(
      { error: "matchId is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getMatchDetailsByMatchId(matchId);

    // Extending the json file with the puuid
    const dataWithPuuid = {
      ...data,
      puuid,
    };

    // Get the project root directory and create the file path
    const projectRoot = process.cwd();

    // Write the input file
    await writeFile(path.join(projectRoot, "data", `player${player}Data.json`), JSON.stringify(dataWithPuuid, null, 2));

    return NextResponse.json({
      matchDetails: dataWithPuuid,
      message: "Match details saved successfully"
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}