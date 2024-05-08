import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { UserServices } from '../../services/user.services';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, UploadImgComponent, CommonModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent {
  userForm: FormGroup;
  uploadImg: File | null = null;
  showImg: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserServices, private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      company: '',
      phoneNo: '',
      websiteUrl: '',
      gender: 'Male',
      profileImg: ''
    });
  }  


  onSubmit() {  
    let formIsValid = true;
  
    // Iterate over each form control
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      // Skip the phoneNo field
      if (field !== 'phoneNo' && control && !control.valid) {
        // Log the field name and error message to the console
        console.error(`Field '${field}' is not valid:`, control.errors);
        formIsValid = false;
      }
    });
  
    if (formIsValid) {
      this.userService.submitForm(this.userForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.toastr.success(response.message);
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        }
      });
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
            // Store the imagePath in the profileImg field of userForm
            this.userForm.patchValue({ profileImg: response.imagePath });
            this.toastr.success('File uploaded successfully.');
          }         
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        }
      });
      } else {
        this.uploadImg = null;
        this.showImg = null;
        this.toastr.error('File size should be less than or equal to 2MB.');
      }
    }
  }
  getProfileImgUrl() {
    return this.showImg || '';
  }
  
}
