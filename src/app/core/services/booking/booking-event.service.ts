import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../model/api-response';
import { Observable } from 'rxjs';
import { Booking } from '../../model/eventBooking';

@Injectable({
  providedIn: 'root'
})
export class BookingEventService {

  apiUrl = "https://freeapi.miniprojectideas.com/api/EventBooking/";

  constructor(private http: HttpClient) { }

  bookEvent(eventBookingObj: Booking): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}BookEvent`, eventBookingObj);
  }

  getAllBookingEvent(id: any): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}GetBookingsByCustomer?customerId=${id}`);
  }

}
