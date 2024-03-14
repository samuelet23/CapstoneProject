/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PageUser } from '../../models/page-user';

export interface GetAll$Params {
  pageable: Pageable;
}

export function getAll(http: HttpClient, rootUrl: string, params: GetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<PageUser>> {
  const rb = new RequestBuilder(rootUrl, getAll.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageUser>;
    })
  );
}

getAll.PATH = '/api/open/user/get/all';
