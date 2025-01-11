import axios from 'axios';

const API_KEY = "RGAPI-5f1acaa5-fd77-41ea-9954-7337f6e62b72";
const SUMMONER_REGION = 'na1'; 
const MATCH_REGION = 'americas';
const summonerBaseURL = `https://${SUMMONER_REGION}.api.riotgames.com`;
const matchBaseURL = `https://${MATCH_REGION}.api.riotgames.com`;
// const REGION = process.env.REGION;

// Riot API Wrapper
const riotApi = axios.create({
  baseURL: summonerBaseURL,
  headers: {
    'X-Riot-Token': API_KEY,
  },
});

const matchApi = axios.create({
  baseURL: matchBaseURL,
  headers: { 'X-Riot-Token': API_KEY },
});

// **1. Get Summoner Details by PUUID**
export const getSummonerByPUUID = async (puuid: string) => {
  try {
    const response = await riotApi.get(`/lol/summoner/v4/summoners/by-puuid/${puuid}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching summoner by PUUID:', error);
    throw new Error('Failed to fetch summoner by PUUID');
  }
};

// **2. Get Recent Match IDs by PUUID**
export const getRecentMatchesByPuuid = async (puuid: string) => {
  try {
    const response = await matchApi.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
      params: { start: 0, count: 1 },
    });
    console.log('Recent match data response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent matches by PUUID:',error);
    throw new Error('Failed to fetch recent matches');
  }
};

// **3. Get Match Details by Match ID**
export const getMatchDetailsByMatchId = async (matchId: string) => {
  try {
    const response = await matchApi.get(`/lol/match/v5/matches/${matchId}`);
    console.log('Match data response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw new Error('Failed to fetch match details');
  }
};

// **4. Get Champion Rotations**
export const getChampionRotations = async () => {
  try {
    const response = await riotApi.get(`/lol/platform/v3/champion-rotations`);
    return response.data;
  } catch (error) {
    console.error('Error fetching champion rotations:', error);
    throw new Error('Failed to fetch champion rotations');
  }
};

// **6. Get Summoner Rank Information**
export const getSummonerRank = async (summonerId: string) => {
  try {
    const response = await riotApi.get(`/lol/league/v4/entries/by-summoner/${summonerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summoner rank:', error);
    throw new Error('Failed to fetch summoner rank');
  }
};

// **7. Get Live Match Details**
export const getLiveMatchDetails = async (summonerId: string) => {
  try {
    const response = await riotApi.get(`/lol/spectator/v4/active-games/by-summoner/${summonerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching live match details:', error);
    throw new Error('Failed to fetch live match details');
  }
};

// **8. Get Match Details by MatchId **
export const getMatchDetails = async (matchId: string) => {
  try {
    const response = await matchApi.get(`/lol/match/v5/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw new Error('Failed to fetch match details');
  }
};
