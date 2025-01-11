export interface Summoner {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    summonerLevel: number;
    revisionDate: number;
  }
  
  export interface Match {
    matchId: string;
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    participants: Participant[];
  }
  
  export interface Participant {
    summonerName: string;
    championName: string;
    kills: number;
    deaths: number;
    assists: number;
  }

export interface generatedInputData {
    matchId: any;
    gameMode: any;
    gameResult: any;
    teamId: any;
    playerId: any;
    participants: any[];
}
  