import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../../model/user';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../model/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://freeapi.miniprojectideas.com/api/EventBooking/";

  constructor(private http: HttpClient) { }

  register(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}CreateUser`, user);
  }

  login(lognObj: Login): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}Login`, lognObj); 
  }

}
