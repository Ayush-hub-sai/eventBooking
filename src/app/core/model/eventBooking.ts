export interface EventBookingMember {
    // BookingMemberId: number;
    // BookingId: number;
    Name: string;
    Age: number;
    IdentityCard: string;
    CardNo: string;
    ContactNo: string;
  }
  
  export interface Booking {
    BookingId: number;
    UserId: number;
    EventId: number;
    NoOfTickets: number;
    EventBookingMembers: EventBookingMember[];
  }
  