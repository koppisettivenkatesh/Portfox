import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  menuToggle: boolean = true

  onMenuToggle() {
    this.menuToggle = !this.menuToggle
  }

  AuthStatus: boolean = false

  ngOnInit() {
    if (localStorage.getItem("login") != null) {
      this.AuthStatus = true
    } else {
      this.AuthStatus = false
    }
  }
  @Output() onHomeEmitter = new EventEmitter<any>()
  onHome(){
    this.onHomeEmitter.emit(false)
  }
}
