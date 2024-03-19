import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Player, Team, TeamDto, UpdateCaptainDto, UpdateTeamNameDto, UploadConfirm } from '../api/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  url:string = environment.url
  private http = inject(HttpClient)
  constructor() { }

  getAllTeam():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/open/team/get/all`)
  }
  getAllTeamWithoutTournament():Observable<Team[]>{
    return this.http.get<Team[]>(`${this.url}/open/team/get/all/without-tournament`)
  }
  getTeamFromName(name:string):Observable<Team>{
    return this.http.get<Team>(`${this.url}/open/team/get/byName/${name}`)
  }
  createTeam(team: TeamDto):Observable<Team>{
    //crea un team
    return this.http.post<Team>(`${this.url}/team/create`,team);
  }

  getAllPlayersFromTeam(teamName:string):Observable<Player[]>{
    return this.http.get<Player[]>(`${this.url}/open/player/get/all/team-name?team-name=${teamName}`)
  }
  updateTeam(teamName:string, team: TeamDto):Observable<Team>{
    return this.http.put<Team>(`${this.url}/team/update/team/${teamName}`, team)
  }
  updateName(id:string, teamToUpdate: UpdateTeamNameDto):Observable<Team>{
    return this.http.patch<Team>(`${this.url}/team/update/name/${id}`, teamToUpdate)
  }

  updateCaptainName(teamName:string, newCaptain:UpdateCaptainDto):Observable<Team>{
    return this.http.patch<Team>(`${this.url}/team/update/captain/team-name?team-name=${teamName}`, newCaptain)
  }

  uploadLogoTeam(teamName:string, file: File):Observable<UploadConfirm>{
    const img: FormData = new FormData();
    img.append('file', file, file.name)
    return this.http.patch<UploadConfirm>(`${this.url}/upload/logo-team/${teamName}`,img)
  }

  subscribeExsistingTeamToTournament(nameTeam: string, nameTournament: string):Observable<Team>{
    //seleziona team tramite il nome passato, manda eccezione se non esiste e inserisce il team al torneo selezionato tramite nome
    return this.http.post<Team>(`${this.url}/subscribe/existing-team/tournament-name?existing-team=${nameTeam}&tournament-name=${nameTournament}`, {});
  }
  subscribeCreatedTeamToTournament(team: TeamDto, nameTournament: string ): Observable<Team>{
    // gli verrà passato da un form un team creato e verrà inserito nel torneo
    return this.http.post<Team>(`${this.url}/subscribe/created-team/tournament-name?tournament-name=${nameTournament}`, team);
  }

  deleteTeamFromTournament(teamName:string, tournamentName:string){
    // elimina un team da un torneo
    return this.http.delete(`${this.url}/tournament/delete/team-from-tournament/${teamName}/${tournamentName}`)
  }
}
