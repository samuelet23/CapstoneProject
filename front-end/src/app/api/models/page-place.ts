/* tslint:disable */
/* eslint-disable */
import { PageableObject } from '../models/pageable-object';
import { Place } from '../models/place';
import { SortObject } from '../models/sort-object';
export interface PagePlace {
  content?: Array<Place>;
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
