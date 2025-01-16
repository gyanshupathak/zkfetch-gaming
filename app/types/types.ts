export interface MatchMetadata {
  data_version: string;
  match_id: string;
  participants: string[];
}

export interface MatchParticipant {
  puuid: string;
  total_damage_to_players?: number;
}

export interface MatchInfo {
  endOfGameResult: string;
  gameCreation: number; 
  gameId: number;
  game_datetime: number; 
  game_length: number; 
  game_version: string;
  mapId: number;
  participants: MatchParticipant[];
  tft_game_type: string;
  tft_set_core_name: string;
  tft_set_number: number;
}

export interface MatchDetails {
  metadata: MatchMetadata;
  info: MatchInfo;
  puuid: string;
}

export interface CircuitInput {
  player1Id: number;
  player2Id: number;
  player1Kills: number;
  player2Kills: number;
  participants1: number[]; // Padded array of participant IDs
  participants2: number[]; // Padded array of participant IDs
}