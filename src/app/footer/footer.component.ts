import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  footer :any = {}

  skeletonStatus: boolean = true;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchData('footer', 'footer', () => {
    this.footer = this.dataService.getData();
    setTimeout(() => {
      this.skeletonStatus = false;
    }, 2000);
    });
  }
}
