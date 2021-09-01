import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AvatarDetails, HomeComponent } from '../home/home.component';
import { SigninAndSignupService } from '../service/signin-and-signup.service';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  UserId: any;
  errorList:any;
  StaffName = "suthan";
  avatar:AvatarDetails = new AvatarDetails();
  isEdit:boolean = false;
  approvedByDetails=[];
  notificationCount: any;
  staffdata=[];
  approveLeaveDetailId: any;
  constructor(private router:Router,public staffdetails : SigninAndSignupService,) { }

  ngOnInit(): void {
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
     //get assigned leave details for approve
     this.getAssignedLeaveDetailsForApprove();
     //get all stafs
     this.getAllStaffs();
  }
  getAssignedLeaveDetailsForApprove(){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.staffdetails.getApproveLeaves(payLoad.jti).subscribe(
      (res:any)=>{
        console.log(res)
        this.approvedByDetails=res.data;
        this.notificationCount=res.total;
        console.log(this.approvedByDetails)
        
        console.log(this.notificationCount)
      },
      err=>{
        console.log(err)
      }
    );
  }
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }
  //file uploading
  onAvatarUpdate(avatarform:NgForm){
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    console.log(payLoad);
    this.avatar.UserId=payLoad.jti;
    this.UserId=payLoad.jti;
    // console.log($event.target.files[0])
    console.log(avatarform.value);
    const formData: FormData = new FormData();
    formData.append('MyFile',this.avatar.MyFile)
    formData.append('UserId',this.UserId);
    this.staffdetails.CreateAvatar(formData).subscribe(
      (res:any)=>{
        console.log(res.data)
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

    // this.approvedByDetails.fromDate = new Date(event);
    // this.approvedByDetails.toDate = new Date(event);
  }
  getAllStaffs(){
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
  onLeaveApproveUpdate(approvalform:NgForm){
    // approvalform.value.Id=this.approveLeaveDetailId;
    this.staffdetails.ApproveLeave(approvalform.value,this.approveLeaveDetailId).subscribe(
      (res:any)=>{
        this.staffdata= res.data;
        console.log(res)
        console.log(this.staffdata)
      },
      err=>{
        
          console.log(err)
        
      }
    );
    console.log(approvalform.value)
  }
  setLeaveId(id){
    this.approveLeaveDetailId=id;

  }

}
