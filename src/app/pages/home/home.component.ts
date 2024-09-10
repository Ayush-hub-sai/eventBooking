import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event/event.service';
import { ApiResponse } from '../../core/model/api-response';
import { RouterLink } from '@angular/router';
import { IEvent } from '../../core/model/event';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  eventList: IEvent[] = [];
  eventService = inject(EventService);

  ngOnInit(): void {
    this.getAllEventList()
  }

  getAllEventList() {
    this.eventService.getAllEvent().subscribe((res: ApiResponse) => {
      this.eventList = res.data;
    });
  }
}
