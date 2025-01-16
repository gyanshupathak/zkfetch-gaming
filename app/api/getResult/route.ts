import path from 'path';
import fs from 'fs';
import { runCommand } from "@/lib/runCommand/route";
import { writeFile } from "fs/promises";
import crypto from "crypto";
import { CircuitInput, MatchDetails , MatchParticipant } from "@/app/types/types"

export async function GET() {
  try {
    const generateCircuitInput = () => {
      // Read player data from files
      const player1FilePath = path.resolve("data", "player1Data.json");
      const player2FilePath = path.resolve("data", "player2Data.json");
    
      const player1Data = JSON.parse(fs.readFileSync(player1FilePath, "utf8"));
      const player2Data = JSON.parse(fs.readFileSync(player2FilePath, "utf8"));

      // Hash function to convert PUUIDs to numeric IDs
      const hashToInt = (puuid : string) => {
        const hash = crypto.createHash("sha256").update(puuid).digest("hex");
      // Convert hash to integer (modulo to fit in a range)
        return parseInt(hash.slice(0, 8), 16); // Take first 8 characters and convert to integer
      };
    
      // Function to get kills for a player from their match data
      const getPlayerKills = (MatchInfo : MatchDetails, puuid : string) => {
        const participant = MatchInfo.info.participants.find(
          (p : MatchParticipant) => p.puuid === puuid
        );
        return participant?.total_damage_to_players || 0;
      };
    
      // Function to convert participant PUUIDs to numeric IDs
      const getParticipantIds = (participants: string[]): number[] => {
        return participants.map((puuid : string) => hashToInt(puuid));
      };
    
      // Pad arrays to ensure they have exactly 8 entries
      const padArray = <T>(arr: T[], size: number): T[] => {
        const padded = [...arr];
        while (padded.length < size) {
          padded.push(0 as unknown as T); 
        }
        return padded;
      };
    
      // Extract necessary details
      const player1Puuid = player1Data.puuid;
      const player2Puuid = player2Data.puuid;
    
      const player1Kills = getPlayerKills(player1Data, player1Puuid);
      const player2Kills = getPlayerKills(player2Data, player2Puuid);
    
      const participants1 = getParticipantIds(player1Data.metadata.participants);
      const participants2 = getParticipantIds(player2Data.metadata.participants);

      const player1Id = hashToInt(player1Puuid);
      const player2Id = hashToInt(player2Puuid);
    
      // Create the circuit input JSON object
      const circuitInput = {
        player1Id, 
        player2Id, 
        player1Kills,
        player2Kills,
        participants1: padArray(participants1, 8),
        participants2: padArray(participants2, 8),
      };

      return circuitInput;
    };

    const projectRoot = process.cwd();
    const circuitDir = path.join(projectRoot, "circuits");

    const circuitInput = await generateCircuitInput();

    await writeFile(path.join(circuitDir, "input.json"), JSON.stringify(circuitInput, null, 2));

    await runCommand(`cd ${circuitDir} && circom matchProof.circom --r1cs --wasm --sym --c`);
    await runCommand(`cd ${circuitDir} && node matchProof_js/generate_witness.js matchProof_js/matchProof.wasm input.json witness.wtns`);
    await runCommand(`cd ${circuitDir} && snarkjs powersoftau new bn128 12 pot12_0000.ptau -v`);
    await runCommand(`cd ${circuitDir} && snarkjs powersoftau contribute pot12_0000.ptau pot12_0001.ptau --name="First contribution" -v`,"randomEntropyForPowerOfTau");
    await runCommand(`cd ${circuitDir} && snarkjs powersoftau prepare phase2 pot12_0001.ptau pot12_final.ptau -v`);
    await runCommand(`cd ${circuitDir} && snarkjs groth16 setup matchProof.r1cs pot12_final.ptau matchProof_0000.zkey`);
    await runCommand(`cd ${circuitDir} && snarkjs zkey contribute matchProof_0000.zkey matchProof_0001.zkey --name="1st Contributor Name" -v`,"randomEntropyForZKey");
    await runCommand(`cd ${circuitDir} && snarkjs zkey export verificationkey matchProof_0001.zkey verification_key.json`);
    await runCommand(`cd ${circuitDir} && snarkjs groth16 prove matchProof_0001.zkey witness.wtns proof.json public.json`);
    await runCommand(`cd ${circuitDir} && snarkjs groth16 verify verification_key.json public.json proof.json`);

    async function generateWinner(input : CircuitInput) {
      if (input.player1Kills > input.player2Kills) {
        return {
          winner: "Player 1",
          winnerKills: input.player1Kills,
          loser: "Player 2",
          loserKills: input.player2Kills,
        };
      } else if (input.player1Kills < input.player2Kills) {
        return {
          winner: "Player 2",
          winnerKills: input.player2Kills,
          loser: "Player 1",
          loserKills: input.player1Kills,
        };
      }
        else {
          return {
            winner: "Draw",
            winnerKills: input.player1Kills,
            loser: "Draw",
            loserKills: input.player2Kills,
          };
        }
      }

    const result = await generateWinner(circuitInput);

    return new Response(
      JSON.stringify({ message: "Winner proved successfully", winner: result.winner, loser:result.loser,  winnerKills: result.winnerKills, loserKills: result.loserKills }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Result:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Result" }),
      { status: 500 }
    );
  }
}
