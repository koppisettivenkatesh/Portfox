import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{

  mediaStatus: any = {};

  header :any = {}

  skeletonStatus: boolean = true;

  miniLoader : boolean = true

  template = false

  constructor(private dataService: DataService , private route : Router) {}

  ngOnInit() {
    this.template = false
    this.miniLoading();
    this.dataService.fetchData('header', 'header', () => {
    this.header = this.dataService.getData();
    setTimeout(() => {
      this.skeletonStatus = false;
    }, 2000);
    });
  }
  miniLoading() {
    setTimeout(() => {
      this.miniLoader = false;
    }, 1000);
  }

  onMediaLoad(id: string) {
    this.mediaStatus[id] = false
  }

  tryNow() {
    this.template = true;
  }
  onHomeEmitter(event :any){
    this.template = event
  }
}
