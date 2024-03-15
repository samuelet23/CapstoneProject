/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Pageable } from '../../models/pageable';
import { PagePlayer } from '../../models/page-player';

export interface GetAllFromTeamName$Params {
  'team-name': string;
  pageable: Pageable;
}

export function getAllFromTeamName(http: HttpClient, rootUrl: string, params: GetAllFromTeamName$Params, context?: HttpContext): Observable<StrictHttpResponse<PagePlayer>> {
  const rb = new RequestBuilder(rootUrl, getAllFromTeamName.PATH, 'get');
  if (params) {
    rb.query('team-name', params['team-name'], {});
    rb.query('pageable', params.pageable, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PagePlayer>;
    })
  );
}

getAllFromTeamName.PATH = '/api/open/player/get/all/team-name';
