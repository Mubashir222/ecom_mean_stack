import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  apiUrl = "http://localhost:5000/";

  constructor(private httpClient: HttpClient) {}

  userLogin(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'api/login', data);
  }

  userSignup(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'api/signup', data);
  }

  forgotPassword(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'api/forgot-password', data);
  }


  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setUser(user: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  getUser(): any | null {
    if (typeof localStorage !== 'undefined') {
      const userString = localStorage.getItem(this.userKey);
      return userString ? JSON.parse(userString) : null;
    }
    return null;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    }
  }

}
