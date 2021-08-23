import { Component, OnInit } from '@angular/core';
// import * as internal from 'stream';
import { SigninAndSignupService } from '../service/signin-and-signup.service';
export class StaffModel{
  id?:any;
  firstName:String;
  lastName:String;
  phoneNumber:String;
  address:String;
  dob:Date;
  casualLeave:DoubleRange
  annualLeave:DoubleRange
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  staffdata:any=[];
  constructor(public staffdetails : SigninAndSignupService) { }
  ngOnInit(): void {
    console.log('hi');
    this.staffdetails.GetAll().subscribe(
      (res:any)=>{
        this.staffdata= res.data;
        console.log(res)
        console.log(this.staffdata)
      },
      err=>{
        if(err.status == 401){
          console.log(err)
        }
      }
    );
  }
 
}
