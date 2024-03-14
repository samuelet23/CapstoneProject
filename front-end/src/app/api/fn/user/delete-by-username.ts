/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteRes } from '../../models/delete-res';

export interface DeleteByUsername$Params {
  username: string;
}

export function deleteByUsername(http: HttpClient, rootUrl: string, params: DeleteByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
  const rb = new RequestBuilder(rootUrl, deleteByUsername.PATH, 'delete');
  if (params) {
    rb.path('username', params.username, {});
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

deleteByUsername.PATH = '/api/user/delete/byUsername/{username}';
