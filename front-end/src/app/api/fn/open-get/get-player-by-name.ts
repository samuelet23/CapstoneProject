/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Player } from '../../models/player';

export interface GetPlayerByName$Params {
  name: string;
}

export function getPlayerByName(http: HttpClient, rootUrl: string, params: GetPlayerByName$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
  const rb = new RequestBuilder(rootUrl, getPlayerByName.PATH, 'get');
  if (params) {
    rb.query('name', params.name, {});
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

getPlayerByName.PATH = '/api/open/player/get/byName/{name}';
