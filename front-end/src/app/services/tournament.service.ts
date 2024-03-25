import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Competition, Game, Player, Team, TeamDto, Tournament, TournamentDto, UploadConfirm } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  url:string = environment.url

  constructor(private http: HttpClient, private router: Router) { }

  getAllTournamentFromProvinceName(provinceName:string):Observable<Competition[]>{
    return this.http.get<Competition[]>(`${this.url}/open/tournament/get/all/auto-complete/province/${provinceName}`)
  }
  getAllTeamFromTournament(tournamentName: string ):Observable<Team[]>{
     return  this.http.get<Team[]>(`${this.url}/open/team/get/all/tournament-name?tournament-name=${tournamentName}`)
  }

  getAllGameFromTournamentName(tournamentName: string):Observable<Game[]>{
    return this.http.get<Game[]>(`${this.url}/open/game/get/all/tournament/${tournamentName}`)
  }

  getTournamentByName(tournamentName:string):Observable<Tournament>{
    return this.http.get<Tournament>(`${this.url}/open/tournament/get/byName/${tournamentName}`)
  }
  getAllTournaments():Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${this.url}/open/tournament/get/all`)
  }

  createTournament(tournament: TournamentDto):Observable<Tournament>{
    return this.http.post<Tournament>(`${this.url}/tournament/create`, tournament)
  }
  uploadCoverTournament(file :File){
    const formData = new FormData();
    formData.append('file', file)
    return this.http.patch<UploadConfirm>(`${this.url}/upload/cover-tournament`, formData)
  }

  generateOttavi(tournamentName:string):Observable<Game[]>{
    // questo metodo inizia il torneo e genera gli ottavi
    return this.http.post<Game[]>(`${this.url}/tournament/start/${tournamentName}`, {})
  }
  generateQuarti(tournamentName:string):Observable<Game[]>{
    // questo metodo genera i quarti
    return this.http.post<Game[]>(`${this.url}/generate/quarter-final/${tournamentName}`, {})
  }
  generateSemiFinale(tournamentName:string):Observable<Game[]>{
    // questo metodo genera le semifinali
    return this.http.post<Game[]>(`${this.url}/generate/semi-final/${tournamentName}`, {})
  }
  generateFinale(tournamentName:string):Observable<Game[]>{
    // questo metodo genera la finale
    return this.http.post<Game[]>(`${this.url}/generate/final/${tournamentName}`, {})
  }


  getClassificaMvp(nameTournament: string):Observable<any>{
    //questo endopints resituisce una mappa di tutti i fiocatori ed i loro punti rispettivi con codice di risposta e messsaggio
    return this.http.get<any>(`${this.url}/open/player/get/point-player/tournament-name?tournament-name=${nameTournament}`)
  }

  finishTournament(nameTournament:string):Observable<Tournament>{
    return this.http.patch<Tournament>(`${this.url}/generate/tournament/finish/${nameTournament}`,{})
  }

  getPlayersFromTeam(teamName:string):Observable<Player[]>{
    //selezioan tutti i giocatori da un team
    return this.http.get<Player[]>(`${this.url}/player/get/all/team-name?team-name=${teamName}`)
  }
  getPlayersFromTournament(tournamentName:string):Observable<Player[]>{
    //selezioan tutti i giocatori da un torneo
    return this.http.get<Player[]>(`${this.url}/player/get/all/tournament-name?tournament-name=${tournamentName}`)
  }
}
