import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../core/services/event/event.service';
import { IEvent } from '../../core/model/event';
import { ApiResponse } from '../../core/model/api-response';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../core/model/user';
import { Booking, EventBookingMember } from '../../core/model/eventBooking';
import { FormsModule } from '@angular/forms';
import { BookingEventService } from '../../core/services/booking/booking-event.service';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [DatePipe, RouterLink, FormsModule, CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  event!: IEvent;
  eventBooking: IEvent[] = []
  userObj: User | any = new User();
  @ViewChild('bookingModal') bookingModal!: ElementRef;

  eventBookingMember: EventBookingMember = {
    Name: "",
    Age: 0,
    IdentityCard: "",
    CardNo: "",
    ContactNo: "",
  };

  eventBookingObj: Booking = {
    BookingId: 0,
    UserId: 0,
    EventId: 0,
    NoOfTickets: 0,
    EventBookingMembers: []
  };

  constructor(private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private bookingEventService: BookingEventService) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.eventService.getAllEventById(res.id).subscribe((response: ApiResponse) => {
        this.eventBookingObj.EventId = res.id;
        this.loadUserData();
        this.event = response.data;
        this.eventService.getEventBookingByOrganizerId(this.event.organizerId).subscribe((result: ApiResponse) => {
          this.eventBooking = result.data;
        });
      });
    });
  }

  loadUserData() {
    const loginData = localStorage.getItem("loginObjectData");
    if (loginData) {
      this.userObj = JSON.parse(loginData);
      this.eventBookingObj.UserId = this.userObj.userId;
    }
  }

  openBookingModal() {
    if (this.bookingModal) {
      this.bookingModal.nativeElement.style.display = "block";
    }
  }

  closeBookingModal() {
    if (this.bookingModal) {
      this.bookingModal.nativeElement.style.display = "none";
    }
  }

  addMember() {
    this.eventBookingObj.EventBookingMembers.unshift(this.eventBookingMember);
    this.refreshBookingMember();
  }

  refreshBookingMember() {
    this.eventBookingMember = {
      Name: "",
      Age: 0,
      IdentityCard: "",
      CardNo: "",
      ContactNo: "",
    };
  }

  removeMember(index: number) {
    this.eventBookingObj.EventBookingMembers.splice(index, 1);
  }

  bookEventTicket() {
    this.eventBookingObj.NoOfTickets = this.eventBookingObj.EventBookingMembers.length;
    
    this.bookingEventService.bookEvent(this.eventBookingObj).subscribe((res: ApiResponse) => {
      if (res.result) {
        alert("Event booked is successful");
        this.closeBookingModal();
      }
    })
  }


}
