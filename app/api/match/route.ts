import { getMatchDetailsByMatchId } from "../../lib/riotApi/route";
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json(
      { error: "matchId is required" },
      { status: 400 }
    );
  }

  try {
    const data = await getMatchDetailsByMatchId(matchId);
    
    const generateCircuitInput = (matchInfo: any) => {
      const gameModeLookup: { [key: string]: number } = {
        "ARAM": 1,
        "CLASSIC": 2
      };
  
      const gameResultLookup: { [key: string]: number } = {
        "GameComplete": 1
      };
  
      // Get all participant PUUIDs
      const participantPuuids = matchInfo.info.participants.map((p: any, index: number) => index + 1);

      // Use the first participant for demonstration (you can modify this logic)
      const samplePlayerId = 1;
      const playerParticipant = matchInfo.info.participants[0];
      const playerTeamId = playerParticipant ? playerParticipant.teamId : null;
  
      // Pad participants array to 10 entries if needed
      const paddedParticipants = [...participantPuuids];
      while (paddedParticipants.length < 10) {  
        paddedParticipants.push("0");
      }
  
      return {
        matchId: matchInfo.metadata.matchId.replace("NA1_", ""),
        gameMode: gameModeLookup[matchInfo.info.gameMode] || 0,
        gameResult: gameResultLookup[matchInfo.info.endOfGameResult] || 0,
        teamId: parseInt(playerTeamId?.toString() || "0"),
        playerId: samplePlayerId,
        participants: paddedParticipants
      };
    };

    // Generate circuit input data
    const generatedInputData = generateCircuitInput(data);
    
    // Get the project root directory and create the file path
    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, 'input.json');

    // Write the input file
    await writeFile(filePath, JSON.stringify(generatedInputData, null, 2));

    return NextResponse.json({
      matchDetails: data,
      inputData: generatedInputData,
      message: "Input file generated successfully"
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}