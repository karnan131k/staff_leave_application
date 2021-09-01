import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
export class LeaveModel{
  // id?:any;
  fromDate:Date;
  toDate:Date;
  comments:String;
  approvedBy:DoubleRange;
  // status:DoubleRange;
  staffId:string;
  LeaveType:string;
}
export class LeaveDetails{
  id?:any;
  fromDate:Date;
  toDate:Date;
  comments:String;
  approvedBy:DoubleRange;
  status:DoubleRange;
  staffId:string;
  leaveType:any;
}
export class AvatarDetails{
  UserId:string;
  MyFile:File;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todayDate: Date;
  StaffId: any;
  StaffName: any;
  approvedBy: string;
  leavestatus: string;
  usersdata: any;
  commentsvalue:string="sick";
  UserId: any;
  editProfileStaffId: any;

  constructor(public staffdetails : SigninAndSignupService, private router:Router) { }
  staffdata:any=[];
  errorList:any;
  staff:StaffModel= new StaffModel();
  leave:LeaveModel= new LeaveModel();
  applyLeaves:LeaveDetails = new LeaveDetails();
  avatar:AvatarDetails = new AvatarDetails();
  isEdit:boolean = true;
 
  
  ngOnInit(): void {
    this.todayDate = new Date();
    console.log(this.todayDate);
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
      /// get user avatar
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      this.staffdetails.GetAvatar(payLoad.jti).subscribe(
        (res:any)=>{
          console.log(res.data[0].fileName)
          this.staffdetails.profileImage=this.staffdetails.profileBase+res.data[0].fileName
          
        },
        err=>{
          console.log(err)
        }
      );

    // this.staffdetails.GetAllUser().subscribe(
    //   (res:any)=>{
    //     this.usersdata= res.data;
    //     console.log(res)
    //     console.log(this.usersdata)
    //   },
    //   err=>{
    //     if(err.status == 401){
    //       console.log(err)
    //     }
    //   }
    // );

  }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  onSubmit(form:NgForm){
    if(!this.isEdit){
      console.log(form.value);
    }
  }
  onLeaveSubmit(form:NgForm){
    form.value.StaffId=this.StaffId;
    console.log(form.value.StaffId)
    console.log(form.value);
    
    this.staffdetails.CreateLeave(form.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.leave;
      },
      err=>{
        this.errorList=err.error.errors
        console.log(err)
        console.log(this.errorList)
      }
    );
  }

  setId(staffId,name){
    this.StaffName = name;
    this.StaffId= staffId;
    console.log(this.StaffId);
  }
  setStaffId(staffId,name){
    this.StaffName = name;
    this.editProfileStaffId=staffId;
    console.log(staffId)
    this.staffdetails.GetLeaveDetailsBaesdOnStaffId(staffId).subscribe(
      (res:any)=>{
        this.applyLeaves=res.data;
        console.log(res.data)
        console.log(this.applyLeaves)
      },
      err=>{
        console.log(err)
      }
    );
  }
  onLeaveEdit(editform:NgForm,id){
    editform.value.Status=0;
    editform.value.StaffId=this.editProfileStaffId;
    console.log(editform.value);
    console.log(id);
    this.staffdetails.UpdateLeave(editform.value,id).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.statusCode){
          alert("Leave Detail updated Successfully")
        }
      },
      err=>{
        
        console.log(err)
      }
    );
    // this.isEdit=true;
  }
  //file uploading
  onAvatarUpdate(avatarform:NgForm){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    console.log(payLoad);
    this.avatar.UserId=payLoad.jti;
    this.UserId=payLoad.jti;
    const formData: FormData = new FormData();
    formData.append('MyFile',this.avatar.MyFile)
    formData.append('UserId',this.UserId);
    console.log(formData);
    this.staffdetails.CreateAvatar(formData).subscribe(
      (res:any)=>{
        console.log(res.statusCode)
        if(res.statusCode){
          this.router.navigateByUrl('/home');
          alert("Profile Image updated Successfully")
        }
      },
      err=>{
        
        console.log(err)
      }
    );
  }
  handleFileInput(e:any){
    this.avatar.MyFile=e?.target?.files[0];
    console.log(this.avatar.MyFile);
  }
  updatedate(event) {

    this.applyLeaves.fromDate = new Date(event);
    this.applyLeaves.toDate = new Date(event);
  }
  updateButtonStatus(){
    this.isEdit=false;
  }
 
}
