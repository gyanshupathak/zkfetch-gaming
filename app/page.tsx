"use client";

import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center my-4">
        Welcome to League of Legends Stats Tracker
      </h1>
      <p className="text-center text-gray-600 my-4">
        Track your favorite summoners, recent matches, and champion rotations.
      </p>
      <div className="flex justify-center gap-6 mt-8">
        <Link href="/pages/rotations">
          <div className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
            Champion Rotations
          </div>
        </Link>
        <Link href="/pages/summoner">
          <div className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
            Summoner Stats
          </div>
        </Link>
        <Link href="/pages/match">
          <div className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600">
            Match Details
          </div>
        </Link>
        <Link href="/pages/latestMatch">
          <div className="bg-purple-500 text-white px-6 py-3 rounded hover:bg-purple-600">
            Latest Match Id
          </div>
        </Link>
      </div>
    </main>
  );
};

export default MainPage;
