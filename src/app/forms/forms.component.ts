import { HttpClientModule } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { UserServices } from '../../services/user.services';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, UploadImgComponent, CommonModule, LoaderComponent],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit{
  userForm: FormGroup;
  uploadImg: File | null = null;
  showImg: string | null = null;
  selectedFiles?: FileList;
  fileInfos: any[] = [];
  dropdownOpen = false;
  dropdownValue = "Religion";
  isLoading = false;

  ngOnInit(): void {}

  updateButtonValue(value: any): void {
    this.dropdownValue = value;
    this.userForm.patchValue({ religion: value });
    console.log(this.userForm.value)
    this.dropdownOpen = false;
  }


  constructor(private formBuilder: FormBuilder, private userService: UserServices, private toastr: ToastrService) {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      religion: '',
      company: '',
      phoneNo: '',
      websiteUrl: '',
      gender: 'Male',
      profileImg: ''
    });
  }  


  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
      this.selectedFiles = undefined;
    }
  }

  upload(file: File): void {
    if (file) {
      this.userService.uploadFiles(file).subscribe({
        next: (response) => {
          const msg = file.name + ": Successful!";
          this.toastr.success(msg);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          const msg = file.name + ": Failed!";
          this.toastr.error(msg);
        }
    });
    }
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
          this.uploadFiles();
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
    }
  }
  getProfileImgUrl() {
    return this.showImg || '';
  }
  

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
