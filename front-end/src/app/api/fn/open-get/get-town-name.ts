/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Place } from '../../models/place';

export interface GetTownName$Params {
  'town-name': string;
}

export function getTownName(http: HttpClient, rootUrl: string, params: GetTownName$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
  const rb = new RequestBuilder(rootUrl, getTownName.PATH, 'get');
  if (params) {
    rb.query('town-name', params['town-name'], {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Place>;
    })
  );
}

getTownName.PATH = '/api/open/place/get/town-name';
