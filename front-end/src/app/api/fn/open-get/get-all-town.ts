/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Town } from '../../models/town';

export interface GetAllTown$Params {
}

export function getAllTown(http: HttpClient, rootUrl: string, params?: GetAllTown$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Town>>> {
  const rb = new RequestBuilder(rootUrl, getAllTown.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Town>>;
    })
  );
}

getAllTown.PATH = '/api/open/place/get/all/town';
