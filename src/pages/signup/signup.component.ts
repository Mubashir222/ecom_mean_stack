import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent{
  signup: SignUp;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.signup = new SignUp();
  }

  onSignUp() {
    this.authService.userSignup(this.signup).subscribe({
      next: (response) => {
        this.signup = new SignUp();
        this.toastr.success(response.message);
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred');
      }
    });
  }
}

export class SignUp {
  username: string;
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.username = '';
    this.password = '';
  }
}