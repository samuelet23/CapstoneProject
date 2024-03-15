/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageTeam } from '../../models/page-team';

export interface GetAllTeam$Params {
  pageable: Pageable;
}

export function getAllTeam(http: HttpClient, rootUrl: string, params: GetAllTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<PageTeam>> {
  const rb = new RequestBuilder(rootUrl, getAllTeam.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageTeam>;
    })
  );
}

getAllTeam.PATH = '/api/open/team/get/all';
