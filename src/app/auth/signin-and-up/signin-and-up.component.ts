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
  }
  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
    (res:any)=>{
      localStorage.setItem('token',res.token);
      console.log(res.user)
      this.service.loginUserName=res.user;
      this.router.navigateByUrl('/home');
    },
    err=>{
      if(err.status == 401){
        console.log(err)
      }
    }
    );
  }

}
