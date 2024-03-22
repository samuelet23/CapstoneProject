import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../api/models';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  url: string  = environment.url
  private http = inject(HttpClient)

  constructor() { }



  filterByName(tournamentName:string):Observable<Tournament>{
    return this.http.get<Tournament>(`${this.url}/open/tournament/get/byName/${tournamentName}`)
  }
  filterByStarterDate(startDate:string):Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${this.url}/open/tournament/get/all/after-starter-date?after-starter-date=${startDate}`)
  }
  filterByTournamentLevel(level:string):Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${this.url}/open/tournament/get/all/${level}`)
  }
  filterByFinishedTournament():Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${this.url}/open/tournament/get/all/finished`)
  }
  filterByStartedTournament():Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${this.url}/open/tournament/get/all/started`)
  }
  filterByScheduledTournament():Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${this.url}/open/tournament/get/all/scheduled`)
  }



}
