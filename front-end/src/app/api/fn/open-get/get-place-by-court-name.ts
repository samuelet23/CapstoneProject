/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Place } from '../../models/place';

export interface GetPlaceByCourtName$Params {
  'court-name': string;
}

export function getPlaceByCourtName(http: HttpClient, rootUrl: string, params: GetPlaceByCourtName$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
  const rb = new RequestBuilder(rootUrl, getPlaceByCourtName.PATH, 'get');
  if (params) {
    rb.query('court-name', params['court-name'], {});
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

getPlaceByCourtName.PATH = '/api/open/place/get/court-name';
