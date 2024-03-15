/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tournament } from '../../models/tournament';

export interface GetAllTournamentAfterStarDate$Params {
  'after-starter-date': string;
}

export function getAllTournamentAfterStarDate(http: HttpClient, rootUrl: string, params: GetAllTournamentAfterStarDate$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tournament>>> {
  const rb = new RequestBuilder(rootUrl, getAllTournamentAfterStarDate.PATH, 'get');
  if (params) {
    rb.query('after-starter-date', params['after-starter-date'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Tournament>>;
    })
  );
}

getAllTournamentAfterStarDate.PATH = '/api/open/tournament/get/all/after-starter-date';
