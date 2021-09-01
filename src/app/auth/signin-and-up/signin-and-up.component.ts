import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import '@fortawesome/fontawesome-free/js/all.js';
import { SigninAndSignupService } from 'src/app/service/signin-and-signup.service';

@Component({
  selector: 'app-signin-and-up',
  templateUrl: './signin-and-up.component.html',
  styleUrls: ['./signin-and-up.component.css']
})
export class SigninAndUpComponent implements OnInit {

  formModel={
    UserName:"",
    Password:''
  }
  registerModel={
    username:"",
    email:"",
    password:""
  }
  errorMessage: string;
  errorRegisterMessage: string;
  registersuccessmessage: string;
  
  constructor(private service:SigninAndSignupService, private router:Router) { }
  signup($event){
    $event.preventDefault();
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
  }
  signin($event){
    $event.preventDefault();
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  
  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.router.navigateByUrl('/home');
    }else{
      this.router.navigateByUrl('/');
    }
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
    (res:any)=>{
      localStorage.setItem('token',res.token);
      console.log(res.user,res.token)
      this.service.loginUserName=res.user;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      if (payLoad.given_name=="Admin") {
        this.router.navigateByUrl('/home');
      }else if(payLoad.given_name=="User"){
        this.router.navigateByUrl('/user-home');
      }
      
    },
    err=>{
      if(err.status == 401){
        this.errorMessage = "username or password is invalid"
        console.log(err.error)
      }
    }
    );
  }
  onRegister(form:NgForm){
    console.log(form.value);
    this.service.register(form.value).subscribe(
      (res:any)=>{
        console.log(res)
        this.registersuccessmessage = res.message;
        setTimeout(() => {
          this.registersuccessmessage="";
        }, 1000);
      },
      err=>{
        console.log(err)
        if(err.status == 401){
          this.errorRegisterMessage = "Registration is invalid"
          console.log(err.error)
          setTimeout(() => {
            this.errorRegisterMessage="";
          }, 1000);
        }
      }
    )
  }

}
