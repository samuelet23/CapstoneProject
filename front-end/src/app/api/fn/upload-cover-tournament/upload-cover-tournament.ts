/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UploadConfirm } from '../../models/upload-confirm';

export interface UploadCoverTournament$Params {
  'tournament-name': string;
      body?: {
'file': Blob;
}
}

export function uploadCoverTournament(http: HttpClient, rootUrl: string, params: UploadCoverTournament$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadConfirm>> {
  const rb = new RequestBuilder(rootUrl, uploadCoverTournament.PATH, 'patch');
  if (params) {
    rb.path('tournament-name', params['tournament-name'], {});
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

uploadCoverTournament.PATH = '/api/upload/cover-tournament/{tournament-name}';
