import { IEvent, ISession } from './event.model';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EventService {
  serverUrl = 'https://voboril-node-playground.herokuapp.com';
  constructor(private http: HttpClient) {

  }
  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.serverUrl + '/api/events')
      .pipe(catchError(this.handleError<IEvent[]>('getEvents', [])));
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(this.serverUrl + '/api/events/' + id)
      .pipe(catchError(this.handleError<IEvent>('getEvent')));
  }
  saveEvent(event): Observable<IEvent> {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<IEvent>(this.serverUrl + '/api/events', event, options)
      .pipe(catchError(this.handleError<IEvent>('saveEvent')));
  }

  searchSessions(searchTerm: string): Observable<ISession[]> {
    return this.http.get<ISession[]>(this.serverUrl + '/api/sessions/search?search=' + searchTerm)
      .pipe(catchError(this.handleError<ISession[]>('searchSessions', [])));
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
