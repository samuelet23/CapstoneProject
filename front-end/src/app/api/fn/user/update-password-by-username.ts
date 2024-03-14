/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';
import { UpdatePasswordDto } from '../../models/update-password-dto';

export interface UpdatePasswordByUsername$Params {
  username: string;
      body: UpdatePasswordDto
}

export function updatePasswordByUsername(http: HttpClient, rootUrl: string, params: UpdatePasswordByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updatePasswordByUsername.PATH, 'patch');
  if (params) {
    rb.path('username', params.username, {});
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

updatePasswordByUsername.PATH = '/api/user/update/password/{username}';
