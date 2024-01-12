import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-miniloader',
  templateUrl: './miniloader.component.html',
  styleUrls: ['./miniloader.component.css']
})
export class MiniloaderComponent {

  miniLoader: any = []

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.fetchData('miniLoader', 'miniLoader', () => {
    this.miniLoader= this.dataService.getData();
    });
  }

}
