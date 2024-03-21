import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player, PlayerDto, Team, TeamDto } from '../api/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url:string = environment.url
  private http = inject(HttpClient)
  constructor() { }

  createPlayer(player: PlayerDto):Observable<Player>{
    return this.http.post<Player>(`${this.url}/player/create`, player)
  }

  updateCredentialPlayer(player: PlayerDto, id:string):Observable<Player>{
    return this.http.patch<Player>(`${this.url}/player/update/credential/${id}`, player)
  }
  removePlayerFromTeam(nickname: string ){
    return this.http.delete<Player>(`${this.url}/player/delete/byName/${nickname}`)
  }
}
