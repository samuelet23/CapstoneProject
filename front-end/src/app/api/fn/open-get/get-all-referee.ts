/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Referee } from '../../models/referee';

export interface GetAllReferee$Params {
}

export function getAllReferee(http: HttpClient, rootUrl: string, params?: GetAllReferee$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Referee>>> {
  const rb = new RequestBuilder(rootUrl, getAllReferee.PATH, 'get');
  if (params) {
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

getAllReferee.PATH = '/api/open/referee/get/all';
