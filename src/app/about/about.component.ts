import { Component } from '@angular/core';
import { ServerService } from '../server.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  skeletonStatus: any;
  
  mediaStatus: any = {}

  miniLoader : boolean = true


  about: any ={}

  constructor(private server: ServerService) {
    this.fetchData();
  }

  ngOnInit() {
    this.getSession();
  }

  fetchData() {
    if (sessionStorage.getItem('about') == null) {
      this.skeletonStatus = true
      this.server.getData()
        .pipe(
          catchError(err => {
            return throwError(err + "Server Error");
          }),
        ).subscribe((data) => {
          sessionStorage.setItem("about", JSON.stringify(data[0].about));
          const { ...rest } = data[0].about;
          this.about = {
            ...rest
          };
          setTimeout(() => {
            this.miniLoader = false
            setTimeout(() => {
              this.skeletonStatus = false;
            },2000)
          }, 1000);
        });
    } else {
      setTimeout(() => {
        this.miniLoader = false
        setTimeout(() => {
          this.skeletonStatus = false;
        },2000)
      }, 1000);
    }
  }

  getSession() {
    if (sessionStorage.getItem('contact') != null) {
      const sessionDataString = sessionStorage.getItem('about');
      const { ...rest } = JSON.parse(sessionDataString || 'null');
      this.about = {
        ...rest
      };
    }
  }
  
  onMediaLoad(id: string) {
    this.mediaStatus[id] = false
 }

}
