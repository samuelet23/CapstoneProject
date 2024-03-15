/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteRes } from '../../models/delete-res';

export interface DeleteByName1$Params {
  nickname: string;
}

export function deleteByName1(http: HttpClient, rootUrl: string, params: DeleteByName1$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
  const rb = new RequestBuilder(rootUrl, deleteByName1.PATH, 'delete');
  if (params) {
    rb.path('nickname', params.nickname, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeleteRes>;
    })
  );
}

deleteByName1.PATH = '/api/referee/delete/byNickname/{nickname}';
