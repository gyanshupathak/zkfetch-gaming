"use client";

import React, { useState } from 'react';
import { Summoner } from '../../types/riot';
import Image from 'next/image';

const SummonerPage = () => {
  const [puuid, setpuuid] = useState('');
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  // const [matches, setMatches] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/summoner?puuid=${puuid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch summoner details");
      }
      const data = await response.json();
      setSummoner(data);
    } catch (error) {
      console.error("Error fetching summoner details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search for Summoner</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Summoner Id"
          value={puuid}
          onChange={(e) => setpuuid(e.target.value)}
          className="border rounded p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </div>

      {summoner && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Summoner Details</h2>
          <p>Name: {summoner.name}</p>
          <p>Level: {summoner.summonerLevel}</p>
          <p>Profile Icon Id: {summoner.profileIconId}</p>
          <p>Account Id : {summoner.accountId}</p>
          <p>Revision Date : {summoner.revisionDate}</p>
        </div>    
      )}

      {/* {matches.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold">Recent Matches</h2>
          <ul>
            {matches.map((matchId) => (
              <li key={matchId}>{matchId}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default SummonerPage;
