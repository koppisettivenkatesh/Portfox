import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  skeletonStatus: any;
  
  mediaStatus: boolean = true;

  miniLoader : boolean = true


  contact: { img: string; title: string; content: string; } = { img: '', title: '', content: '' };

  constructor(private server: ServerService) {
    if (sessionStorage.getItem('contact') == null) {
      this.skeletonStatus = true
      this.server.getData()
        .pipe(
          catchError(err => {
            return throwError(err + "Server Error");
          }),
        ).subscribe((data) => {
          sessionStorage.setItem("contact", JSON.stringify(data[0].contact));
          const { img, title, content } = data[0].contact;
          this.contact = {
            img: img,
            title: title,
            content: content
          };
          setTimeout(() => {
            this.miniLoader = false
            this.skeletonStatus = false;
          }, 2000);
        });
    } else {
      setTimeout(() => {
        this.miniLoader = false
        this.skeletonStatus = false;
      }, 2000);
    }
  }
  ngOnInit() {
    if (sessionStorage.getItem('contact') != null) {
      const sessionDataString = sessionStorage.getItem('contact');
      const sessionData = JSON.parse(sessionDataString || 'null');
      this.contact = {
        img: sessionData.img,
        title: sessionData.title,
        content: sessionData.content,
      };
    }
  } 
  onMediaLoad() {
    this.mediaStatus = false;
  }
}