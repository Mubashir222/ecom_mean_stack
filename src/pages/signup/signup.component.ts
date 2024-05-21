import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, FormsModule, LoaderComponent, LoadingComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signup: SignUp;
  isLoading: boolean = false;
  userLoader: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.signup = new SignUp();
  }

  ngOnInit() {
    this.isLoading = true;
    setInterval(() => {
      this.isLoading = false;
    }, 1000);
  }

  onSignUp() {
    this.userLoader = true;
    this.authService.userSignup(this.signup).subscribe({
      next: (response) => {
        this.signup = new SignUp();
        this.toastr.success(response.message);
        this.router.navigateByUrl('/pages/auth-user');
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred');
        console.log(error);
      }
    });
    setInterval(() => {
      this.userLoader = false;
    }, 1000)
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