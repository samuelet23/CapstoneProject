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
import { deleteById1 } from '../fn/team/delete-by-id-1';
import { DeleteById1$Params } from '../fn/team/delete-by-id-1';
import { deleteByName } from '../fn/team/delete-by-name';
import { DeleteByName$Params } from '../fn/team/delete-by-name';
import { DeleteRes } from '../models/delete-res';
import { updateCaptainFromTeam } from '../fn/team/update-captain-from-team';
import { UpdateCaptainFromTeam$Params } from '../fn/team/update-captain-from-team';

@Injectable({ providedIn: 'root' })
export class TeamService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateCaptainFromTeam()` */
  static readonly UpdateCaptainFromTeamPath = '/api/team/update/captain/team-name';

  /**
   * Update team captain.
   *
   * Update the captain of a team.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCaptainFromTeam()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCaptainFromTeam$Response(params: UpdateCaptainFromTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateCaptainFromTeam(this.http, this.rootUrl, params, context);
  }

  /**
   * Update team captain.
   *
   * Update the captain of a team.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCaptainFromTeam$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCaptainFromTeam(params: UpdateCaptainFromTeam$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateCaptainFromTeam$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `deleteByName()` */
  static readonly DeleteByNamePath = '/api/team/delete/byName/{name}';

  /**
   * Delete team by name.
   *
   * Delete a team by its name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByName$Response(params: DeleteByName$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteByName(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete team by name.
   *
   * Delete a team by its name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByName(params: DeleteByName$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

  /** Path part for operation `deleteById1()` */
  static readonly DeleteById1Path = '/api/team/delete/byId/{id}';

  /**
   * Delete team by ID.
   *
   * Delete a team by its ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById1$Response(params: DeleteById1$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteById1(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete team by ID.
   *
   * Delete a team by its ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById1(params: DeleteById1$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
