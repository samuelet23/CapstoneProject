import { User } from './../api/models/user';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfirmRes, DeleteRes, UpdatePasswordDto, UpdateRoleRes, UploadConfirm, UserUpdateDto } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.url
  private route = inject(ActivatedRoute)
  private http = inject(HttpClient)

  constructor() { }


  getAllUSer():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/open/user/get/all`)
  }

  getUserByUsername(username:string):Observable<User>{
    return this.http.get<User>(`${this.url}/open/user/get/byUsername/${username}`)
  }
  uploadLogoProfile(username:string, file: File):Observable<UploadConfirm>{
    const img: FormData = new FormData();
    img.append('file', file)
    return this.http.patch<UploadConfirm>(`${this.url}/open/upload/logo-profile/${username}`,img)
  }
  updateCredentialUser(username:string, userUpdate: UserUpdateDto):Observable<User>{
    return this.http.put<User>(`${this.url}/user/update/byUsername/${username}` , userUpdate)
  }
  updatePassword(username:string, updatePassword: UpdatePasswordDto):Observable<ConfirmRes>{
    return this.http.patch<ConfirmRes>(`${this.url}/user/update/password/${username}`, updatePassword)
  }
  updateUsername(id:string):Observable<ConfirmRes>{
    return this.http.patch<ConfirmRes>(`${this.url}/user/update/username/${id}`,{})
  }
  updateUserToUser(username:string):Observable<UpdateRoleRes>{
    return this.http.patch<UpdateRoleRes>(`${this.url}/user/update/${username}/user`,{})
  }
  updateUserToCoordinator(username:string):Observable<UpdateRoleRes>{
    return this.http.patch<UpdateRoleRes>(`${this.url}/user/update/${username}/coordinator`,{})
  }
  updateUserToManager(username:string):Observable<UpdateRoleRes>{
    return this.http.patch<UpdateRoleRes>(`${this.url}/user/update/${username}/manager`,{})
  }

  deleteByUsername(username:string):Observable<DeleteRes>{
    return this.http.delete<DeleteRes>(`${this.url}/user/delete/byUsername/${username}`)
  }

}
