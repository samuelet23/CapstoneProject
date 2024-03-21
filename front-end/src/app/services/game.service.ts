import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AddPointsDto, ConfirmRes, DeleteRes, Game, Team } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url: string  =environment.url
  private http = inject(HttpClient)

  constructor(){}

  getGameById(id:string):Observable<Game>{
    return this.http.get<Game>(`${this.url}/open/game/get/${id}`)
  }

  getAllGameFromtournament(tournamentName:string):Observable<Game[]>{
    return this.http.get<Game[]>(`${this.url}/open/game/get/all/tournament/${tournamentName}`)
  }
  startGame(id:string):Observable<Game>{
    return this.http.post<Game>(`${this.url}/game/start/game-id?game-id=${id}`,{})
  }
  updateHomePoints(id:string, puntiGiocatore:AddPointsDto):Observable<ConfirmRes>{
    return this.http.put<ConfirmRes>(`${this.url}/game/update/${id}/homePoints`,puntiGiocatore)
  }
  updateAwayPoints(id:string, puntiGiocatore:AddPointsDto):Observable<ConfirmRes>{
    return this.http.put<ConfirmRes>(`${this.url}/game/update/${id}/awayPoints`,puntiGiocatore)
  }

  finishGame(id:string):Observable<Team>{
    return this.http.post<Team>(`${this.url}/game/finish/${id}`,{})
  }
  deleteById(id:string):Observable<DeleteRes>{
    return this.http.post<DeleteRes>(`${this.url}/game/delete/${id}`,{})
  }
}
