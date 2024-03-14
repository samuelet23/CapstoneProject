/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';
import { UpdateStatsPlayerDto } from '../../models/update-stats-player-dto';

export interface UpdateStatsById$Params {
  id: string;
      body: UpdateStatsPlayerDto
}

export function updateStatsById(http: HttpClient, rootUrl: string, params: UpdateStatsById$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updateStatsById.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
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

updateStatsById.PATH = '/api/player/update/stats/byId/{id}';
