/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Player } from '../../models/player';

export interface GetPlayerById$Params {
  id: string;
}

export function getPlayerById(http: HttpClient, rootUrl: string, params: GetPlayerById$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
  const rb = new RequestBuilder(rootUrl, getPlayerById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Player>;
    })
  );
}

getPlayerById.PATH = '/api/open/player/get/byId/{id}';
