import { Component, inject, Inject, OnInit } from '@angular/core';
import { User } from '../../core/model/user';
import { BookingEventService } from '../../core/services/booking/booking-event.service';
import { ApiResponse } from '../../core/model/api-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {

  userObj: User | any = new User();
  bookingEventService = inject(BookingEventService);
  bookingList: any[] = [];

  ngOnInit(): void {
    this.loadUserData()
  }

  loadUserData() {
    const loginData = localStorage.getItem("loginObjectData");
    if (loginData) {
      this.userObj = JSON.parse(loginData);
      this.getAllBookingEventByCustomer();
    }
  }

  getAllBookingEventByCustomer() {

    this.bookingEventService.getAllBookingEvent(this.userObj.userId).subscribe((res: ApiResponse) => {
      this.bookingList = res.data;
    })
  }
}
