/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageTournament } from '../../models/page-tournament';

export interface GetAllTournament$Params {
  pageable: Pageable;
}

export function getAllTournament(http: HttpClient, rootUrl: string, params: GetAllTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<PageTournament>> {
  const rb = new RequestBuilder(rootUrl, getAllTournament.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageTournament>;
    })
  );
}

getAllTournament.PATH = '/api/open/tournament/get/all';
