import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { min } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  mediaStatus: any = {};

  contact :any = {}

  skeletonStatus: boolean = true;
  
  miniLoader : boolean = true

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.miniLoading();
    this.dataService.fetchData('contact', 'contact', () => {
    this.contact = this.dataService.getData();
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

}
