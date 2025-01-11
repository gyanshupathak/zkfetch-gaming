"use client";

import React, { useState } from 'react';
import { Match } from '../../types/riot';

const MatchPage = () => {
  const [matchId, setMatchId] = useState('');
  const [matchDetails, setMatchDetails] = useState<Match | null>(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/match?matchId=${matchId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }
      const data = await response.json();
      setMatchDetails(data);
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search for Match</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Match ID"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          className="border rounded p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </div>

      {matchDetails && (
        <div>
          <h2 className="text-xl font-semibold">Match Details</h2>
          <p>Game Mode: {matchDetails.gameMode}</p>
          <p>Game Duration: {matchDetails.gameDuration} seconds</p>
          <h3 className="text-lg font-bold mt-2">Participants</h3>
          <ul>
            {matchDetails.participants.map((participant, index) => (
              <li key={index}>
                {participant.summonerName} - {participant.championName} (K/D/A: {participant.kills}/{participant.deaths}/{participant.assists})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchPage;
