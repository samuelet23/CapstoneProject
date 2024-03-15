/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Referee } from '../../models/referee';
import { RefereeDto } from '../../models/referee-dto';

export interface CreateReferee$Params {
      body: RefereeDto
}

export function createReferee(http: HttpClient, rootUrl: string, params: CreateReferee$Params, context?: HttpContext): Observable<StrictHttpResponse<Referee>> {
  const rb = new RequestBuilder(rootUrl, createReferee.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Referee>;
    })
  );
}

createReferee.PATH = '/api/referee/create';
