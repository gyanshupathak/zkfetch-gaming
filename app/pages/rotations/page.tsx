"use client";

import { useState } from 'react';

export default function Home() {
  const [championRotations, setChampionRotations] = useState(null);

  const fetchChampionRotations = async () => {
    try {
      const response = await fetch("/api/rotations");
      if (!response.ok) {
        throw new Error("Failed to fetch champion rotations");
      }
      const data = await response.json();
      setChampionRotations(data);
    } catch (error) {
      console.error("Error fetching champion rotations:", error);
    }
  };
  
  return (
    <div>
      <button className='bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600' onClick={fetchChampionRotations}>Get Champion Rotations</button>

      {championRotations && (
        <div>
          <h2>Free Champions:</h2>  
          <ul>
            {championRotations.freeChampionIds.map((id) => (
              <li key={id}>Champion ID: {id}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
