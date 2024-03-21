/* tslint:disable */
/* eslint-disable */
import { Place } from '../models/place';
import { Referee } from '../models/referee';
import { Team } from '../models/team';
export interface Tournament {
  coverUrl?: string;
  id?: string;
  level?: 'JUNIOR' | 'RISINGSTARS' | 'ELITE';
  name?: string;
  round?:string
  place?: Place;
  referees?: Array<Referee>;
  startDate?: string;
  teams?: Array<Team>;
}
