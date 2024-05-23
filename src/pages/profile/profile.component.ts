import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { UserServices } from '../../services/user.service';
import { NgIconComponent, provideIcons } from "@ng-icons/core"
import { bootstrapEyeFill, bootstrapEyeSlashFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent],
  providers: [provideIcons({bootstrapEyeSlashFill, bootstrapEyeFill})],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userData: FormGroup;
  currentUser: any;
  dropdownOpen: boolean = false;
  dropdownValue: string = "Select Religion";
  showImg: string | null = null;
  uploadImg: File | null = null;
  changePassword: FormGroup;
  changePswBtn: boolean = true;
  isOldPasswordShow: boolean = false;
  isNewPasswordShow: boolean = false;
  isConfirmPasswordShow: boolean = false;

  constructor(private formBuilder: FormBuilder,private userService: UserServices, private authServices: AuthService, private router: Router, private toastr: ToastrService) {
    this.userData = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      religion: '',
      phoneNo: '',
      gender: 'Male',
      profileImg: '',
      description: ''
    });

    this.changePassword = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.setUserData();
    this.changePassword.statusChanges.subscribe(status => {
      this.changePswBtn = this.changePassword.invalid;
    });
  }

  setUserData(){
    this.authServices.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    if(this.currentUser) {
      const religion = this.currentUser.religion ? this.currentUser.religion : "Select Religion";
      this.dropdownValue = religion;
      this.userData.patchValue({
        username: this.currentUser.username,
        email: this.currentUser.email,
        religion: this.currentUser.religion,
        phoneNo: this.currentUser.phoneNo,
        profileImg: this.currentUser.profileImg,
        description: this.currentUser.description
      })
    }
  }

  updateProfile(){
    const user = this.authServices.getUser();
    const token = this.authServices.getToken();
    if(user && token) {
      this.authServices.updateProfile(token, {userData: this.userData.value}).subscribe({
        next: (response) => {
          this.toastr.success(response.message);

          if(response.user){
            this.authServices.setLocalUser(response.user);
            this.setUserData();
          }
          
          else {
            this.toastr.error('Error while updating profile');
          }

          console.log(this.currentUser)

        },
        error: (error) => {
          this.toastr.error(error.error.message)
          console.error('Error updating profile:', error);
        }
      });
      setInterval(() => {
        this.toastr.clear();
      }, 1000);
    }else {
      this.authServices.logout();
      this.router.navigateByUrl('/login');
    }
  }


  async onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file.size <= 2 * 1024 * 1024) {
        this.uploadImg = file;
        this.showImg = window.URL.createObjectURL(file);

        // Create a FormData object
        const formData = new FormData();
  
        // Append the file to the FormData object
        formData.append('image', file);
  
        // Pass the FormData object to the uploadImg method
      this.userService.uploadImg(formData).subscribe({
        next: (response) => {
          if(response.imagePath) {
            this.userData.patchValue({ profileImg: response.imagePath });
            this.toastr.success('Image stored successfully.');
          }         
        },
        error: (error) => {
          console.error('Error storing file:', error);
        }
      });
    } else {
      this.uploadImg = null;
      this.showImg = null;
      this.toastr.error('Image size should be less than or equal to 2MB.');
    }
    setInterval(() => {
      this.toastr.clear();
    }, 1000);
    }
  }

  getProfileImgUrl() {
    return this.showImg || '';
  }

  toggleDropdown(event: Event) {
    event.preventDefault();

    this.dropdownOpen = !this.dropdownOpen;
  }

  updateButtonValue(value: any): void {
    this.dropdownValue = value;
    if(value === "Select Religion"){
      value = "";
    }else {
      this.userData.patchValue({ religion: value });
    }
    this.dropdownOpen = false;
  }

  deleteAccount(event: Event){
    event.preventDefault();

    const user = this.authServices.getUser();
    if(user) {
      this.authServices.deleteUser(user._id).subscribe({
        next: (response) => {
          this.authServices.logout();
          this.toastr.success(response.message);
          this.router.navigateByUrl('/signup');
        },
        error: (error) => {
          console.error('Error deleting account:', error);
        }
      });
    }
  }


  changePasswordSubmit(){
    const token = this.authServices.getToken();
    if(token) {
      this.authServices.changePassword(token, {userData: this.changePassword.value}).subscribe({
        next: (response) => {
          this.authServices.logout();
          this.toastr.success(response.message);
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.toastr.error(error.error.message || error.error.error || 'Error changing password');
          console.error('Error deleting account:', error);
        }
      });
    }else {
      this.authServices.logout();
      this.router.navigateByUrl('/login');
    }
  }
}
