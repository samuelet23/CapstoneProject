/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Player } from '../../models/player';
import { PlayerDto } from '../../models/player-dto';

export interface CreatePlayer$Params {
      body: PlayerDto
}

export function createPlayer(http: HttpClient, rootUrl: string, params: CreatePlayer$Params, context?: HttpContext): Observable<StrictHttpResponse<Player>> {
  const rb = new RequestBuilder(rootUrl, createPlayer.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createPlayer.PATH = '/api/player/create';
