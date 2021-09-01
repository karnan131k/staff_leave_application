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

}
