/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UploadConfirm } from '../../models/upload-confirm';

export interface UploadLogoTeam$Params {
  'name-team': string;
      body?: {
'file': Blob;
}
}

export function uploadLogoTeam(http: HttpClient, rootUrl: string, params: UploadLogoTeam$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadConfirm>> {
  const rb = new RequestBuilder(rootUrl, uploadLogoTeam.PATH, 'patch');
  if (params) {
    rb.path('name-team', params['name-team'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UploadConfirm>;
    })
  );
}

uploadLogoTeam.PATH = '/api/upload/logo-team/{name-team}';
