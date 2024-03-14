/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
import { Team } from '../models/team';
export interface PageTeam {
  content?: Array<Team>;
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
