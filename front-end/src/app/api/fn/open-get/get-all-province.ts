/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Province } from '../../models/province';

export interface GetAllProvince$Params {
}

export function getAllProvince(http: HttpClient, rootUrl: string, params?: GetAllProvince$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Province>>> {
  const rb = new RequestBuilder(rootUrl, getAllProvince.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Province>>;
    })
  );
}

getAllProvince.PATH = '/api/open/place/get/all/province';
