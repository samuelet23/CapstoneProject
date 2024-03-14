/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AddPointsDto } from '../../models/add-points-dto';
import { ConfirmRes } from '../../models/confirm-res';

export interface UpdateHomePoints$Params {
  id: string;
      body: AddPointsDto
}

export function updateHomePoints(http: HttpClient, rootUrl: string, params: UpdateHomePoints$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
  const rb = new RequestBuilder(rootUrl, updateHomePoints.PATH, 'put');
  if (params) {
    rb.path('id', params.id, {});
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

updateHomePoints.PATH = '/api/game/update/{id}/homePoints';
