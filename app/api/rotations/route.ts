import { getChampionRotations } from "../../lib/riotApi/route";

export async function GET() {
    try {
      const data = await getChampionRotations();
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error: any) {
      console.error("Error fetching champion rotations:", error.message);
      return new Response(JSON.stringify({ error: "Failed to fetch champion rotations" }), { status: 500 });
    }
  }