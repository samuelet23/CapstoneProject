/* tslint:disable */
/* eslint-disable */
import { PlaceDto } from '../models/place-dto';
export interface TournamentDto {
  coverUrl?: string;
  level?: string;
  name: string;
  place?: PlaceDto;
  referees: Array<string>;
  startDate: string;
}
