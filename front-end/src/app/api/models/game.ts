/* tslint:disable */
/* eslint-disable */
import { Competition } from '../models/competition';
import { Team } from '../models/team';
export interface Game {
  awayPoints?: number;
  awayTeam?: Team;
  homePoints?: number;
  homeTeam?: Team;
  id?: string;
  round?: 'OCTAVEFINAL' | 'QUARTERFINAL' | 'SEMIFINAL' | 'FINAL';
  status?: 'SCHEDULED' | 'STARTED' | 'FINISHED';
  tournament?: Competition;
  winner?: Team;
}
