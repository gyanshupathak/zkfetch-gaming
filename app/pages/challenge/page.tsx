"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ShareButtons from "@/components/sharebuttons";
import Image from "next/image";

const ChallengePage = () => {
  const searchParams = useSearchParams();
  const player = searchParams.get("player");
  const [puuid, setPuuid] = useState("");
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerKills, setWinnerKills] = useState("");
  const [loserKills, setLoserKills] = useState("");

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleCreateChallenge = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch latest match IDs
      const response = await fetch(`/api/getRecentMatchesByPuuid?puuid=${puuid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match IDs");
      }
      const matchIds = await response.json();
      if (!Array.isArray(matchIds) || matchIds.length === 0) {
        throw new Error("No match IDs found");
      }
      const latestMatchId = matchIds[0];

      const matchDetailsResponse = await fetch(
        `/api/getMatchDetailsByMatchId?matchId=${latestMatchId}&player=${player}&puuid=${puuid}`
      );
      if (!matchDetailsResponse.ok) {
        throw new Error("Failed to fetch match details");
      }
      const matchDetailsData = await matchDetailsResponse.json();
      setMatchDetails(matchDetailsData);
    } catch (error) {
      console.error("Error:", error);
      setMatchDetails(null);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleComputeResult = async () => {
    setLoadingResult(true);
    setError("");
    try {
      const response = await fetch(`/api/getResult`);
      if (!response.ok) {
        throw new Error("Failed to compute result");
      }
      const result = await response.json();
      setWinner(result.winner);
      setWinnerKills(result.winnerKills);
      setLoserKills(result.loserKills);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoadingResult(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="absolute inset-0">
        <Image
          src="/image.png"
          alt="Background"
          className="w-full h-full object-cover"
          fill
        />
      </div>
      <div className="relative bg-white text-black rounded-lg shadow-lg max-w-lg w-full p-6">
        <Image
          src="/image.png"
          alt="Card Top"
          className="mx-auto rounded-lg -mt-16 border-4 border-white shadow-lg"
          width={128}
          height={128} 
          priority 
        />
        <h1 className="text-2xl font-bold text-center mt-4">
          {player === "1" ? "Create a Battle Challenge" : "Team Fight Tactics Battle Challenge"}
        </h1>
        <p className="text-center mt-2">
          {player === "1"
            ? "Enter your PUUID to create a challenge based on your last match stats. Your match stats will be stored securely."
            : "Player 1 has challenged you to a battle!"}
        </p>
        <input
          type="text"
          className="border rounded w-full p-2 mt-4"
          placeholder="Enter your PUUID"
          value={puuid}
          onChange={(e) => setPuuid(e.target.value)}
        />
        <button
          onClick={handleCreateChallenge}
          className="bg-purple-600 text-white px-4 py-2 w-full rounded mt-4 hover:bg-purple-800"
          disabled={loading}
        >
          {player === "1"
            ? loading
              ? "Creating Challenge..."
              : "Create Challenge"
            : loading
            ? "Submitting..."
            : "Accept Challenge"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {matchDetails && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold mb-2">
              {player === "1" ? "Challenge Created!" : "Challenge Accepted!"}
            </h2>
            {player === "1" && (
              <>
                <p>Send this link to the other player:</p>
                <div className="bg-gray-100 p-4 rounded">
                  <code>{`https://example.com/pages/challenge?player=2`}</code>
                </div>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://example.com/pages/challenge?player=2`
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 w-full rounded mt-4 hover:bg-green-600"
                >
                  Copy Link
                </button>
              </>
            )}
            <button
              onClick={player === "1" ? handleShowResult : handleComputeResult}
              className="bg-purple-600 text-white px-4 py-2 w-full rounded mt-4 hover:bg-purple-800"
              disabled={winner || loadingResult}
            >
              {player === "1"
                ? winner
                  ? "See Result"
                  : "Waiting for Player 2 to Join"
                : loadingResult
                ? "Computing..."
                : winner
                ? "Result Declared"
                : "Compute Result"}
            </button>
          </div>
        )}
        {showResult && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">{winner} won the battle!</h2>
            <p className="text-lg mt-2">Winner Kills: {winnerKills}</p>
            <p className="text-lg">Loser Kills: {loserKills}</p>
          </div>
        )}
        <ShareButtons />
      </div>
    </div>
  );
};

export default ChallengePage;
