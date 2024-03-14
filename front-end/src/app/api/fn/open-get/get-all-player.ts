/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PagePlayer } from '../../models/page-player';

export interface GetAllPlayer$Params {
  pageable: Pageable;
}

export function getAllPlayer(http: HttpClient, rootUrl: string, params: GetAllPlayer$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlayer>> {
  const rb = new RequestBuilder(rootUrl, getAllPlayer.PATH, 'get');
  if (params) {
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

getAllPlayer.PATH = '/api/open/player/get/all';
