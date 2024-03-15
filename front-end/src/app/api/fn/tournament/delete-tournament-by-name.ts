/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteRes } from '../../models/delete-res';

export interface DeleteTournamentByName$Params {
  name: string;
}

export function deleteTournamentByName(http: HttpClient, rootUrl: string, params: DeleteTournamentByName$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
  const rb = new RequestBuilder(rootUrl, deleteTournamentByName.PATH, 'delete');
  if (params) {
    rb.path('name', params.name, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<DeleteRes>;
    })
  );
}

deleteTournamentByName.PATH = '/api/tournament/delete/byName/{name}';
