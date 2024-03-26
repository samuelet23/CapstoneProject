/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { Tournament } from './tournament';
export interface User {
  age: number;
  authorities?: Array<GrantedAuthority>;
  createdAt?: string;
  dateOfBirth: string;
  email: string;
  id?: string;
  favoriteTournaments?:Tournament[]
  logoProfile?:string;
  name: string;
  role: 'USER' | 'COORDINATOR' | 'MANAGER';
  surname: string;
  username: string;
}
