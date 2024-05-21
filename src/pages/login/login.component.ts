import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink, RouterLinkActive, LoaderComponent, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit{
  login: Login;
  isLoading: boolean = false;
  isLoginUser: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.login = new Login();
  }

  ngOnInit(): void {
    this.isLoading = true;
    setInterval(() => {
      this.isLoading = false;
    }, 1000);
  }

  onLogin() {
    this.isLoginUser = true;
    this.authService.userLogin(this.login).subscribe({
      next: (response) => {
        this.login = new Login();
        this.toastr.success(response.message);
        this.router.navigateByUrl('/pages/auth-user');
      }, error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred');
        console.log(error);
      }
    });
    setInterval(() => {
      this.isLoginUser = false;
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