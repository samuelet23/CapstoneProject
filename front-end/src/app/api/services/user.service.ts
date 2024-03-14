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
import { createUser } from '../fn/user/create-user';
import { CreateUser$Params } from '../fn/user/create-user';
import { deleteById } from '../fn/user/delete-by-id';
import { DeleteById$Params } from '../fn/user/delete-by-id';
import { deleteByUsername } from '../fn/user/delete-by-username';
import { DeleteByUsername$Params } from '../fn/user/delete-by-username';
import { DeleteRes } from '../models/delete-res';
import { updatePasswordByUsername } from '../fn/user/update-password-by-username';
import { UpdatePasswordByUsername$Params } from '../fn/user/update-password-by-username';
import { UpdateRoleRes } from '../models/update-role-res';
import { updateRoleToCaptain } from '../fn/user/update-role-to-captain';
import { UpdateRoleToCaptain$Params } from '../fn/user/update-role-to-captain';
import { updateRoleToManager } from '../fn/user/update-role-to-manager';
import { UpdateRoleToManager$Params } from '../fn/user/update-role-to-manager';
import { updateRoleToUser } from '../fn/user/update-role-to-user';
import { UpdateRoleToUser$Params } from '../fn/user/update-role-to-user';
import { updateUserById } from '../fn/user/update-user-by-id';
import { UpdateUserById$Params } from '../fn/user/update-user-by-id';
import { updateUserByUsername } from '../fn/user/update-user-by-username';
import { UpdateUserByUsername$Params } from '../fn/user/update-user-by-username';
import { updateUsername } from '../fn/user/update-username';
import { UpdateUsername$Params } from '../fn/user/update-username';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateUserByUsername()` */
  static readonly UpdateUserByUsernamePath = '/api/user/update/byUsername/{username}';

  /**
   * Update user by username.
   *
   * Update a user by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserByUsername()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserByUsername$Response(params: UpdateUserByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateUserByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user by username.
   *
   * Update a user by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserByUsername$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserByUsername(params: UpdateUserByUsername$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateUserByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updateUserById()` */
  static readonly UpdateUserByIdPath = '/api/user/update/byId/{id}';

  /**
   * Update user by ID.
   *
   * Update a user by their unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserById()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserById$Response(params: UpdateUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user by ID.
   *
   * Update a user by their unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUserById$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserById(params: UpdateUserById$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `createUser()` */
  static readonly CreateUserPath = '/api/user/create';

  /**
   * Create user.
   *
   * Create a new user.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: CreateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return createUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Create user.
   *
   * Create a new user.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: CreateUser$Params, context?: HttpContext): Observable<User> {
    return this.createUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `updateRoleToUser()` */
  static readonly UpdateRoleToUserPath = '/api/user/update/{username}/user';

  /**
   * Update user's role to user by username.
   *
   * Update a user's role to user by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRoleToUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRoleToUser$Response(params: UpdateRoleToUser$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateRoleRes>> {
    return updateRoleToUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user's role to user by username.
   *
   * Update a user's role to user by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRoleToUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRoleToUser(params: UpdateRoleToUser$Params, context?: HttpContext): Observable<UpdateRoleRes> {
    return this.updateRoleToUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateRoleRes>): UpdateRoleRes => r.body)
    );
  }

  /** Path part for operation `updateRoleToManager()` */
  static readonly UpdateRoleToManagerPath = '/api/user/update/{username}/manager';

  /**
   * Update user's role to manager by username.
   *
   * Update a user's role to manager by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRoleToManager()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRoleToManager$Response(params: UpdateRoleToManager$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateRoleRes>> {
    return updateRoleToManager(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user's role to manager by username.
   *
   * Update a user's role to manager by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRoleToManager$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRoleToManager(params: UpdateRoleToManager$Params, context?: HttpContext): Observable<UpdateRoleRes> {
    return this.updateRoleToManager$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateRoleRes>): UpdateRoleRes => r.body)
    );
  }

  /** Path part for operation `updateRoleToCaptain()` */
  static readonly UpdateRoleToCaptainPath = '/api/user/update/{username}/captain';

  /**
   * Update user's role to captain by username.
   *
   * Update a user's role to captain by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRoleToCaptain()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRoleToCaptain$Response(params: UpdateRoleToCaptain$Params, context?: HttpContext): Observable<StrictHttpResponse<UpdateRoleRes>> {
    return updateRoleToCaptain(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user's role to captain by username.
   *
   * Update a user's role to captain by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateRoleToCaptain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateRoleToCaptain(params: UpdateRoleToCaptain$Params, context?: HttpContext): Observable<UpdateRoleRes> {
    return this.updateRoleToCaptain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UpdateRoleRes>): UpdateRoleRes => r.body)
    );
  }

  /** Path part for operation `updateUsername()` */
  static readonly UpdateUsernamePath = '/api/user/update/username/{id}';

  /**
   * Update user's username by ID.
   *
   * Update a user's username by their unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUsername()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUsername$Response(params: UpdateUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updateUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user's username by ID.
   *
   * Update a user's username by their unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUsername$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUsername(params: UpdateUsername$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updateUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `updatePasswordByUsername()` */
  static readonly UpdatePasswordByUsernamePath = '/api/user/update/password/{username}';

  /**
   * Update user's password by username.
   *
   * Update a user's password by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePasswordByUsername()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePasswordByUsername$Response(params: UpdatePasswordByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<ConfirmRes>> {
    return updatePasswordByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Update user's password by username.
   *
   * Update a user's password by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePasswordByUsername$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePasswordByUsername(params: UpdatePasswordByUsername$Params, context?: HttpContext): Observable<ConfirmRes> {
    return this.updatePasswordByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<ConfirmRes>): ConfirmRes => r.body)
    );
  }

  /** Path part for operation `deleteByUsername()` */
  static readonly DeleteByUsernamePath = '/api/user/delete/byUsername/{username}';

  /**
   * Delete user by username.
   *
   * Delete a user by their username.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteByUsername()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByUsername$Response(params: DeleteByUsername$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteByUsername(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete user by username.
   *
   * Delete a user by their username.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteByUsername$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteByUsername(params: DeleteByUsername$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteByUsername$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

  /** Path part for operation `deleteById()` */
  static readonly DeleteByIdPath = '/api/user/delete/byId/{id}';

  /**
   * Delete user by ID.
   *
   * Delete a user by their unique identifier.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById$Response(params: DeleteById$Params, context?: HttpContext): Observable<StrictHttpResponse<DeleteRes>> {
    return deleteById(this.http, this.rootUrl, params, context);
  }

  /**
   * Delete user by ID.
   *
   * Delete a user by their unique identifier.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById(params: DeleteById$Params, context?: HttpContext): Observable<DeleteRes> {
    return this.deleteById$Response(params, context).pipe(
      map((r: StrictHttpResponse<DeleteRes>): DeleteRes => r.body)
    );
  }

}
