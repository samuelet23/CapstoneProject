/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tournament } from '../../models/tournament';
import { TournamentDto } from '../../models/tournament-dto';

export interface CreateTournament$Params {
      body: TournamentDto
}

export function createTournament(http: HttpClient, rootUrl: string, params: CreateTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<Tournament>> {
  const rb = new RequestBuilder(rootUrl, createTournament.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Tournament>;
    })
  );
}

createTournament.PATH = '/api/tournament/create';
