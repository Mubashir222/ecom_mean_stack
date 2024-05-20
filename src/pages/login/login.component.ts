import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  login: Login;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.login = new Login();
  }

  onLogin() {
    this.http.post('http://localhost:5000/api/login', this.login).subscribe((res:any) => {
      if(res.message){
        this.toastr.success(res.message);
        this.authService.setToken(res.token);
        this.authService.setUser(res.user);
        this.router.navigateByUrl('/pages/auth-user');
      }else {
        console.log(res.error);
      }
    });
  }
}

export class Login {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}