import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffModel } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SigninAndSignupService {

  loginUserName="";

  constructor(private http: HttpClient) { }
  readonly baseURI = 'https://localhost:44368/api';

  login(formData):Observable<any>{
    console.log(formData)
    console.log(this.http.post(this.baseURI + '/Authentication/Login',formData))
    return this.http.post('https://localhost:44368/api/Authentication/Login',formData);
  }
  GetAll():Observable<StaffModel[]>{
    
    return this.http.get<StaffModel[]>(this.baseURI + '/Staff/Index');
  }
}
