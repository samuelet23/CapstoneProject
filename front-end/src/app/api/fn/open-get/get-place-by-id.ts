/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Place } from '../../models/place';

export interface GetPlaceById$Params {
  id: string;
}

export function getPlaceById(http: HttpClient, rootUrl: string, params: GetPlaceById$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
  const rb = new RequestBuilder(rootUrl, getPlaceById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getPlaceById.PATH = '/api/open/place/get/{id}';
