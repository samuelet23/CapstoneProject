/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageCompetition } from '../../models/page-competition';

export interface GetAllTournamentByRegion$Params {
  'region-name': string;
  pageable: Pageable;
}

export function getAllTournamentByRegion(http: HttpClient, rootUrl: string, params: GetAllTournamentByRegion$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCompetition>> {
  const rb = new RequestBuilder(rootUrl, getAllTournamentByRegion.PATH, 'get');
  if (params) {
    rb.query('region-name', params['region-name'], {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageCompetition>;
    })
  );
}

getAllTournamentByRegion.PATH = '/api/open/tournament/get/all/auto-complete/region-name';
