import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:5000/";
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  setToken(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  setLocalUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
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
    this.currentUserSubject.next(null);
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
