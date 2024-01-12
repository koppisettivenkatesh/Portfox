import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TemplateComponent } from './template/template.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  { path : '', component: LoaderComponent },
  { path: 'home', component: HeaderComponent },
  { path : 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path : 'login' , component : LoginComponent },
  { path : 'signup' , component : SignupComponent },
  { path : 'template', component : TemplateComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports:
    [RouterModule]
})
export class AppRoutingModule { }
