import { getRecentMatchesByPuuid } from "../../../lib/riotApi/route";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const puuid = searchParams.get("puuid");

  if (!puuid) {
    return new Response(
      JSON.stringify({ error: "puuid is required" }),
      { status: 400 }
    );
  }

  try {
    const data = await getRecentMatchesByPuuid(puuid);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching Match Details by puuid:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch Match Details" }),
      { status: 500 }
    );
  }
}
