import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{
  AdminUser,
  BlockUserRequest,
  ChangeRoleRequest,
  ChangeStatusRequest,
  PageResponse
} from '../../models/admin-user';
@Injectable({
  providedIn: 'root',
})
export class AdminUserService {
  private apiUrl = 'http://localhost:8080/api/admin/users';

  constructor(private http: HttpClient){}

  getUsers(page: number = 0, size: number = 10): Observable<PageResponse<AdminUser>>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)

    return this.http.get<PageResponse<AdminUser>>(this.apiUrl, {params});
  }

  getUserById(id: number): Observable<AdminUser>{
    return this.http.get<AdminUser>(`${this.apiUrl}/${id}`);
  }

  changeRole(id: number, request: ChangeRoleRequest): Observable<AdminUser>{
    return this.http.patch<AdminUser>(`${this.apiUrl}/${id}/role`, request);
  }
  changeStatus(id: number, request: ChangeStatusRequest): Observable<AdminUser>{
    return this.http.patch<AdminUser>(`${this.apiUrl}/${id}/status`, request);
  }
  blockUser(id: number, request: BlockUserRequest): Observable<AdminUser>{
    return this.http.patch<AdminUser>(`${this.apiUrl}/${id}/block`, request);
  }
  unblockUser(id: number): Observable<AdminUser>{
    return this.http.patch<AdminUser>(`${this.apiUrl}/${id}/restore`,{});
  }

  restoreUser(id: number): Observable<AdminUser>{
    return this.http.patch<AdminUser>(`${this.apiUrl}/${id}/restore`, {});
  }

  deleteUser(id: number): Observable<any>{
  return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
