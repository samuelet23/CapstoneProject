/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Team } from '../../models/team';
import { UpdateTeamNameDto } from '../../models/update-team-name-dto';

export interface UpdateName$Params {
  id: string;
      body: UpdateTeamNameDto
}

export function updateName(http: HttpClient, rootUrl: string, params: UpdateName$Params, context?: HttpContext): Observable<StrictHttpResponse<Team>> {
  const rb = new RequestBuilder(rootUrl, updateName.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
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

updateName.PATH = '/api/team/update/name/{id}';
