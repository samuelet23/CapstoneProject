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
import { createAndSubscribeTeamToTournament } from '../fn/tournament/create-and-subscribe-team-to-tournament';
import { CreateAndSubscribeTeamToTournament$Params } from '../fn/tournament/create-and-subscribe-team-to-tournament';
import { createTournament } from '../fn/tournament/create-tournament';
import { CreateTournament$Params } from '../fn/tournament/create-tournament';
import { DeleteRes } from '../models/delete-res';
import { deleteTournamentById } from '../fn/tournament/delete-tournament-by-id';
import { DeleteTournamentById$Params } from '../fn/tournament/delete-tournament-by-id';
import { deleteTournamentByName } from '../fn/tournament/delete-tournament-by-name';
import { DeleteTournamentByName$Params } from '../fn/tournament/delete-tournament-by-name';
import { Game } from '../models/game';
import { startTournament } from '../fn/tournament/start-tournament';
import { StartTournament$Params } from '../fn/tournament/start-tournament';
import { subscribeExistingTeam } from '../fn/tournament/subscribe-existing-team';
import { SubscribeExistingTeam$Params } from '../fn/tournament/subscribe-existing-team';
import { Tournament } from '../models/tournament';
import { updateLevelToElite } from '../fn/tournament/update-level-to-elite';
import { UpdateLevelToElite$Params } from '../fn/tournament/update-level-to-elite';
import { updateLevelToJunior } from '../fn/tournament/update-level-to-junior';
import { UpdateLevelToJunior$Params } from '../fn/tournament/update-level-to-junior';
import { updateLevelToRisingStars } from '../fn/tournament/update-level-to-rising-stars';
import { UpdateLevelToRisingStars$Params } from '../fn/tournament/update-level-to-rising-stars';

@Injectable({ providedIn: 'root' })
export class TournamentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `subscribeExistingTeam()` */
  static readonly SubscribeExistingTeamPath = '/api/tournament/subscribe/existing-team/tournament-name';

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
  subscribeExistingTeam$Response(params: SubscribeExistingTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
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
  subscribeExistingTeam(params: SubscribeExistingTeam$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.subscribeExistingTeam$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `createAndSubscribeTeamToTournament()` */
  static readonly CreateAndSubscribeTeamToTournamentPath = '/api/tournament/subscribe/created-team/tournament-name';

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
  createAndSubscribeTeamToTournament$Response(params: CreateAndSubscribeTeamToTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
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
  createAndSubscribeTeamToTournament(params: CreateAndSubscribeTeamToTournament$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.createAndSubscribeTeamToTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `startTournament()` */
  static readonly StartTournamentPath = '/api/tournament/start/{tournament-name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startTournament()` instead.
   *
   * This method doesn't expect any request body.
   */
  startTournament$Response(params: StartTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Game>>> {
    return startTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `startTournament$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  startTournament(params: StartTournament$Params, context?: HttpContext): Observable<Array<Game>> {
    return this.startTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Game>>): Array<Game> => r.body)
    );
  }

  /** Path part for operation `createTournament()` */
  static readonly CreateTournamentPath = '/api/tournament/create';

  /**
   * Create tournament.
   *
   * Create a new tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTournament()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTournament$Response(params: CreateTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Tournament>> {
    return createTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * Create tournament.
   *
   * Create a new tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createTournament$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTournament(params: CreateTournament$Params, context?: HttpContext): Observable<Tournament> {
    return this.createTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tournament>): Tournament => r.body)
    );
  }

  /** Path part for operation `updateLevelToRisingStars()` */
  static readonly UpdateLevelToRisingStarsPath = '/api/tournament/update/level/rising-stars/tournament-name';

  /**
   * Update tournament level to Rising Stars.
   *
   * Update the level of a tournament to Rising Stars and update the number of referees accordingly.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLevelToRisingStars()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLevelToRisingStars$Response(params: UpdateLevelToRisingStars$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateLevelToRisingStars(this.http, this.rootUrl, params, context);
  }

  /**
   * Update tournament level to Rising Stars.
   *
   * Update the level of a tournament to Rising Stars and update the number of referees accordingly.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLevelToRisingStars$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLevelToRisingStars(params: UpdateLevelToRisingStars$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateLevelToRisingStars$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateLevelToJunior()` */
  static readonly UpdateLevelToJuniorPath = '/api/tournament/update/level/junior/tournament-name';

  /**
   * Update tournament level to Junior.
   *
   * Update the level of a tournament to Junior and update the number of referees accordingly.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLevelToJunior()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLevelToJunior$Response(params: UpdateLevelToJunior$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateLevelToJunior(this.http, this.rootUrl, params, context);
  }

  /**
   * Update tournament level to Junior.
   *
   * Update the level of a tournament to Junior and update the number of referees accordingly.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLevelToJunior$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLevelToJunior(params: UpdateLevelToJunior$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateLevelToJunior$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateLevelToElite()` */
  static readonly UpdateLevelToElitePath = '/api/tournament/update/level/elite/tournament-name';

  /**
   * Update tournament level to Elite.
   *
   * Update the level of a tournament to Elite and update the number of referees accordingly.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLevelToElite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLevelToElite$Response(params: UpdateLevelToElite$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateLevelToElite(this.http, this.rootUrl, params, context);
  }

  /**
   * Update tournament level to Elite.
   *
   * Update the level of a tournament to Elite and update the number of referees accordingly.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLevelToElite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLevelToElite(params: UpdateLevelToElite$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateLevelToElite$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `deleteTournamentByName()` */
  static readonly DeleteTournamentByNamePath = '/api/tournament/delete/byName/{name}';

  /**
   * Delete tournament by name.
   *
   * Delete a tournament by its name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTournamentByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTournamentByName$Response(params: DeleteTournamentByName$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteTournamentByName(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete tournament by name.
   *
   * Delete a tournament by its name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTournamentByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTournamentByName(params: DeleteTournamentByName$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteTournamentByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

  /** Path part for operation `deleteTournamentById()` */
  static readonly DeleteTournamentByIdPath = '/api/tournament/delete/byId/{id}';

  /**
   * Delete tournament by ID.
   *
   * Delete a tournament by its ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTournamentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTournamentById$Response(params: DeleteTournamentById$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteTournamentById(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete tournament by ID.
   *
   * Delete a tournament by its ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTournamentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTournamentById(params: DeleteTournamentById$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteTournamentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
