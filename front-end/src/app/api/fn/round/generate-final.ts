/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Game } from '../../models/game';

export interface GenerateFinal$Params {
  'tournament-name': string;
}

export function generateFinal(http: HttpClient, rootUrl: string, params: GenerateFinal$Params, context?: HttpContext): Observable<StrictHttpResponse<Game>> {
  const rb = new RequestBuilder(rootUrl, generateFinal.PATH, 'post');
  if (params) {
    rb.path('tournament-name', params['tournament-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Game>;
    })
  );
}

generateFinal.PATH = '/api/generate/final/{tournament-name}';
