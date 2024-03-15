/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Referee } from '../../models/referee';

export interface GetRefereeById$Params {
  id: string;
}

export function getRefereeById(http: HttpClient, rootUrl: string, params: GetRefereeById$Params, context?: HttpContext): Observable<StrictHttpResponse<Referee>> {
  const rb = new RequestBuilder(rootUrl, getRefereeById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Referee>;
    })
  );
}

getRefereeById.PATH = '/api/open/referee/get/byId/{id}';
