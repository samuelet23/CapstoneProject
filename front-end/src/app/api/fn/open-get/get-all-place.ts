/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PagePlace } from '../../models/page-place';

export interface GetAllPlace$Params {
  pageable: Pageable;
}

export function getAllPlace(http: HttpClient, rootUrl: string, params: GetAllPlace$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlace>> {
  const rb = new RequestBuilder(rootUrl, getAllPlace.PATH, 'get');
  if (params) {
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PagePlace>;
    })
  );
}

getAllPlace.PATH = '/api/open/place/get/all';
