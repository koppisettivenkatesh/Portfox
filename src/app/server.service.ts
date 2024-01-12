import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private apiUrl = 'https://serverportfolio.pythonanywhere.com/portfox'

  constructor(private http: HttpClient) { }
  
  getData(): Observable<any>{
    return this.http.get(this.apiUrl)
  }


}
