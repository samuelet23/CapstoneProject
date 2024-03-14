/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';
import { RefereeDto } from '../../models/referee-dto';

export interface UpdateLevelToRisingStars$Params {
  'tournament-name': string;
      body: Array<RefereeDto>
}

export function updateLevelToRisingStars(http: HttpClient, rootUrl: string, params: UpdateLevelToRisingStars$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updateLevelToRisingStars.PATH, 'patch');
  if (params) {
    rb.query('tournament-name', params['tournament-name'], {});
    rb.body(params.body, 'application/json');
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

updateLevelToRisingStars.PATH = '/api/tournament/update/level/rising-stars/tournament-name';
