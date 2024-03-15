/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ConfirmRes } from '../../models/confirm-res';
import { PlaceDto } from '../../models/place-dto';

export interface UpdatePlaceByCourtName$Params {
  'court-name': string;
      body: PlaceDto
}

export function updatePlaceByCourtName(http: HttpClient, rootUrl: string, params: UpdatePlaceByCourtName$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updatePlaceByCourtName.PATH, 'put');
  if (params) {
    rb.path('court-name', params['court-name'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ConfirmRes>;
    })
  );
}

updatePlaceByCourtName.PATH = '/api/place/update/by-court-name/{court-name}';
