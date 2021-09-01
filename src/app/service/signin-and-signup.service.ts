import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffModel } from '../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SigninAndSignupService {

  loginUserName="";
  logiUserRole="";
  profileImage;

  constructor(private http: HttpClient) { }
  readonly profileBase='https://localhost:44368/';

  readonly baseURI = 'https://localhost:44368/api';

  login(formData):Observable<any>{
    console.log(formData)
    console.log(this.http.post(this.baseURI + '/Authentication/Login',formData))
    return this.http.post('https://localhost:44368/api/Authentication/Login',formData);
  }
  GetAll():Observable<StaffModel[]>{
    
    return this.http.get<StaffModel[]>(this.baseURI + '/Staff/Index');
  }
  register(formData):Observable<any>{
    return this.http.post(this.baseURI + '/Authentication/Register',formData)
  }
  GetAllUser():Observable<any>{
    return this.http.get<StaffModel[]>(this.baseURI + '/UserProfile/getall-users');
  }

  CreateStaff(formData):Observable<any>{
    return this.http.post(this.baseURI + '/Staff/Create',formData)
  }
 
  CreateLeave(formData):Observable<any>{
    return this.http.post('https://localhost:44368/api/Leave/Create',formData)
  }
  GetLeaveDetailsBaesdOnStaffId(id:any):Observable<any>{
    return this.http.get<StaffModel[]>(this.baseURI + '/Leave/GetLeaveDetailsBaesdOnStaffId' + "/" + id);
  }
  roleMatch(allowedRoles:any):boolean{
    var isMatch= false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRoles = payLoad.given_name;
    console.log(payLoad);
    console.log(payLoad.given_name);
    console.log(userRoles);
    allowedRoles.forEach(element=>{
      if(userRoles==element){
        this.logiUserRole=element;
        isMatch=true;
        return false;
      }
    });
    return isMatch;
  }
  CreateAvatar(formData):Observable<any>{
    return this.http.post('https://localhost:44368/api/FileManager',formData)
  }
  GetAvatar(id:any):Observable<any>{
    return this.http.get<StaffModel[]>(this.baseURI + '/FileManager/GetUserAvatar' + "/" + id);
  }
  UpdateLeave(formData, id):Observable<any>{
    return this.http.post('https://localhost:44368/api/Leave/Update' + "/" + id,formData)
  }

  getApproveLeaves(id:any):Observable<any>{
    return this.http.get('https://localhost:44368/api/Leave/Approve' + "/" + id);
  }

  ApproveLeave(formData, id):Observable<any>{
    return this.http.post('https://localhost:44368/api/Leave/Approve' + "/" + id,formData)
  }

}
