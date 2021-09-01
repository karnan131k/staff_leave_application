import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninAndSignupService } from 'src/app/service/signin-and-signup.service';


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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // staffdata:any=[];
  staffdata:any=[];
  errorList:any;
  staff:StaffModel= new StaffModel();
  // leave:LeaveModel= new LeaveModel();
  isEdit:boolean = false;
  users: any;
  userId:number;
  casualLeave: number;
  annualLeave: number;
  constructor(private router:Router, private userdetails:SigninAndSignupService) { }

  ngOnInit(): void {
    console.log('hi');
    this.userdetails.GetAllUser().subscribe(
      (res:any)=>{
        this.users= res.data;
        console.log(res)
        console.log(this.users)
      },
      err=>{
        if(err.status == 401){
          console.log(err)
        }
      }
    );
  }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  onSubmit(form:NgForm){
    form.value.userId = this.userId;
    form.value.CasualLeave=this.casualLeave;
    form.value.AnnualLeave=this.annualLeave;
    console.log(form.value)
    this.userdetails.CreateStaff(form.value).subscribe(
      (res:any)=>{
        this.router.navigateByUrl('/home');
        alert(res.message)
        console.log(res)
      },
      err=>{
        console.log(err)
        if(err.status == 401){
          console.log(err)
        }
      }
    );
  }
  sendId(id){
    this.userId=id;
    this.casualLeave=7;
    this.annualLeave=14;
  }

}
