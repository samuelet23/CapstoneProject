/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ConfirmRes } from '../models/confirm-res';
import { createAndSubscribeTeamToTournament } from '../fn/captain/create-and-subscribe-team-to-tournament';
import { CreateAndSubscribeTeamToTournament$Params } from '../fn/captain/create-and-subscribe-team-to-tournament';
import { createPlayer } from '../fn/captain/create-player';
import { CreatePlayer$Params } from '../fn/captain/create-player';
import { createTeam } from '../fn/captain/create-team';
import { CreateTeam$Params } from '../fn/captain/create-team';
import { Player } from '../models/player';
import { subscribeExistingTeam } from '../fn/captain/subscribe-existing-team';
import { SubscribeExistingTeam$Params } from '../fn/captain/subscribe-existing-team';
import { Team } from '../models/team';
import { updateName } from '../fn/captain/update-name';
import { UpdateName$Params } from '../fn/captain/update-name';
import { updateSigla } from '../fn/captain/update-sigla';
import { UpdateSigla$Params } from '../fn/captain/update-sigla';
import { UploadConfirm } from '../models/upload-confirm';
import { uploadLogoTeam } from '../fn/captain/upload-logo-team';
import { UploadLogoTeam$Params } from '../fn/captain/upload-logo-team';

@Injectable({ providedIn: 'root' })
export class CaptainService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createTeam()` */
  static readonly CreateTeamPath = '/api/team/create';

  /**
   * Create team.
   *
   * Create a new team.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTeam()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTeam$Response(params: CreateTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return createTeam(this.http, this.rootUrl, params, context);
  }

  /**
   * Create team.
   *
   * Create a new team.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTeam$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTeam(params: CreateTeam$Params, context?: HttpContext): Observable<Team> {
    return this.createTeam$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `subscribeExistingTeam()` */
  static readonly SubscribeExistingTeamPath = '/api/subscribe/existing-team/tournament-name';

  /**
   * Subscribe an existing team to a tournament.
   *
   * This endpoint subscribe an already existing team into a specified tournament by the team's name and the tournament's name.It's a convenient way to add a team that is already registered in the system to a new or existing tournament without having to recreate the team from scratch.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `subscribeExistingTeam()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscribeExistingTeam$Response(params: SubscribeExistingTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return subscribeExistingTeam(this.http, this.rootUrl, params, context);
  }

  /**
   * Subscribe an existing team to a tournament.
   *
   * This endpoint subscribe an already existing team into a specified tournament by the team's name and the tournament's name.It's a convenient way to add a team that is already registered in the system to a new or existing tournament without having to recreate the team from scratch.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `subscribeExistingTeam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  subscribeExistingTeam(params: SubscribeExistingTeam$Params, context?: HttpContext): Observable<Team> {
    return this.subscribeExistingTeam$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `createAndSubscribeTeamToTournament()` */
  static readonly CreateAndSubscribeTeamToTournamentPath = '/api/subscribe/created-team/tournament-name';

  /**
   * Create and subscribe a new team to a tournament.
   *
   * This endpoint creates a new team based on the provided TeamDTO information and then subscribes this newly created team to a specified tournament by the tournament's name. It facilitates the process of adding fresh teams to the tournament, streamlining their creation and immediate enrollment in a single step.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAndSubscribeTeamToTournament()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAndSubscribeTeamToTournament$Response(params: CreateAndSubscribeTeamToTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return createAndSubscribeTeamToTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * Create and subscribe a new team to a tournament.
   *
   * This endpoint creates a new team based on the provided TeamDTO information and then subscribes this newly created team to a specified tournament by the tournament's name. It facilitates the process of adding fresh teams to the tournament, streamlining their creation and immediate enrollment in a single step.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createAndSubscribeTeamToTournament$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAndSubscribeTeamToTournament(params: CreateAndSubscribeTeamToTournament$Params, context?: HttpContext): Observable<Team> {
    return this.createAndSubscribeTeamToTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `createPlayer()` */
  static readonly CreatePlayerPath = '/api/player/create';

  /**
   * Create player.
   *
   * Create a new player.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPlayer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlayer$Response(params: CreatePlayer$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
    return createPlayer(this.http, this.rootUrl, params, context);
  }

  /**
   * Create player.
   *
   * Create a new player.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPlayer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlayer(params: CreatePlayer$Params, context?: HttpContext): Observable<Player> {
    return this.createPlayer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Player>): Player => r.body)
    );
  }

  /** Path part for operation `uploadLogoTeam()` */
  static readonly UploadLogoTeamPath = '/api/upload/logo-team/{name-team}';

  /**
   * Upload team's logo.
   *
   * Upload a logo for a team.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadLogoTeam()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadLogoTeam$Response(params: UploadLogoTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadConfirm>> {
    return uploadLogoTeam(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload team's logo.
   *
   * Upload a logo for a team.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadLogoTeam$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadLogoTeam(params: UploadLogoTeam$Params, context?: HttpContext): Observable<UploadConfirm> {
    return this.uploadLogoTeam$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadConfirm>): UploadConfirm => r.body)
    );
  }

  /** Path part for operation `updateName()` */
  static readonly UpdateNamePath = '/api/team/update/name/{id}';

  /**
   * Aggiorna il nome della squadra tramite l'ID.
   *
   * Aggiorna il nome di una squadra mediante il suo identificatore univoco.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateName()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateName$Response(params: UpdateName$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return updateName(this.http, this.rootUrl, params, context);
  }

  /**
   * Aggiorna il nome della squadra tramite l'ID.
   *
   * Aggiorna il nome di una squadra mediante il suo identificatore univoco.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateName$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateName(params: UpdateName$Params, context?: HttpContext): Observable<Team> {
    return this.updateName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `updateSigla()` */
  static readonly UpdateSiglaPath = '/api/player/update/sigla/{nickname}';

  /**
   * Update player's sigla by name.
   *
   * Update a player's sigla by their name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSigla()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSigla$Response(params: UpdateSigla$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateSigla(this.http, this.rootUrl, params, context);
  }

  /**
   * Update player's sigla by name.
   *
   * Update a player's sigla by their name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateSigla$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSigla(params: UpdateSigla$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateSigla$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

}
