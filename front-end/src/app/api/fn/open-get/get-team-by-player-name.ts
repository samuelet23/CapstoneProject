/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Team } from '../../models/team';

export interface GetTeamByPlayerName$Params {
  'player-name': string;
}

export function getTeamByPlayerName(http: HttpClient, rootUrl: string, params: GetTeamByPlayerName$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
  const rb = new RequestBuilder(rootUrl, getTeamByPlayerName.PATH, 'get');
  if (params) {
    rb.query('player-name', params['player-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Team>;
    })
  );
}

getTeamByPlayerName.PATH = '/api/open/team/get/player-name';
