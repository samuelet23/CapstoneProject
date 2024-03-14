/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tournament } from '../../models/tournament';

export interface GetTournamentByName$Params {
  'tournament-name': string;
}

export function getTournamentByName(http: HttpClient, rootUrl: string, params: GetTournamentByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Tournament>> {
  const rb = new RequestBuilder(rootUrl, getTournamentByName.PATH, 'get');
  if (params) {
    rb.path('tournament-name', params['tournament-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Tournament>;
    })
  );
}

getTournamentByName.PATH = '/api/open/tournament/get/byName/{tournament-name}';
