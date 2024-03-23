/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
export interface User {
  age: number;
  authorities?: Array<GrantedAuthority>;
  createdAt?: string;
  dateOfBirth: string;
  email: string;
  id?: string;
  logoProfile?:string;
  name: string;
  role: 'USER' | 'CAPTAIN' | 'MANAGER';
  surname: string;
  username: string;
}
