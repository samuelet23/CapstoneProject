/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Game } from '../../models/game';

export interface GetGameById$Params {
  id: string;
}

export function getGameById(http: HttpClient, rootUrl: string, params: GetGameById$Params, context?: HttpContext): Observable<StrictHttpResponse<Game>> {
  const rb = new RequestBuilder(rootUrl, getGameById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Game>;
    })
  );
}

getGameById.PATH = '/api/open/game/get/{id}';
