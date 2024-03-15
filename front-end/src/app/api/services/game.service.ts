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
import { deleteById4 } from '../fn/game/delete-by-id-4';
import { DeleteById4$Params } from '../fn/game/delete-by-id-4';
import { DeleteRes } from '../models/delete-res';
import { finishedGame } from '../fn/game/finished-game';
import { FinishedGame$Params } from '../fn/game/finished-game';
import { startGame } from '../fn/game/start-game';
import { StartGame$Params } from '../fn/game/start-game';
import { Team } from '../models/team';
import { updateAwayPoints } from '../fn/game/update-away-points';
import { UpdateAwayPoints$Params } from '../fn/game/update-away-points';
import { updateHomePoints } from '../fn/game/update-home-points';
import { UpdateHomePoints$Params } from '../fn/game/update-home-points';

@Injectable({ providedIn: 'root' })
export class GameService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateHomePoints()` */
  static readonly UpdateHomePointsPath = '/api/game/update/{id}/homePoints';

  /**
   * Update Home Points.
   *
   * Update home points of a game.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHomePoints()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHomePoints$Response(params: UpdateHomePoints$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateHomePoints(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Home Points.
   *
   * Update home points of a game.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateHomePoints$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHomePoints(params: UpdateHomePoints$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateHomePoints$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateAwayPoints()` */
  static readonly UpdateAwayPointsPath = '/api/game/update/{id}/awayPoints';

  /**
   * Update Away Points.
   *
   * Update away points of a game.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAwayPoints()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAwayPoints$Response(params: UpdateAwayPoints$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateAwayPoints(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Away Points.
   *
   * Update away points of a game.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAwayPoints$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAwayPoints(params: UpdateAwayPoints$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateAwayPoints$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `startGame()` */
  static readonly StartGamePath = '/api/game/start/game-id';

  /**
   * Start Game.
   *
   * start a game.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `startGame()` instead.
   *
   * This method doesn't expect any request body.
   */
  startGame$Response(params: StartGame$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return startGame(this.http, this.rootUrl, params, context);
  }

  /**
   * Start Game.
   *
   * start a game.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `startGame$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  startGame(params: StartGame$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.startGame$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `finishedGame()` */
  static readonly FinishedGamePath = '/api/game/finish/{id}';

  /**
   * Finish Game.
   *
   * Finish a game.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `finishedGame()` instead.
   *
   * This method doesn't expect any request body.
   */
  finishedGame$Response(params: FinishedGame$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
    return finishedGame(this.http, this.rootUrl, params, context);
  }

  /**
   * Finish Game.
   *
   * Finish a game.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `finishedGame$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  finishedGame(params: FinishedGame$Params, context?: HttpContext): Observable<Team> {
    return this.finishedGame$Response(params, context).pipe(
      map((r: StrictHttpResponse<Team>): Team => r.body)
    );
  }

  /** Path part for operation `deleteById4()` */
  static readonly DeleteById4Path = '/api/game/delete/{id}';

  /**
   * Delete Game by ID.
   *
   * Delete a game by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4$Response(params: DeleteById4$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteById4(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Game by ID.
   *
   * Delete a game by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4(params: DeleteById4$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteById4$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
