/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
import { Tournament } from '../models/tournament';
export interface PageTournament {
  content?: Array<Tournament>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
