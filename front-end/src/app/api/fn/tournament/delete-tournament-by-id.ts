/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { DeleteRes } from '../../models/delete-res';

export interface DeleteTournamentById$Params {
  id: string;
}

export function deleteTournamentById(http: HttpClient, rootUrl: string, params: DeleteTournamentById$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
  const rb = new RequestBuilder(rootUrl, deleteTournamentById.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
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

deleteTournamentById.PATH = '/api/tournament/delete/byId/{id}';
