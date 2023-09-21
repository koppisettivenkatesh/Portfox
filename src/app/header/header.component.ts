import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
  

export class HeaderComponent {

  skeletonStatus: any;
  
  mediaStatus: any ={}
  
  miniLoader: boolean = true
  
  header: any = {};

  constructor(private route: Router, private server: ServerService) {
    this.getSession()
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    if (sessionStorage.getItem('header') == null) {
      this.skeletonStatus = true
      this.server.getData()
        .pipe(
          catchError(err => {
            return throwError(err + "Server Error");
          }),
        ).subscribe((data) => {
          sessionStorage.setItem("header", JSON.stringify(data[0].header));
          const { ...rest } = data[0].header;
          this.header = {
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
    if (sessionStorage.getItem('header') !== null) {
      const sessionDataString = sessionStorage.getItem('header');
      const { ...rest } = JSON.parse(sessionDataString || 'null');
      this.header = {
        ...rest
      };
    }
  }

  onMediaLoad(id: string) {
    this.mediaStatus[id] = false
 }

  tryNow() {
    this.route.navigate(['login']);
  }
}