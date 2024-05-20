import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signup: SignUp;
  
  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.signup = new SignUp();
  }

  onSignUp() {
    this.authService.userSignup(this.signup).subscribe((res:any) => {
      if(res.message) {
        this.toastr.success(res.message);
        this.authService.setToken(res.token);
        this.authService.setUser(res.user);
      } else {
        console.log(res.error);
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