import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {

  mediaStatus: any = {};

  about :any = {}

  skeletonStatus: boolean = true;
  
  miniLoader : boolean = true

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.miniLoading();
    this.dataService.fetchData('about', 'about', () => {
    this.about = this.dataService.getData();
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
