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
import { deleteById3 } from '../fn/player/delete-by-id-3';
import { DeleteById3$Params } from '../fn/player/delete-by-id-3';
import { deleteByNickname } from '../fn/player/delete-by-nickname';
import { DeleteByNickname$Params } from '../fn/player/delete-by-nickname';
import { DeleteRes } from '../models/delete-res';
import { updateCredentialPlayers } from '../fn/player/update-credential-players';
import { UpdateCredentialPlayers$Params } from '../fn/player/update-credential-players';
import { updateStatsById } from '../fn/player/update-stats-by-id';
import { UpdateStatsById$Params } from '../fn/player/update-stats-by-id';
import { updateStatsByNickname } from '../fn/player/update-stats-by-nickname';
import { UpdateStatsByNickname$Params } from '../fn/player/update-stats-by-nickname';

@Injectable({ providedIn: 'root' })
export class PlayerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateStatsByNickname()` */
  static readonly UpdateStatsByNicknamePath = '/api/player/update/stats/byNickname/{nickname}';

  /**
   * Update Player Stats by nickname.
   *
   * Update player's statistics by nickname.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatsByNickname()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatsByNickname$Response(params: UpdateStatsByNickname$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateStatsByNickname(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Player Stats by nickname.
   *
   * Update player's statistics by nickname.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStatsByNickname$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatsByNickname(params: UpdateStatsByNickname$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateStatsByNickname$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateStatsById()` */
  static readonly UpdateStatsByIdPath = '/api/player/update/stats/byId/{id}';

  /**
   * Update Player Stats by ID.
   *
   * Update player's statistics by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatsById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatsById$Response(params: UpdateStatsById$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateStatsById(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Player Stats by ID.
   *
   * Update player's statistics by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateStatsById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatsById(params: UpdateStatsById$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateStatsById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateCredentialPlayers()` */
  static readonly UpdateCredentialPlayersPath = '/api/player/update/credential/{id}';

  /**
   * Update Player Credentials by ID.
   *
   * Update player's credentials by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCredentialPlayers()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCredentialPlayers$Response(params: UpdateCredentialPlayers$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateCredentialPlayers(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Player Credentials by ID.
   *
   * Update player's credentials by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCredentialPlayers$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCredentialPlayers(params: UpdateCredentialPlayers$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateCredentialPlayers$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `deleteByNickname()` */
  static readonly DeleteByNicknamePath = '/api/player/delete/{nickname}';

  /**
   * Delete Player by nickname.
   *
   * Delete a player by nickname.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteByNickname()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByNickname$Response(params: DeleteByNickname$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteByNickname(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Player by nickname.
   *
   * Delete a player by nickname.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteByNickname$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByNickname(params: DeleteByNickname$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteByNickname$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

  /** Path part for operation `deleteById3()` */
  static readonly DeleteById3Path = '/api/player/delete/{id}';

  /**
   * Delete Player by ID.
   *
   * Delete a player by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3$Response(params: DeleteById3$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteById3(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Player by ID.
   *
   * Delete a player by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3(params: DeleteById3$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteById3$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
