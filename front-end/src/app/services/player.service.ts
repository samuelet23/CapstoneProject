import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player, PlayerDto, Team, TeamDto, UploadConfirm } from '../api/models';
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

  uploadLogoPlayer(nickname:string, file: File):Observable<UploadConfirm>{
    const img: FormData = new FormData();
    img.append('file', file)
    return this.http.patch<UploadConfirm>(`${this.url}/player/upload/logo-player/${nickname}`,img)
  }

  updateCredentialPlayer(player: PlayerDto, id:string):Observable<Player>{
    return this.http.patch<Player>(`${this.url}/player/update/credential/${id}`, player)
  }
  removePlayerFromTeam(nickname: string ){
    return this.http.delete<Player>(`${this.url}/player/delete/byName/${nickname}`)
  }
}
