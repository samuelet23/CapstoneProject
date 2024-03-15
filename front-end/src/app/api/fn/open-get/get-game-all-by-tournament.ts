/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Game } from '../../models/game';

export interface GetGameAllByTournament$Params {
  name: string;
}

export function getGameAllByTournament(http: HttpClient, rootUrl: string, params: GetGameAllByTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Game>>> {
  const rb = new RequestBuilder(rootUrl, getGameAllByTournament.PATH, 'get');
  if (params) {
    rb.path('name', params.name, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Game>>;
    })
  );
}

getGameAllByTournament.PATH = '/api/open/game/get/all/tournament/{name}';
