/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';
import { UpdateStatsPlayerDto } from '../../models/update-stats-player-dto';

export interface UpdateStatsByNickname$Params {
  nickname: string;
      body: UpdateStatsPlayerDto
}

export function updateStatsByNickname(http: HttpClient, rootUrl: string, params: UpdateStatsByNickname$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updateStatsByNickname.PATH, 'patch');
  if (params) {
    rb.path('nickname', params.nickname, {});
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

updateStatsByNickname.PATH = '/api/player/update/stats/byNickname/{nickname}';
