/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tournament } from '../../models/tournament';

export interface GetAllTournamentByLevel$Params {
  'tournament-level': string;
}

export function getAllTournamentByLevel(http: HttpClient, rootUrl: string, params: GetAllTournamentByLevel$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tournament>>> {
  const rb = new RequestBuilder(rootUrl, getAllTournamentByLevel.PATH, 'get');
  if (params) {
    rb.query('tournament-level', params['tournament-level'], {});
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

getAllTournamentByLevel.PATH = '/api/open/tournament/get/all/tournament-level';
