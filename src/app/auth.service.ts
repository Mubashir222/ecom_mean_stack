// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private tokenKey = 'auth_token';
//   private userKey = 'auth_user';

//   constructor() {}

//   setToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem(this.tokenKey);
//   }

//   setUser(user: any): void {
//     localStorage.setItem(this.userKey, JSON.stringify(user));
//   }

//   getUser(): any | null {
//     const userString = localStorage.getItem(this.userKey);
//     return userString ? JSON.parse(userString) : null;
//   }

//   logout(): void {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.userKey);
//   }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';

  constructor() {}

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
