/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Tournament } from '../../models/tournament';

export interface GetAllTournamentAfterStarDateAndTown$Params {
  'town-name': string;
  'after-starter-date': string;
}

export function getAllTournamentAfterStarDateAndTown(http: HttpClient, rootUrl: string, params: GetAllTournamentAfterStarDateAndTown$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Tournament>>> {
  const rb = new RequestBuilder(rootUrl, getAllTournamentAfterStarDateAndTown.PATH, 'get');
  if (params) {
    rb.query('town-name', params['town-name'], {});
    rb.query('after-starter-date', params['after-starter-date'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Tournament>>;
    })
  );
}

getAllTournamentAfterStarDateAndTown.PATH = '/api/open/tournament/get/all/after-starter-date/town-name';
