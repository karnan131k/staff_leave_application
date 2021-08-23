import { Component, OnInit } from '@angular/core';
import { SigninAndSignupService } from '../service/signin-and-signup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public services:SigninAndSignupService) { }

  ngOnInit(): void {
  }

}
