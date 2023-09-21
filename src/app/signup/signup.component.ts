import { Component } from '@angular/core';
import { ServerService } from '../server.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  miniLoader : boolean = true


  skeletonStatus : boolean = true;
  
  mediaStatus: { [key: string]: boolean }  = { googleAuthImage: true , img1: true , img2: true , img3: true , img4: true };

  signup: { googleAuthImage: string; img1: string; img2: string; img3: string; img4: string; } = { googleAuthImage: '', img1: '', img2: '', img3: '', img4: '' };

  constructor(private server: ServerService ,private route : Router) {
    if (sessionStorage.getItem('authImages') == null) {
      this.server.getData()
        .pipe(
          catchError(err => {
            return throwError(err + "Server Error");
          }),
        ).subscribe((data) => {
          sessionStorage.setItem("authImages", JSON.stringify(data[0].authImages ));
          const { googleAuthImage , img1, img2, img3 ,img4 } = data[0].authImages;
          this.signup = {
            googleAuthImage: googleAuthImage,
            img1: img1,
            img2: img2,
            img3: img3,
            img4 : img4
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
    if (sessionStorage.getItem('authImages') != null) {
      const sessionDataString = sessionStorage.getItem('authImages');
      const sessionData = JSON.parse(sessionDataString || 'null');
      this.signup = {
        googleAuthImage : sessionData. googleAuthImage,
        img1: sessionData.img1,
        img2: sessionData.img2,
        img3: sessionData.img3,
        img4 : sessionData.img4
      };
    }
  } 
  onMediaLoad(id: string) {
    this.mediaStatus[id] = false;
  }
  navigate(url: string) {
    this.route.navigate([`${url}`])
  }
}
