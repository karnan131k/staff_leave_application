import { Component, OnInit } from '@angular/core';
import '@fortawesome/fontawesome-free/js/all.js';

@Component({
  selector: 'app-signin-and-up',
  templateUrl: './signin-and-up.component.html',
  styleUrls: ['./signin-and-up.component.css']
})
export class SigninAndUpComponent implements OnInit {

  constructor() { }
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

}
