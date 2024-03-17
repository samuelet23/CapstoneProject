/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Team } from '../../models/team';
import { TeamDto } from '../../models/team-dto';

export interface CreateAndSubscribeTeamToTournament$Params {
  'tournament-name': string;
      body: TeamDto
}

export function createAndSubscribeTeamToTournament(http: HttpClient, rootUrl: string, params: CreateAndSubscribeTeamToTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
  const rb = new RequestBuilder(rootUrl, createAndSubscribeTeamToTournament.PATH, 'post');
  if (params) {
    rb.query('tournament-name', params['tournament-name'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Team>;
    })
  );
}

createAndSubscribeTeamToTournament.PATH = '/api/subscribe/created-team/tournament-name';
