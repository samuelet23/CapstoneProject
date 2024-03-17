/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Game } from '../../models/game';

export interface GenerateSemiFinals$Params {
  'tournament-name': string;
}

export function generateSemiFinals(http: HttpClient, rootUrl: string, params: GenerateSemiFinals$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Game>>> {
  const rb = new RequestBuilder(rootUrl, generateSemiFinals.PATH, 'post');
  if (params) {
    rb.path('tournament-name', params['tournament-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Game>>;
    })
  );
}

generateSemiFinals.PATH = '/api/generate/semi-final/{tournament-name}';
