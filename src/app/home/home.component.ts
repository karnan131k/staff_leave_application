import { Component, OnInit } from '@angular/core';
import { SigninAndSignupService } from '../service/signin-and-signup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public services:SigninAndSignupService) { }

  ngOnInit(): void {
  }

}
