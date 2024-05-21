import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:5000/";

  constructor(private httpClient: HttpClient) {}

  userLogin(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'api/login', data);
  }

  userSignup(data: any) {
    console.log(data)
    return this.httpClient.post<any>(this.apiUrl + 'api/signup', data);
  }

  forgotPassword(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'user/forgot-password-request', data);
  }

  resetPassword(data: any) {
    return this.httpClient.put<any>(this.apiUrl + 'user/reset-forgot-password', data);
  }

  getUsers(){
    return this.httpClient.get<any>(this.apiUrl + 'api/getAllUser');
  }
 
  storeContact(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'contact/insertContact', data);
  }

  getContactData(){
    return this.httpClient.get<any>(this.apiUrl + 'contact/getContact');
  }

}
