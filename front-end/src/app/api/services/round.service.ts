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
import { generateFinal } from '../fn/round/generate-final';
import { GenerateFinal$Params } from '../fn/round/generate-final';
import { generateQuarterFinals } from '../fn/round/generate-quarter-finals';
import { GenerateQuarterFinals$Params } from '../fn/round/generate-quarter-finals';
import { generateSemiFinals } from '../fn/round/generate-semi-finals';
import { GenerateSemiFinals$Params } from '../fn/round/generate-semi-finals';

@Injectable({ providedIn: 'root' })
export class RoundService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `generateSemiFinals()` */
  static readonly GenerateSemiFinalsPath = '/api/generate/semi-final/{tournament-name}';

  /**
   * Generate Semi Finals.
   *
   * Generate semi finals for a tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateSemiFinals()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateSemiFinals$Response(params: GenerateSemiFinals$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return generateSemiFinals(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate Semi Finals.
   *
   * Generate semi finals for a tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateSemiFinals$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateSemiFinals(params: GenerateSemiFinals$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.generateSemiFinals$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `generateQuarterFinals()` */
  static readonly GenerateQuarterFinalsPath = '/api/generate/quarter-final/{tournament-name}';

  /**
   * Generate Quarter Finals.
   *
   * Generate quarter finals for a tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateQuarterFinals()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateQuarterFinals$Response(params: GenerateQuarterFinals$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return generateQuarterFinals(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate Quarter Finals.
   *
   * Generate quarter finals for a tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateQuarterFinals$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateQuarterFinals(params: GenerateQuarterFinals$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.generateQuarterFinals$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `generateFinal()` */
  static readonly GenerateFinalPath = '/api/generate/final/{tournament-name}';

  /**
   * Generate Final Match.
   *
   * Generate final match for a tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateFinal()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateFinal$Response(params: GenerateFinal$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return generateFinal(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate Final Match.
   *
   * Generate final match for a tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateFinal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generateFinal(params: GenerateFinal$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.generateFinal$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

}
