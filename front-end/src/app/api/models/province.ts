/* tslint:disable */
/* eslint-disable */
import { Town } from '../models/town';
export interface Province {
  name: string;
  region: string;
  sigla: string;
  towns?: Array<Town>;
}
