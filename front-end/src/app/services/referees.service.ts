import { Injectable, inject } from '@angular/core';
import { Referee, RefereeDto, Tournament } from '../api/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefereesService {

  private http = inject(HttpClient)
  url = environment.url

  constructor() { }

  createReferee(tournamentName:string, referee: RefereeDto):Observable<Referee>{
    return this.http.post<Referee>(`${this.url}/referee/create/${tournamentName}`, referee)
  }
  addReferee(nameTournament:string , referee: RefereeDto):Observable<Tournament>{
    return this.http.post<Tournament>(`${this.url}/tournament/${nameTournament}/addReferee`, referee)
  }

  getAllReferees():Observable<Referee[]>{
    return this.http.get<Referee[]>(`${this.url}/open/referee/get/all`)
  }
  getRefereeByName(nickname:string):Observable<Referee>{
    return this.http.get<Referee>(`${this.url}/open/referee/get/byNickname/${nickname}`)
  }

}
