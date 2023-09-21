import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor(private route: Router, private server: ServerService) { }


  loaderUrl = ""
  loaderStatus : boolean = true

  ngOnInit() {
    this.server.getData()
      .pipe(
        catchError(err => {
          return throwError(err + "Server Error");
        })
    ).subscribe((data => {
      this.loaderUrl = data[0].loader.img;
      this.loaderStatus = false
      if(!this.loaderStatus){
        setTimeout(() => {
          this.route.navigate(['home'])
        }, 4000);
      }
    }))

  }
}