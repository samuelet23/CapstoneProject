/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AccessTokenRes } from '../models/access-token-res';
import { login } from '../fn/auth/login';
import { Login$Params } from '../fn/auth/login';
import { register } from '../fn/auth/register';
import { Register$Params } from '../fn/auth/register';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/auth/register';

  /**
   * This is a summary for register endpoint.
   *
   * Register endpoint for user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This is a summary for register endpoint.
   *
   * Register endpoint for user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<User> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body )
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/api/auth/login';

  /**
   * This is a summary for login endpoint.
   *
   * Login endpoint for user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<AccessTokenRes>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This is a summary for login endpoint.
   *
   * Login endpoint for user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<AccessTokenRes> {
    return this.login$Response(params, context).pipe(
      map((response: StrictHttpResponse<AccessTokenRes>) => {
        return response.body;
      })
    );
  }





}
