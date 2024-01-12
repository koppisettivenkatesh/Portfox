import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { catchError, throwError } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {

  mediaStatus: any = {};

  loaderUrl: any = []

  loaderStatus : boolean = true

  constructor(private dataService: DataService , private route : Router) {}
  ngOnInit() {
    this.dataService.fetchData('loader', 'loader', () => {
    this.loaderUrl= this.dataService.getData();
    });
  }

  onMediaLoad() {
    setTimeout(() => {
      this.route.navigate(['/home'])
      }, 3000);   
  }

}