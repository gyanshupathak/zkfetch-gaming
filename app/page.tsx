"use client";

import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <main
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center relative"
      style={{
        backgroundImage: 'url("/image.png")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="z-10 text-center max-w-2xl p-6">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to Team Fight Tactics Battle
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Challenge other players and prove your skills on the battlefield!
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/pages/challenge?player=1">
            <div className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg cursor-pointer shadow-lg hover:bg-purple-700 transition">
              Create Challenge
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
