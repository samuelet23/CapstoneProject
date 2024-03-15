/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { UploadConfirm } from '../models/upload-confirm';
import { uploadCoverTournament } from '../fn/upload-cover-tournament/upload-cover-tournament';
import { UploadCoverTournament$Params } from '../fn/upload-cover-tournament/upload-cover-tournament';

@Injectable({ providedIn: 'root' })
export class UploadCoverTournamentService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadCoverTournament()` */
  static readonly UploadCoverTournamentPath = '/api/upload/cover-tournament/{tournament-name}';

  /**
   * Upload tournament cover image.
   *
   * Upload a cover image for a tournament.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadCoverTournament()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadCoverTournament$Response(params: UploadCoverTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadConfirm>> {
    return uploadCoverTournament(this.http, this.rootUrl, params, context);
  }

  /**
   * Upload tournament cover image.
   *
   * Upload a cover image for a tournament.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadCoverTournament$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadCoverTournament(params: UploadCoverTournament$Params, context?: HttpContext): Observable<UploadConfirm> {
    return this.uploadCoverTournament$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadConfirm>): UploadConfirm => r.body)
    );
  }

}
