/* tslint:disable */
/* eslint-disable */
import { PlayerDto } from '../models/player-dto';
export interface TeamDto {
  captainName: string;
  idTournament?: string;
  nameTeam: string;
  players: Array<PlayerDto>;
}
