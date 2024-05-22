import { HttpClientModule } from '@angular/common/http';
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

export class LoginComponent{
  login: Login;
  isLoading: boolean = false;
  
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.login = new Login();
  }

  onLogin() {
    this.isLoading = true;
    this.authService.userLogin(this.login).subscribe({
      next: (response) => {
        this.authService.setToken(response.token, response.user);
        this.login = new Login();
        this.toastr.clear();
        this.toastr.success(response.message);
        this.router.navigateByUrl('/dashboard');
      }, error: (error) => {
        this.toastr.error(error.error.message || error.error.error || 'An error occurred');
      }
    });
    setInterval(() => {
      this.isLoading = false;
    }, 1000);
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