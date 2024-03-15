/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Referee } from '../../models/referee';

export interface GetAllFromTournamentName$Params {
  'tournament-name': string;
}

export function getAllFromTournamentName(http: HttpClient, rootUrl: string, params: GetAllFromTournamentName$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Referee>>> {
  const rb = new RequestBuilder(rootUrl, getAllFromTournamentName.PATH, 'get');
  if (params) {
    rb.query('tournament-name', params['tournament-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Referee>>;
    })
  );
}

getAllFromTournamentName.PATH = '/api/open/referee/get/all/tournament-name';
