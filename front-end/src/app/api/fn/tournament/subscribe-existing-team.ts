/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';

export interface SubscribeExistingTeam$Params {
  'existing-team': string;
  'tournament-name': string;
}

export function subscribeExistingTeam(http: HttpClient, rootUrl: string, params: SubscribeExistingTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, subscribeExistingTeam.PATH, 'post');
  if (params) {
    rb.query('existing-team', params['existing-team'], {});
    rb.query('tournament-name', params['tournament-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ConfirmRes>;
    })
  );
}

subscribeExistingTeam.PATH = '/api/tournament/subscribe/existing-team/tournament-name';
