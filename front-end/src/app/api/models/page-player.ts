/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { Player } from '../models/player';
import { SortObject } from '../models/sort-object';
export interface PagePlayer {
  content?: Array<Player>;
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
