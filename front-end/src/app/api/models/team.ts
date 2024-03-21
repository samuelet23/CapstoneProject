/* tslint:disable */
/* eslint-disable */
import { Player } from '../models/player';
export interface Team {
  captain: Player;
  id?: string;
  logo?: string;
  name: string;
  players: Array<Player>;
}
