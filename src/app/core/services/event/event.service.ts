import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../model/api-response';
import { IEvent } from '../../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl = "https://freeapi.miniprojectideas.com/api/EventBooking/";

  constructor(private http: HttpClient) { }

  getAllEvent(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}GetAllEvents`);
  }

  getAllEventById(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}GetEventById?id=${id}`);
  }

  getEventBookingByOrganizerId(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}GetEventsByOrganizer?organizerId=${id}`);
  }
}
