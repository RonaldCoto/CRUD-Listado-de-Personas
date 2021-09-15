import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoggingService } from '../LoggingService.service';
import { LogingService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LogingService) { }

  ngOnInit(): void {
  }

  login(form : NgForm){
    const email = form.value.email;
    const pass = form.value.password;
    this.loginService.login(email, pass);
    
  }

}
