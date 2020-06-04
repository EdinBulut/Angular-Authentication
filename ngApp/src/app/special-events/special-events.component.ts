import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents = [];

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(
        data => {
        this.specialEvents = data;
        // console.log(this.specialEvents);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
      );
  }

}
