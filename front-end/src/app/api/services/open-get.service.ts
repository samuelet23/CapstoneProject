/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { averagePointPerGame } from '../fn/open-get/average-point-per-game';
import { AveragePointPerGame$Params } from '../fn/open-get/average-point-per-game';
import { ConfirmPlayerPoints } from '../models/confirm-player-points';
import { Game } from '../models/game';
import { getAll } from '../fn/open-get/get-all';
import { GetAll$Params } from '../fn/open-get/get-all';
import { getAllByTournamentName } from '../fn/open-get/get-all-by-tournament-name';
import { GetAllByTournamentName$Params } from '../fn/open-get/get-all-by-tournament-name';
import { getAllByTournamentName1 } from '../fn/open-get/get-all-by-tournament-name-1';
import { GetAllByTournamentName1$Params } from '../fn/open-get/get-all-by-tournament-name-1';
import { getAllFromTeamName } from '../fn/open-get/get-all-from-team-name';
import { GetAllFromTeamName$Params } from '../fn/open-get/get-all-from-team-name';
import { getAllFromTournamentName } from '../fn/open-get/get-all-from-tournament-name';
import { GetAllFromTournamentName$Params } from '../fn/open-get/get-all-from-tournament-name';
import { getAllPlace } from '../fn/open-get/get-all-place';
import { GetAllPlace$Params } from '../fn/open-get/get-all-place';
import { getAllPlayer } from '../fn/open-get/get-all-player';
import { GetAllPlayer$Params } from '../fn/open-get/get-all-player';
import { getAllProvince } from '../fn/open-get/get-all-province';
import { GetAllProvince$Params } from '../fn/open-get/get-all-province';
import { getAllReferee } from '../fn/open-get/get-all-referee';
import { GetAllReferee$Params } from '../fn/open-get/get-all-referee';
import { getAllRegion } from '../fn/open-get/get-all-region';
import { GetAllRegion$Params } from '../fn/open-get/get-all-region';
import { getAllTeam } from '../fn/open-get/get-all-team';
import { GetAllTeam$Params } from '../fn/open-get/get-all-team';
import { getAllTeamWithoutCaptain } from '../fn/open-get/get-all-team-without-captain';
import { GetAllTeamWithoutCaptain$Params } from '../fn/open-get/get-all-team-without-captain';
import { getAllTournament } from '../fn/open-get/get-all-tournament';
import { GetAllTournament$Params } from '../fn/open-get/get-all-tournament';
import { getAllTournamentAfterStarDate } from '../fn/open-get/get-all-tournament-after-star-date';
import { GetAllTournamentAfterStarDate$Params } from '../fn/open-get/get-all-tournament-after-star-date';
import { getAllTournamentAfterStarDateAndTown } from '../fn/open-get/get-all-tournament-after-star-date-and-town';
import { GetAllTournamentAfterStarDateAndTown$Params } from '../fn/open-get/get-all-tournament-after-star-date-and-town';
import { getAllTournamentByCourtName } from '../fn/open-get/get-all-tournament-by-court-name';
import { GetAllTournamentByCourtName$Params } from '../fn/open-get/get-all-tournament-by-court-name';
import { getAllTournamentByLevel } from '../fn/open-get/get-all-tournament-by-level';
import { GetAllTournamentByLevel$Params } from '../fn/open-get/get-all-tournament-by-level';
import { getAllTournamentByPlaceId } from '../fn/open-get/get-all-tournament-by-place-id';
import { GetAllTournamentByPlaceId$Params } from '../fn/open-get/get-all-tournament-by-place-id';
import { getAllTournamentByRegion } from '../fn/open-get/get-all-tournament-by-region';
import { GetAllTournamentByRegion$Params } from '../fn/open-get/get-all-tournament-by-region';
import { getAllTournamentByTownName } from '../fn/open-get/get-all-tournament-by-town-name';
import { GetAllTournamentByTownName$Params } from '../fn/open-get/get-all-tournament-by-town-name';
import { getAllTown } from '../fn/open-get/get-all-town';
import { GetAllTown$Params } from '../fn/open-get/get-all-town';
import { getByUsername } from '../fn/open-get/get-by-username';
import { GetByUsername$Params } from '../fn/open-get/get-by-username';
import { getGameAll } from '../fn/open-get/get-game-all';
import { GetGameAll$Params } from '../fn/open-get/get-game-all';
import { getGameAllByTournament } from '../fn/open-get/get-game-all-by-tournament';
import { GetGameAllByTournament$Params } from '../fn/open-get/get-game-all-by-tournament';
import { getGameById } from '../fn/open-get/get-game-by-id';
import { GetGameById$Params } from '../fn/open-get/get-game-by-id';
import { getPlaceByCourtName } from '../fn/open-get/get-place-by-court-name';
import { GetPlaceByCourtName$Params } from '../fn/open-get/get-place-by-court-name';
import { getPlaceById } from '../fn/open-get/get-place-by-id';
import { GetPlaceById$Params } from '../fn/open-get/get-place-by-id';
import { getPlayerById } from '../fn/open-get/get-player-by-id';
import { GetPlayerById$Params } from '../fn/open-get/get-player-by-id';
import { getPlayerByName } from '../fn/open-get/get-player-by-name';
import { GetPlayerByName$Params } from '../fn/open-get/get-player-by-name';
import { getPlayersAndPointsFromTournament } from '../fn/open-get/get-players-and-points-from-tournament';
import { GetPlayersAndPointsFromTournament$Params } from '../fn/open-get/get-players-and-points-from-tournament';
import { getPointsByPlayerId } from '../fn/open-get/get-points-by-player-id';
import { GetPointsByPlayerId$Params } from '../fn/open-get/get-points-by-player-id';
import { getRefereeById } from '../fn/open-get/get-referee-by-id';
import { GetRefereeById$Params } from '../fn/open-get/get-referee-by-id';
import { getRefereeByNickname } from '../fn/open-get/get-referee-by-nickname';
import { GetRefereeByNickname$Params } from '../fn/open-get/get-referee-by-nickname';
import { getTeamById } from '../fn/open-get/get-team-by-id';
import { GetTeamById$Params } from '../fn/open-get/get-team-by-id';
import { getTeamByName } from '../fn/open-get/get-team-by-name';
import { GetTeamByName$Params } from '../fn/open-get/get-team-by-name';
import { getTeamByPlayerName } from '../fn/open-get/get-team-by-player-name';
import { GetTeamByPlayerName$Params } from '../fn/open-get/get-team-by-player-name';
import { getTournamentById } from '../fn/open-get/get-tournament-by-id';
import { GetTournamentById$Params } from '../fn/open-get/get-tournament-by-id';
import { getTournamentByName } from '../fn/open-get/get-tournament-by-name';
import { GetTournamentByName$Params } from '../fn/open-get/get-tournament-by-name';
import { getTownName } from '../fn/open-get/get-town-name';
import { GetTownName$Params } from '../fn/open-get/get-town-name';
import { getUserById } from '../fn/open-get/get-user-by-id';
import { GetUserById$Params } from '../fn/open-get/get-user-by-id';
import { PageCompetition } from '../models/page-competition';
import { PageGame } from '../models/page-game';
import { PagePlace } from '../models/page-place';
import { PagePlayer } from '../models/page-player';
import { PageTeam } from '../models/page-team';
import { PageTournament } from '../models/page-tournament';
import { PageUser } from '../models/page-user';
import { Place } from '../models/place';
import { Player } from '../models/player';
import { PlayerPointRes } from '../models/player-point-res';
import { Province } from '../models/province';
import { Referee } from '../models/referee';
import { Team } from '../models/team';
import { Tournament } from '../models/tournament';
import { Town } from '../models/town';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class OpenGetService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getByUsername()` */
  static readonly GetByUsernamePath = '/api/open/user/get/byUsername/{username}';

  /**
   * Get a user by username.
   *
   * Retrieve a user by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUsername$Response(params: GetByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a user by username.
   *
   * Retrieve a user by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUsername(params: GetByUsername$Params, context?: HttpContext): Observable<User> {
    return this.getByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/api/open/user/get/byId/{id}';

  /**
   * Get a user by ID.
   *
   * Retrieve a user by their unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a user by ID.
   *
   * Retrieve a user by their unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<User> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `getAll()` */
  static readonly GetAllPath = '/api/open/user/get/all';

  /**
   * Get all users.
   *
   * Retrieve all users with pagination support.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll$Response(params: GetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PageUser>> {
    return getAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all users.
   *
   * Retrieve all users with pagination support.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll(params: GetAll$Params, context?: HttpContext): Observable<PageUser> {
    return this.getAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageUser>): PageUser => r.body)
    );
  }

  /** Path part for operation `getTournamentByName()` */
  static readonly GetTournamentByNamePath = '/api/open/tournament/get/byName/{tournament-name}';

  /**
   * Get a tournament by name.
   *
   * Retrieve a tournament by its name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTournamentByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTournamentByName$Response(params: GetTournamentByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Tournament>> {
    return getTournamentByName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a tournament by name.
   *
   * Retrieve a tournament by its name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTournamentByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTournamentByName(params: GetTournamentByName$Params, context?: HttpContext): Observable<Tournament> {
    return this.getTournamentByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tournament>): Tournament => r.body)
    );
  }

  /** Path part for operation `getTournamentById()` */
  static readonly GetTournamentByIdPath = '/api/open/tournament/get/byId/{id}';

  /**
   * Get a tournament by ID.
   *
   * Retrieve a tournament by its unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTournamentById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTournamentById$Response(params: GetTournamentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Tournament>> {
    return getTournamentById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a tournament by ID.
   *
   * Retrieve a tournament by its unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTournamentById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTournamentById(params: GetTournamentById$Params, context?: HttpContext): Observable<Tournament> {
    return this.getTournamentById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Tournament>): Tournament => r.body)
    );
  }

  /** Path part for operation `getAllTournament()` */
  static readonly GetAllTournamentPath = '/api/open/tournament/get/all';

  /**
   * Get all tournaments.
   *
   * Retrieve all tournaments with pagination support.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournament()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournament$Response(params: GetAllTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<PageTournament>> {
    return getAllTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all tournaments.
   *
   * Retrieve all tournaments with pagination support.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournament$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournament(params: GetAllTournament$Params, context?: HttpContext): Observable<PageTournament> {
    return this.getAllTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageTournament>): PageTournament => r.body)
    );
  }

  /** Path part for operation `getAllTournamentByLevel()` */
  static readonly GetAllTournamentByLevelPath = '/api/open/tournament/get/all/tournament-level';

  /**
   * Get tournaments by level.
   *
   * Retrieve tournaments by their level.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentByLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByLevel$Response(params: GetAllTournamentByLevel$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tournament>>> {
    return getAllTournamentByLevel(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tournaments by level.
   *
   * Retrieve tournaments by their level.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentByLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByLevel(params: GetAllTournamentByLevel$Params, context?: HttpContext): Observable<Array<Tournament>> {
    return this.getAllTournamentByLevel$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Tournament>>): Array<Tournament> => r.body)
    );
  }

  /** Path part for operation `getAllTournamentByPlaceId()` */
  static readonly GetAllTournamentByPlaceIdPath = '/api/open/tournament/get/all/place-id';

  /**
   * Get all tournaments by place ID.
   *
   * Retrieve all tournaments associated with a specific place.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentByPlaceId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByPlaceId$Response(params: GetAllTournamentByPlaceId$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCompetition>> {
    return getAllTournamentByPlaceId(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all tournaments by place ID.
   *
   * Retrieve all tournaments associated with a specific place.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentByPlaceId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByPlaceId(params: GetAllTournamentByPlaceId$Params, context?: HttpContext): Observable<PageCompetition> {
    return this.getAllTournamentByPlaceId$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCompetition>): PageCompetition => r.body)
    );
  }

  /** Path part for operation `getAllTournamentByTownName()` */
  static readonly GetAllTournamentByTownNamePath = '/api/open/tournament/get/all/auto-complete/town-name';

  /**
   * Get tournaments by town name (autocomplete).
   *
   * Retrieve tournaments matching a keyword in the town name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentByTownName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByTownName$Response(params: GetAllTournamentByTownName$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCompetition>> {
    return getAllTournamentByTownName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tournaments by town name (autocomplete).
   *
   * Retrieve tournaments matching a keyword in the town name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentByTownName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByTownName(params: GetAllTournamentByTownName$Params, context?: HttpContext): Observable<PageCompetition> {
    return this.getAllTournamentByTownName$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCompetition>): PageCompetition => r.body)
    );
  }

  /** Path part for operation `getAllTournamentByRegion()` */
  static readonly GetAllTournamentByRegionPath = '/api/open/tournament/get/all/auto-complete/region-name';

  /**
   * Get tournaments by region name (autocomplete).
   *
   * Retrieve tournaments matching a keyword in the region name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentByRegion()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByRegion$Response(params: GetAllTournamentByRegion$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCompetition>> {
    return getAllTournamentByRegion(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tournaments by region name (autocomplete).
   *
   * Retrieve tournaments matching a keyword in the region name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentByRegion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByRegion(params: GetAllTournamentByRegion$Params, context?: HttpContext): Observable<PageCompetition> {
    return this.getAllTournamentByRegion$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCompetition>): PageCompetition => r.body)
    );
  }

  /** Path part for operation `getAllTournamentByCourtName()` */
  static readonly GetAllTournamentByCourtNamePath = '/api/open/tournament/get/all/auto-complete/court-name';

  /**
   * Get tournaments by court name (autocomplete).
   *
   * Retrieve tournaments matching a keyword in the court name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentByCourtName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByCourtName$Response(params: GetAllTournamentByCourtName$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCompetition>> {
    return getAllTournamentByCourtName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tournaments by court name (autocomplete).
   *
   * Retrieve tournaments matching a keyword in the court name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentByCourtName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentByCourtName(params: GetAllTournamentByCourtName$Params, context?: HttpContext): Observable<PageCompetition> {
    return this.getAllTournamentByCourtName$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCompetition>): PageCompetition => r.body)
    );
  }

  /** Path part for operation `getAllTournamentAfterStarDate()` */
  static readonly GetAllTournamentAfterStarDatePath = '/api/open/tournament/get/all/after-starter-date';

  /**
   * Get tournaments starting after a given date.
   *
   * Retrieve tournaments starting after a specific date.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentAfterStarDate()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentAfterStarDate$Response(params: GetAllTournamentAfterStarDate$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tournament>>> {
    return getAllTournamentAfterStarDate(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tournaments starting after a given date.
   *
   * Retrieve tournaments starting after a specific date.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentAfterStarDate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentAfterStarDate(params: GetAllTournamentAfterStarDate$Params, context?: HttpContext): Observable<Array<Tournament>> {
    return this.getAllTournamentAfterStarDate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Tournament>>): Array<Tournament> => r.body)
    );
  }

  /** Path part for operation `getAllTournamentAfterStarDateAndTown()` */
  static readonly GetAllTournamentAfterStarDateAndTownPath = '/api/open/tournament/get/all/after-starter-date/town-name';

  /**
   * Get tournaments starting after a given date in a specific town.
   *
   * Retrieve tournaments starting after a specific date in a given town.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTournamentAfterStarDateAndTown()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentAfterStarDateAndTown$Response(params: GetAllTournamentAfterStarDateAndTown$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tournament>>> {
    return getAllTournamentAfterStarDateAndTown(this.http, this.rootUrl, params, context);
  }

  /**
   * Get tournaments starting after a given date in a specific town.
   *
   * Retrieve tournaments starting after a specific date in a given town.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTournamentAfterStarDateAndTown$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTournamentAfterStarDateAndTown(params: GetAllTournamentAfterStarDateAndTown$Params, context?: HttpContext): Observable<Array<Tournament>> {
    return this.getAllTournamentAfterStarDateAndTown$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Tournament>>): Array<Tournament> => r.body)
    );
  }

  /** Path part for operation `getTeamByPlayerName()` */
  static readonly GetTeamByPlayerNamePath = '/api/open/team/get/player-name';

  /**
   * Get a team by player's name.
   *
   * Retrieve the team by a player's name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTeamByPlayerName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeamByPlayerName$Response(params: GetTeamByPlayerName$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return getTeamByPlayerName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a team by player's name.
   *
   * Retrieve the team by a player's name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTeamByPlayerName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeamByPlayerName(params: GetTeamByPlayerName$Params, context?: HttpContext): Observable<Team> {
    return this.getTeamByPlayerName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `getTeamByName()` */
  static readonly GetTeamByNamePath = '/api/open/team/get/byName/{name}';

  /**
   * Get a team by name.
   *
   * Retrieve a team by its name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTeamByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeamByName$Response(params: GetTeamByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return getTeamByName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a team by name.
   *
   * Retrieve a team by its name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTeamByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeamByName(params: GetTeamByName$Params, context?: HttpContext): Observable<Team> {
    return this.getTeamByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `getTeamById()` */
  static readonly GetTeamByIdPath = '/api/open/team/get/byId/{id}';

  /**
   * Get a team by ID.
   *
   * Retrieve a team by its unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTeamById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeamById$Response(params: GetTeamById$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return getTeamById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a team by ID.
   *
   * Retrieve a team by its unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTeamById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeamById(params: GetTeamById$Params, context?: HttpContext): Observable<Team> {
    return this.getTeamById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `getAllTeam()` */
  static readonly GetAllTeamPath = '/api/open/team/get/all';

  /**
   * Get all teams.
   *
   * Retrieve all teams with pagination support.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTeam()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTeam$Response(params: GetAllTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<PageTeam>> {
    return getAllTeam(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all teams.
   *
   * Retrieve all teams with pagination support.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTeam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTeam(params: GetAllTeam$Params, context?: HttpContext): Observable<PageTeam> {
    return this.getAllTeam$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageTeam>): PageTeam => r.body)
    );
  }

  /** Path part for operation `getAllTeamWithoutCaptain()` */
  static readonly GetAllTeamWithoutCaptainPath = '/api/open/team/get/all/without-captain';

  /**
   * Get all teams without captain.
   *
   * Retrieve all teams without a captain.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTeamWithoutCaptain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTeamWithoutCaptain$Response(params?: GetAllTeamWithoutCaptain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Team>>> {
    return getAllTeamWithoutCaptain(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all teams without captain.
   *
   * Retrieve all teams without a captain.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTeamWithoutCaptain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTeamWithoutCaptain(params?: GetAllTeamWithoutCaptain$Params, context?: HttpContext): Observable<Array<Team>> {
    return this.getAllTeamWithoutCaptain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Team>>): Array<Team> => r.body)
    );
  }

  /** Path part for operation `getAllByTournamentName()` */
  static readonly GetAllByTournamentNamePath = '/api/open/team/get/all/tournament-name';

  /**
   * Get all teams by tournament name.
   *
   * Retrieve all teams participating in a specific tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllByTournamentName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByTournamentName$Response(params: GetAllByTournamentName$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Team>>> {
    return getAllByTournamentName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all teams by tournament name.
   *
   * Retrieve all teams participating in a specific tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllByTournamentName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByTournamentName(params: GetAllByTournamentName$Params, context?: HttpContext): Observable<Array<Team>> {
    return this.getAllByTournamentName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Team>>): Array<Team> => r.body)
    );
  }

  /** Path part for operation `getRefereeByNickname()` */
  static readonly GetRefereeByNicknamePath = '/api/open/referee/get/byNickname/{nickname}';

  /**
   * Get a referee by nickname.
   *
   * Retrieve a referee by their nickname.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRefereeByNickname()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRefereeByNickname$Response(params: GetRefereeByNickname$Params, context?: HttpContext): Observable<StrictHttpResponse<Referee>> {
    return getRefereeByNickname(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a referee by nickname.
   *
   * Retrieve a referee by their nickname.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRefereeByNickname$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRefereeByNickname(params: GetRefereeByNickname$Params, context?: HttpContext): Observable<Referee> {
    return this.getRefereeByNickname$Response(params, context).pipe(
      map((r: StrictHttpResponse<Referee>): Referee => r.body)
    );
  }

  /** Path part for operation `getRefereeById()` */
  static readonly GetRefereeByIdPath = '/api/open/referee/get/byId/{id}';

  /**
   * Get a referee by ID.
   *
   * Retrieve a referee by their unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRefereeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRefereeById$Response(params: GetRefereeById$Params, context?: HttpContext): Observable<StrictHttpResponse<Referee>> {
    return getRefereeById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a referee by ID.
   *
   * Retrieve a referee by their unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRefereeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRefereeById(params: GetRefereeById$Params, context?: HttpContext): Observable<Referee> {
    return this.getRefereeById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Referee>): Referee => r.body)
    );
  }

  /** Path part for operation `getAllReferee()` */
  static readonly GetAllRefereePath = '/api/open/referee/get/all';

  /**
   * Get all referees.
   *
   * Retrieve all referees.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllReferee()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReferee$Response(params?: GetAllReferee$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Referee>>> {
    return getAllReferee(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all referees.
   *
   * Retrieve all referees.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllReferee$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllReferee(params?: GetAllReferee$Params, context?: HttpContext): Observable<Array<Referee>> {
    return this.getAllReferee$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Referee>>): Array<Referee> => r.body)
    );
  }

  /** Path part for operation `getAllFromTournamentName()` */
  static readonly GetAllFromTournamentNamePath = '/api/open/referee/get/all/tournament-name';

  /**
   * Get all referees by tournament name.
   *
   * Retrieve all referees for a specific tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFromTournamentName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFromTournamentName$Response(params: GetAllFromTournamentName$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Referee>>> {
    return getAllFromTournamentName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all referees by tournament name.
   *
   * Retrieve all referees for a specific tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFromTournamentName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFromTournamentName(params: GetAllFromTournamentName$Params, context?: HttpContext): Observable<Array<Referee>> {
    return this.getAllFromTournamentName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Referee>>): Array<Referee> => r.body)
    );
  }

  /** Path part for operation `getPointsByPlayerId()` */
  static readonly GetPointsByPlayerIdPath = '/api/open/player/get/{id}/points';

  /**
   * Get points by player ID.
   *
   * Retrieve the points scored by a player.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPointsByPlayerId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPointsByPlayerId$Response(params: GetPointsByPlayerId$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmPlayerPoints>> {
    return getPointsByPlayerId(this.http, this.rootUrl, params, context);
  }

  /**
   * Get points by player ID.
   *
   * Retrieve the points scored by a player.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPointsByPlayerId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPointsByPlayerId(params: GetPointsByPlayerId$Params, context?: HttpContext): Observable<ConfirmPlayerPoints> {
    return this.getPointsByPlayerId$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmPlayerPoints>): ConfirmPlayerPoints => r.body)
    );
  }

  /** Path part for operation `getPlayersAndPointsFromTournament()` */
  static readonly GetPlayersAndPointsFromTournamentPath = '/api/open/player/get/point-player/tournament-name';

  /**
   * Get players and points by tournament name.
   *
   * Retrieve players and their points for a specific tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlayersAndPointsFromTournament()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayersAndPointsFromTournament$Response(params: GetPlayersAndPointsFromTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<PlayerPointRes>> {
    return getPlayersAndPointsFromTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * Get players and points by tournament name.
   *
   * Retrieve players and their points for a specific tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPlayersAndPointsFromTournament$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayersAndPointsFromTournament(params: GetPlayersAndPointsFromTournament$Params, context?: HttpContext): Observable<PlayerPointRes> {
    return this.getPlayersAndPointsFromTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<PlayerPointRes>): PlayerPointRes => r.body)
    );
  }

  /** Path part for operation `getPlayerByName()` */
  static readonly GetPlayerByNamePath = '/api/open/player/get/byName/{name}';

  /**
   * Get a player by name.
   *
   * Retrieve a player by their name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlayerByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayerByName$Response(params: GetPlayerByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
    return getPlayerByName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a player by name.
   *
   * Retrieve a player by their name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPlayerByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayerByName(params: GetPlayerByName$Params, context?: HttpContext): Observable<Player> {
    return this.getPlayerByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Player>): Player => r.body)
    );
  }

  /** Path part for operation `getPlayerById()` */
  static readonly GetPlayerByIdPath = '/api/open/player/get/byId/{id}';

  /**
   * Get a player by ID.
   *
   * Retrieve a player by their unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlayerById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayerById$Response(params: GetPlayerById$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
    return getPlayerById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a player by ID.
   *
   * Retrieve a player by their unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPlayerById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlayerById(params: GetPlayerById$Params, context?: HttpContext): Observable<Player> {
    return this.getPlayerById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Player>): Player => r.body)
    );
  }

  /** Path part for operation `averagePointPerGame()` */
  static readonly AveragePointPerGamePath = '/api/open/player/get/averagePoints/name-player';

  /**
   * Get average points per game by player name.
   *
   * Retrieve the average points per game for a player.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `averagePointPerGame()` instead.
   *
   * This method doesn't expect any request body.
   */
  averagePointPerGame$Response(params: AveragePointPerGame$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return averagePointPerGame(this.http, this.rootUrl, params, context);
  }

  /**
   * Get average points per game by player name.
   *
   * Retrieve the average points per game for a player.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `averagePointPerGame$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  averagePointPerGame(params: AveragePointPerGame$Params, context?: HttpContext): Observable<number> {
    return this.averagePointPerGame$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getAllPlayer()` */
  static readonly GetAllPlayerPath = '/api/open/player/get/all';

  /**
   * Get all players.
   *
   * Retrieve all players with pagination support.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPlayer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPlayer$Response(params: GetAllPlayer$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlayer>> {
    return getAllPlayer(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all players.
   *
   * Retrieve all players with pagination support.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPlayer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPlayer(params: GetAllPlayer$Params, context?: HttpContext): Observable<PagePlayer> {
    return this.getAllPlayer$Response(params, context).pipe(
      map((r: StrictHttpResponse<PagePlayer>): PagePlayer => r.body)
    );
  }

  /** Path part for operation `getAllByTournamentName1()` */
  static readonly GetAllByTournamentName1Path = '/api/open/player/get/all/tournament-name';

  /**
   * Get all players by tournament name.
   *
   * Retrieve all players participating in a specific tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllByTournamentName1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByTournamentName1$Response(params: GetAllByTournamentName1$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlayer>> {
    return getAllByTournamentName1(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all players by tournament name.
   *
   * Retrieve all players participating in a specific tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllByTournamentName1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByTournamentName1(params: GetAllByTournamentName1$Params, context?: HttpContext): Observable<PagePlayer> {
    return this.getAllByTournamentName1$Response(params, context).pipe(
      map((r: StrictHttpResponse<PagePlayer>): PagePlayer => r.body)
    );
  }

  /** Path part for operation `getAllFromTeamName()` */
  static readonly GetAllFromTeamNamePath = '/api/open/player/get/all/team-name';

  /**
   * Get all players by team name.
   *
   * Retrieve all players belonging to a specific team.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllFromTeamName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFromTeamName$Response(params: GetAllFromTeamName$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlayer>> {
    return getAllFromTeamName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all players by team name.
   *
   * Retrieve all players belonging to a specific team.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllFromTeamName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllFromTeamName(params: GetAllFromTeamName$Params, context?: HttpContext): Observable<PagePlayer> {
    return this.getAllFromTeamName$Response(params, context).pipe(
      map((r: StrictHttpResponse<PagePlayer>): PagePlayer => r.body)
    );
  }

  /** Path part for operation `getPlaceById()` */
  static readonly GetPlaceByIdPath = '/api/open/place/get/{id}';

  /**
   * Get a place by ID.
   *
   * Retrieve a place by its unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlaceById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlaceById$Response(params: GetPlaceById$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
    return getPlaceById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a place by ID.
   *
   * Retrieve a place by its unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPlaceById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlaceById(params: GetPlaceById$Params, context?: HttpContext): Observable<Place> {
    return this.getPlaceById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Place>): Place => r.body)
    );
  }

  /** Path part for operation `getTownName()` */
  static readonly GetTownNamePath = '/api/open/place/get/town-name';

  /**
   * Get a place by town name.
   *
   * Retrieve a place by its town name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTownName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTownName$Response(params: GetTownName$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
    return getTownName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a place by town name.
   *
   * Retrieve a place by its town name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTownName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTownName(params: GetTownName$Params, context?: HttpContext): Observable<Place> {
    return this.getTownName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Place>): Place => r.body)
    );
  }

  /** Path part for operation `getPlaceByCourtName()` */
  static readonly GetPlaceByCourtNamePath = '/api/open/place/get/court-name';

  /**
   * Get a place by court name.
   *
   * Retrieve a place by its court name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlaceByCourtName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlaceByCourtName$Response(params: GetPlaceByCourtName$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
    return getPlaceByCourtName(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a place by court name.
   *
   * Retrieve a place by its court name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPlaceByCourtName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlaceByCourtName(params: GetPlaceByCourtName$Params, context?: HttpContext): Observable<Place> {
    return this.getPlaceByCourtName$Response(params, context).pipe(
      map((r: StrictHttpResponse<Place>): Place => r.body)
    );
  }

  /** Path part for operation `getAllPlace()` */
  static readonly GetAllPlacePath = '/api/open/place/get/all';

  /**
   * Get all places.
   *
   * Retrieve all places with pagination support.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPlace()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPlace$Response(params: GetAllPlace$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlace>> {
    return getAllPlace(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all places.
   *
   * Retrieve all places with pagination support.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPlace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPlace(params: GetAllPlace$Params, context?: HttpContext): Observable<PagePlace> {
    return this.getAllPlace$Response(params, context).pipe(
      map((r: StrictHttpResponse<PagePlace>): PagePlace => r.body)
    );
  }

  /** Path part for operation `getAllTown()` */
  static readonly GetAllTownPath = '/api/open/place/get/all/town';

  /**
   * Get all towns.
   *
   * Retrieve all towns.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTown()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTown$Response(params?: GetAllTown$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Town>>> {
    return getAllTown(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all towns.
   *
   * Retrieve all towns.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTown$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTown(params?: GetAllTown$Params, context?: HttpContext): Observable<Array<Town>> {
    return this.getAllTown$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Town>>): Array<Town> => r.body)
    );
  }

  /** Path part for operation `getAllRegion()` */
  static readonly GetAllRegionPath = '/api/open/place/get/all/region';

  /**
   * Get all regions.
   *
   * Retrieve all regions.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllRegion()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRegion$Response(params?: GetAllRegion$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getAllRegion(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all regions.
   *
   * Retrieve all regions.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllRegion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllRegion(params?: GetAllRegion$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getAllRegion$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `getAllProvince()` */
  static readonly GetAllProvincePath = '/api/open/place/get/all/province';

  /**
   * Get all provinces.
   *
   * Retrieve all provinces.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProvince()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProvince$Response(params?: GetAllProvince$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Province>>> {
    return getAllProvince(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all provinces.
   *
   * Retrieve all provinces.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProvince$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProvince(params?: GetAllProvince$Params, context?: HttpContext): Observable<Array<Province>> {
    return this.getAllProvince$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Province>>): Array<Province> => r.body)
    );
  }

  /** Path part for operation `getGameById()` */
  static readonly GetGameByIdPath = '/api/open/game/get/{id}';

  /**
   * Get a game by ID.
   *
   * Retrieve a game by its unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGameById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGameById$Response(params: GetGameById$Params, context?: HttpContext): Observable<StrictHttpResponse<Game>> {
    return getGameById(this.http, this.rootUrl, params, context);
  }

  /**
   * Get a game by ID.
   *
   * Retrieve a game by its unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGameById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGameById(params: GetGameById$Params, context?: HttpContext): Observable<Game> {
    return this.getGameById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Game>): Game => r.body)
    );
  }

  /** Path part for operation `getGameAll()` */
  static readonly GetGameAllPath = '/api/open/game/get/all';

  /**
   * Get all games.
   *
   * Retrieve all games with pagination support.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGameAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGameAll$Response(params: GetGameAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PageGame>> {
    return getGameAll(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all games.
   *
   * Retrieve all games with pagination support.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGameAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGameAll(params: GetGameAll$Params, context?: HttpContext): Observable<PageGame> {
    return this.getGameAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageGame>): PageGame => r.body)
    );
  }

  /** Path part for operation `getGameAllByTournament()` */
  static readonly GetGameAllByTournamentPath = '/api/open/game/get/all/tournament/{name}';

  /**
   * Get all games by tournament.
   *
   * Retrieve all games associated with a specific tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGameAllByTournament()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGameAllByTournament$Response(params: GetGameAllByTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Game>>> {
    return getGameAllByTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * Get all games by tournament.
   *
   * Retrieve all games associated with a specific tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGameAllByTournament$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGameAllByTournament(params: GetGameAllByTournament$Params, context?: HttpContext): Observable<Array<Game>> {
    return this.getGameAllByTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Game>>): Array<Game> => r.body)
    );
  }

}
