import { IEvent } from './shared/event.model';
import { ActivatedRoute } from '@angular/router';
import { EventService } from './shared/event.service';
import { Component } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
    template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr>
      <div *ngFor="let event of events" class="col-md-5">
        <event-thumbnail [event]="event"></event-thumbnail>
      </div>
    </div>
    `
})
export class EventsListComponent {
  events: IEvent[];
  constructor(private eventService: EventService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.events = this.route.snapshot.data['events'];
  }

}
