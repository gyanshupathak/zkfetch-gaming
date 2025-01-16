import axios from 'axios';

const API_KEY = process.env.RIOT_API_KEY;
const SUMMONER_REGION = process.env.SUMMONER_REGION; 
const MATCH_REGION = process.env.MATCH_REGION;
const summonerBaseURL = `https://${SUMMONER_REGION}.api.riotgames.com`;
const matchBaseURL = `https://${MATCH_REGION}.api.riotgames.com`;

console.log('API_KEY:', API_KEY);

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
    const response = await riotApi.get(`/tft/summoner/v1/summoners/by-puuid/${puuid}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch summoner by PUUID:',error);
    throw new Error('Failed to fetch summoner by PUUID');
  }
};

// **2. Get Recent Match IDs by PUUID**
export const getRecentMatchesByPuuid = async (puuid: string) => {
  try {
    const response = await matchApi.get(`/tft/match/v1/matches/by-puuid/${puuid}/ids`, {
      params: { start: 0, count: 1 },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent matches by PUUID:',error);
    throw new Error('Failed to fetch recent matches');
  }
};

// **3. Get Match Details by Match ID**
export const getMatchDetailsByMatchId = async (matchId: string) => {
  try {
    const response = await matchApi.get(`/tft/match/v1/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw new Error('Failed to fetch match details');
  }
};

// **4. Get Summoner Rank Information**
export const getSummonerRank = async (summonerId: string) => {
  try {
    const response = await riotApi.get(`/tft/league/v1/entries/by-summoner/${summonerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summoner rank:', error);
    throw new Error('Failed to fetch summoner rank');
  }
};

// **5. Get Summoner Details by AccountId**
export const getSummonerByAccountId = async (accountId: string) => {
  try {
    const response = await riotApi.get(`/tft/summoner/v1/summoners/by-account/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch summoner',error);
    throw new Error('Failed to fetch summoner');
  }
};

// **6. Get Live Match Details**
export const getLiveMatchDetails = async (puuid : string) => {
  try {
    const response = await riotApi.get(`/lol/spectator/tft/v5/active-games/by-puuid/${puuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ranked leaderboards:', error);
    throw new Error('Failed to fetch ranked leaderboards');
  }
}

