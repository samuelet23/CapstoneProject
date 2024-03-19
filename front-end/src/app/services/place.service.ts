import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Province, Town } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  url:string = environment.url
  private http = inject(HttpClient)

  constructor() { }


  getProvinceByName(nameProvince:string):Observable<Province[]>{
    return this.http.get<Province[]>(`${this.url}/open/place/get/province/${nameProvince}`)
  }

}
