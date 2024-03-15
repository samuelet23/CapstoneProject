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
import { createReferee } from '../fn/referee/create-referee';
import { CreateReferee$Params } from '../fn/referee/create-referee';
import { deleteById2 } from '../fn/referee/delete-by-id-2';
import { DeleteById2$Params } from '../fn/referee/delete-by-id-2';
import { deleteByName1 } from '../fn/referee/delete-by-name-1';
import { DeleteByName1$Params } from '../fn/referee/delete-by-name-1';
import { DeleteRes } from '../models/delete-res';
import { Referee } from '../models/referee';
import { update } from '../fn/referee/update';
import { Update$Params } from '../fn/referee/update';
import { update1 } from '../fn/referee/update-1';
import { Update1$Params } from '../fn/referee/update-1';

@Injectable({ providedIn: 'root' })
export class RefereeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `update()` */
  static readonly UpdatePath = '/api/referee/update/byNickname/{nickname}';

  /**
   * Update Referee.
   *
   * Update referee information.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return update(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Referee.
   *
   * Update referee information.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: Update$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.update$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `update1()` */
  static readonly Update1Path = '/api/referee/update/byId/{id}';

  /**
   * Update Referee.
   *
   * Update referee information.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1$Response(params: Update1$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return update1(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Referee.
   *
   * Update referee information.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1(params: Update1$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.update1$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `createReferee()` */
  static readonly CreateRefereePath = '/api/referee/create';

  /**
   * Create Referee.
   *
   * Create a new referee.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createReferee()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createReferee$Response(params: CreateReferee$Params, context?: HttpContext): Observable<StrictHttpResponse<Referee>> {
    return createReferee(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Referee.
   *
   * Create a new referee.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createReferee$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createReferee(params: CreateReferee$Params, context?: HttpContext): Observable<Referee> {
    return this.createReferee$Response(params, context).pipe(
      map((r: StrictHttpResponse<Referee>): Referee => r.body)
    );
  }

  /** Path part for operation `deleteByName1()` */
  static readonly DeleteByName1Path = '/api/referee/delete/byNickname/{nickname}';

  /**
   * Delete Referee by Name.
   *
   * Delete a referee by name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteByName1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByName1$Response(params: DeleteByName1$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteByName1(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Referee by Name.
   *
   * Delete a referee by name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteByName1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByName1(params: DeleteByName1$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteByName1$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

  /** Path part for operation `deleteById2()` */
  static readonly DeleteById2Path = '/api/referee/delete/byId/{id}';

  /**
   * Delete Referee by ID.
   *
   * Delete a referee by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2$Response(params: DeleteById2$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteById2(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Referee by ID.
   *
   * Delete a referee by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2(params: DeleteById2$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteById2$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
