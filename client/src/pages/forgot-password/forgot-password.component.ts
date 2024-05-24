import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, LoaderComponent, LoadingComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  forgotPasswordModel : ForgotPasswordModel;
  isEmailSend: boolean = false;
  isLoading: boolean = false;
  isForgotPassword: boolean = false;

  constructor(private authServices: AuthService, private toastr: ToastrService) {
    this.forgotPasswordModel = new ForgotPasswordModel();
  }

  ngOnInit() {
    this.isLoading = true;
    setInterval(() => {
      this.isLoading = false;
    }, 1000);
  }

  onForgotPassword() {
    if(this.forgotPasswordModel.email === '') {
      this.toastr.error('Please enter your email address');
      return;
    }
    this.isForgotPassword = true;
    this.authServices.forgotPassword({email: this.forgotPasswordModel.email}).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.isEmailSend = true;
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred');
        console.log(error);
      }
    })
    setInterval(() => {
      this.isForgotPassword = false;
    },1000);
  }

  onResetPassword() {
    if(this.forgotPasswordModel.otp == '') {
      this.toastr.error('Please enter the OTP');
      return;
    }else if(this.forgotPasswordModel.password == '') {
      this.toastr.error('Please enter the password');
      return;
    }else if(this.forgotPasswordModel.confirmPassword == '') {
      this.toastr.error('Please enter the confirm password');
      return;
    }else if(this.forgotPasswordModel.email == '') {
      this.toastr.error('Again forgot password request send.');
      return;
    }else {
      this.isForgotPassword = true;
      const resetData = {otp: this.forgotPasswordModel.otp, password: this.forgotPasswordModel.password, confirmPassword: this.forgotPasswordModel.confirmPassword}
      
      this.authServices.resetPassword({email: this.forgotPasswordModel.email, user: resetData}).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
          this.forgotPasswordModel = new ForgotPasswordModel();
        },
        error: (error) => {
          this.toastr.error(error.error.message || 'An error occurred');
          console.log(error);
        }
      })
    }
    setInterval(() => {
      this.isForgotPassword = false;
    },1000);
  }

}


class ForgotPasswordModel {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.email = "";
    this.otp = "";
    this.password = "";
    this.confirmPassword = "";
  }
}