/* tslint:disable */
/* eslint-disable */
import { Place } from '../models/place';
import { Referee } from '../models/referee';
import { Team } from '../models/team';
export interface Competition {
  coverUrl?: string;
  id?: string;
  name?: string;
  place?: Place;
  referees?: Array<Referee>;
  startDate?: string;
  teams?: Array<Team>;
}
