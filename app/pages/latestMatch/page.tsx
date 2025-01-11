"use client";

import React, { useState } from 'react';

const MatchPage = () => {
  const [puuid, setPuuid] = useState('');
  const [matchId, setMatchId] = useState('');
  const [matchDetails, setMatchDetails] = useState(null);
  const [inputData, setInputData] = useState(null);

  const handleSearch = async () => {
    try {
      // Fetch latest match IDs
      const response = await fetch(`/api/latestMatchIds?puuid=${puuid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match IDs");
      }
      const matchIds = await response.json();
      if (!Array.isArray(matchIds) || matchIds.length === 0) {
        throw new Error("No match IDs found");
      }

      // Set the latest match ID
      const latestMatchId = matchIds[0];
      setMatchId(latestMatchId);

      // Fetch match details
      const matchDetailsResponse = await fetch(`/api/match?matchId=${latestMatchId}`);
      if (!matchDetailsResponse.ok) {
        throw new Error("Failed to fetch match details");
      }
      const matchDetailsData = await matchDetailsResponse.json();
      setMatchDetails(matchDetailsData);
      
      console.log("Match Details:", matchDetailsData);
    } catch (error) {
      console.error("Error:", error);
      setMatchDetails(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search for Match</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Puuid"
          value={puuid}
          onChange={(e) => setPuuid(e.target.value)}
          className="border rounded p-2"
        />
        <button 
          onClick={handleSearch} 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {matchDetails && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Match ID: {matchId}</h2>
          <h2 className="text-xl font-semibold">Match Info: {matchDetails}</h2>
        </div>
      )}
    </div>
  );
};

export default MatchPage;