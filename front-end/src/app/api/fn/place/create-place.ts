/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Place } from '../../models/place';
import { PlaceDto } from '../../models/place-dto';

export interface CreatePlace$Params {
      body: PlaceDto
}

export function createPlace(http: HttpClient, rootUrl: string, params: CreatePlace$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
  const rb = new RequestBuilder(rootUrl, createPlace.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

createPlace.PATH = '/api/place/create';
