/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Game } from '../../models/game';

export interface GenerateQuarterFinals$Params {
  'tournament-name': string;
}

export function generateQuarterFinals(http: HttpClient, rootUrl: string, params: GenerateQuarterFinals$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Game>>> {
  const rb = new RequestBuilder(rootUrl, generateQuarterFinals.PATH, 'post');
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

generateQuarterFinals.PATH = '/api/generate/quarter-final/{tournament-name}';
