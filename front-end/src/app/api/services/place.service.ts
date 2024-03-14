/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ConfirmRes } from '../models/confirm-res';
import { createPlace } from '../fn/place/create-place';
import { CreatePlace$Params } from '../fn/place/create-place';
import { deletePlace } from '../fn/place/delete-place';
import { DeletePlace$Params } from '../fn/place/delete-place';
import { DeleteRes } from '../models/delete-res';
import { Place } from '../models/place';
import { updateAddress } from '../fn/place/update-address';
import { UpdateAddress$Params } from '../fn/place/update-address';
import { updateCourtName } from '../fn/place/update-court-name';
import { UpdateCourtName$Params } from '../fn/place/update-court-name';
import { updatePlaceByCourtName } from '../fn/place/update-place-by-court-name';
import { UpdatePlaceByCourtName$Params } from '../fn/place/update-place-by-court-name';
import { updatePlaceById } from '../fn/place/update-place-by-id';
import { UpdatePlaceById$Params } from '../fn/place/update-place-by-id';

@Injectable({ providedIn: 'root' })
export class PlaceService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updatePlaceById()` */
  static readonly UpdatePlaceByIdPath = '/api/place/update/byId/{id}';

  /**
   * Update Place by ID.
   *
   * Update a place by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePlaceById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlaceById$Response(params: UpdatePlaceById$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updatePlaceById(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Place by ID.
   *
   * Update a place by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePlaceById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlaceById(params: UpdatePlaceById$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updatePlaceById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updatePlaceByCourtName()` */
  static readonly UpdatePlaceByCourtNamePath = '/api/place/update/by-court-name/{court-name}';

  /**
   * Update Place by Court Name.
   *
   * Update a place by court name.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePlaceByCourtName()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlaceByCourtName$Response(params: UpdatePlaceByCourtName$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updatePlaceByCourtName(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Place by Court Name.
   *
   * Update a place by court name.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePlaceByCourtName$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlaceByCourtName(params: UpdatePlaceByCourtName$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updatePlaceByCourtName$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `createPlace()` */
  static readonly CreatePlacePath = '/api/place/create';

  /**
   * Create Place.
   *
   * Create a new place.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPlace()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlace$Response(params: CreatePlace$Params, context?: HttpContext): Observable<StrictHttpResponse<Place>> {
    return createPlace(this.http, this.rootUrl, params, context);
  }

  /**
   * Create Place.
   *
   * Create a new place.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPlace$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlace(params: CreatePlace$Params, context?: HttpContext): Observable<Place> {
    return this.createPlace$Response(params, context).pipe(
      map((r: StrictHttpResponse<Place>): Place => r.body)
    );
  }

  /** Path part for operation `updateCourtName()` */
  static readonly UpdateCourtNamePath = '/api/place/update/id/court-name';

  /**
   * Update Court Name of Place by ID.
   *
   * Update court name of a place by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCourtName()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourtName$Response(params: UpdateCourtName$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateCourtName(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Court Name of Place by ID.
   *
   * Update court name of a place by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCourtName$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourtName(params: UpdateCourtName$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateCourtName$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateAddress()` */
  static readonly UpdateAddressPath = '/api/place/update/id/address';

  /**
   * Update Address of Place by ID.
   *
   * Update address of a place by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAddress()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress$Response(params: UpdateAddress$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateAddress(this.http, this.rootUrl, params, context);
  }

  /**
   * Update Address of Place by ID.
   *
   * Update address of a place by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateAddress$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAddress(params: UpdateAddress$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateAddress$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `deletePlace()` */
  static readonly DeletePlacePath = '/api/place/delete/{id}';

  /**
   * Delete Place by ID.
   *
   * Delete a place by ID.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePlace()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlace$Response(params: DeletePlace$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deletePlace(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete Place by ID.
   *
   * Delete a place by ID.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePlace$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlace(params: DeletePlace$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deletePlace$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
