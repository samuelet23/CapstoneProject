/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Team } from '../../models/team';

export interface GetAllTeamWithoutCaptain$Params {
}

export function getAllTeamWithoutCaptain(http: HttpClient, rootUrl: string, params?: GetAllTeamWithoutCaptain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Team>>> {
  const rb = new RequestBuilder(rootUrl, getAllTeamWithoutCaptain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Team>>;
    })
  );
}

getAllTeamWithoutCaptain.PATH = '/api/open/team/get/all/without-captain';
