/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Team } from '../../models/team';

export interface GetAllByTournamentName$Params {
  'tournament-name': string;
}

export function getAllByTournamentName(http: HttpClient, rootUrl: string, params: GetAllByTournamentName$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Team>>> {
  const rb = new RequestBuilder(rootUrl, getAllByTournamentName.PATH, 'get');
  if (params) {
    rb.query('tournament-name', params['tournament-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Team>>;
    })
  );
}

getAllByTournamentName.PATH = '/api/open/team/get/all/tournament-name';
