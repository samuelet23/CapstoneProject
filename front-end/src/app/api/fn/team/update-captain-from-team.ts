/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';
import { UpdateCaptainDto } from '../../models/update-captain-dto';

export interface UpdateCaptainFromTeam$Params {
  'team-name': string;
      body: UpdateCaptainDto
}

export function updateCaptainFromTeam(http: HttpClient, rootUrl: string, params: UpdateCaptainFromTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updateCaptainFromTeam.PATH, 'patch');
  if (params) {
    rb.query('team-name', params['team-name'], {});
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

updateCaptainFromTeam.PATH = '/api/team/update/captain/team-name';
