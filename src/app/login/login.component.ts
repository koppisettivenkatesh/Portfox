import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mediaStatus: any = {};

  login:any = {}

  skeletonStatus: boolean = true;

  miniLoader : boolean = true

  loader : string = `
  <svg class="mx-3" width="30" height="30" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
            <stop stop-color="#fff" stop-opacity="0" offset="0%"/>
            <stop stop-color="#fff" stop-opacity=".631" offset="63.146%"/>
            <stop stop-color="#fff" offset="100%"/>
        </linearGradient>
    </defs>
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)">
            <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="2">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite" />
            </path>
            <circle fill="#fff" cx="36" cy="18" r="1">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="0.9s"
                    repeatCount="indefinite" />
            </circle>
        </g>
    </g>
  </svg>`

  regexForEmail = /^[a-zA-Z0-9\.]+@([a-zA-Z]+\.)+[a-zA-Z]{2,4}$/


  constructor(private dataService: DataService , private route : Router) {}

  ngOnInit() {
    this.miniLoading();
    this.dataService.fetchData('login', 'auth', () => {
    this.login = this.dataService.getData();
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

  navigate(url: string) {
    this.route.navigate([`${url}`])
  }

  loginData = {
    email: "",
    password: "",
  }
  onLogin(url: string) {
    const btn = document.getElementById('btn') as HTMLButtonElement
    btn.innerHTML = this.loader
    setTimeout(() => {
      this.route.navigate([`${url}`])
    }, 1500);
  }
}
