import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProfileRequest, Profile, UpdateProfileRequest } from '../../models/profile';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/users/me/profile`;

  constructor(private http: HttpClient){}
  getMyProfile(): Observable<Profile>{
    return this.http.get<Profile>(this.apiUrl);
  }
  createMyProfile(request: CreateProfileRequest): Observable<Profile>{
    return this.http.post<Profile>(this.apiUrl, request);
  }
  updateMyProfile(request: UpdateProfileRequest): Observable<Profile>{
    return this.http.patch<Profile>(this.apiUrl, request);
  }
  deleteMyProfile(): Observable<any>{
    return this.http.delete(this.apiUrl);
  }
}
