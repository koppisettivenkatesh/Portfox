import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private data: any = {};

  constructor(private server: ServerService) {}

  fetchData(sessionKey: string, dataKey: string, callback: () => void) {
    this.data = {};
      this.server.getData().pipe(
        catchError((err) => {
          alert('server Error');
          return throwError('Server Error');
        })
      ).subscribe((response) => {
        this.data = { ...response[0][dataKey] };
        callback();
      });
  }

  getData() {
    return this.data;
  }

}
