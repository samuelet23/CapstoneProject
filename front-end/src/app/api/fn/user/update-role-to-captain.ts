/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateRoleRes } from '../../models/update-role-res';

export interface UpdateRoleToCaptain$Params {
  username: string;
}

export function updateRoleToCaptain(http: HttpClient, rootUrl: string, params: UpdateRoleToCaptain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateRoleRes>> {
  const rb = new RequestBuilder(rootUrl, updateRoleToCaptain.PATH, 'patch');
  if (params) {
    rb.path('username', params.username, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UpdateRoleRes>;
    })
  );
}

updateRoleToCaptain.PATH = '/api/user/update/{username}/captain';
