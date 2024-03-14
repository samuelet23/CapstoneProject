/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PlayerPointRes } from '../../models/player-point-res';

export interface GetPlayersAndPointsFromTournament$Params {
  tournamentName: string;
}

export function getPlayersAndPointsFromTournament(http: HttpClient, rootUrl: string, params: GetPlayersAndPointsFromTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<PlayerPointRes>> {
  const rb = new RequestBuilder(rootUrl, getPlayersAndPointsFromTournament.PATH, 'get');
  if (params) {
    rb.query('tournamentName', params.tournamentName, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PlayerPointRes>;
    })
  );
}

getPlayersAndPointsFromTournament.PATH = '/api/open/player/get/point-player/tournament-name';
