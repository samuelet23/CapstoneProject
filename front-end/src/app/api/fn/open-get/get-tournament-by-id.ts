/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tournament } from '../../models/tournament';

export interface GetTournamentById$Params {
  id: string;
}

export function getTournamentById(http: HttpClient, rootUrl: string, params: GetTournamentById$Params, context?: HttpContext): Observable<StrictHttpResponse<Tournament>> {
  const rb = new RequestBuilder(rootUrl, getTournamentById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getTournamentById.PATH = '/api/open/tournament/get/byId/{id}';
