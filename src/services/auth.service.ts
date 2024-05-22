import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:5000/";

  constructor(private httpClient: HttpClient, private router: Router) {}

  setToken(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  setLocalUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getLocalData() {
    if (typeof localStorage === 'undefined') {
      return null;
    } else {
      const token = localStorage.getItem('token');
      const data = localStorage.getItem('user');
      const user = data ? JSON.parse(data) : null;
      return {token, user};
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  isAuthorized() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if(token && user) {
        return { token, user };
      }else if(!token || !user) {
        this.logout();
        return {};
      }else {
        return {};
      }
    }else {
      return {};
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


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

  updateProfile(token: any, userData: any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.patch<any>(this.apiUrl + `api/user-update`, userData, {headers});
  }

  deleteUser(id: any){
    return this.httpClient.delete<any>(this.apiUrl + `api/deleteUser/${id}`);
  }

  changePassword(token: any, userData: any){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.patch<any>(this.apiUrl + 'user/change-password', userData, {headers});
  }
}
