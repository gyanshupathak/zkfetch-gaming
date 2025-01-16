import { getSummonerRank } from "../../../lib/riotApi/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const summonerId = searchParams.get("summonerId");

  if (!summonerId) {
    return new Response(
      JSON.stringify({ error: "SummonerId is required" }),
      { status: 400 }
    );
  }

  try {
    const data = await getSummonerRank(summonerId);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching Summoner RAnk:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Summoner Rank" }),
      { status: 500 }
    );
  }
}
