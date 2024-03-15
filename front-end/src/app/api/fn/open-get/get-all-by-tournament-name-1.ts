/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PagePlayer } from '../../models/page-player';

export interface GetAllByTournamentName1$Params {
  'tournament-name': string;
  pageable: Pageable;
}

export function getAllByTournamentName1(http: HttpClient, rootUrl: string, params: GetAllByTournamentName1$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlayer>> {
  const rb = new RequestBuilder(rootUrl, getAllByTournamentName1.PATH, 'get');
  if (params) {
    rb.query('tournament-name', params['tournament-name'], {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PagePlayer>;
    })
  );
}

getAllByTournamentName1.PATH = '/api/open/player/get/all/tournament-name';
