import { Component } from '@angular/core';
import { UploadImgComponent } from 'src/app/upload-img/upload-img.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '../loading/loading.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServices } from 'src/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from 'src/services/cloudinary.service';
import {provideIcons, NgIconComponent} from "@ng-icons/core"
import { bootstrapCaretDownFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, UploadImgComponent, LoadingComponent, NgIconComponent],
  providers: [provideIcons({bootstrapCaretDownFill})],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  userForm: FormGroup;
  uploadImg: File | null = null;
  showImg: string | null = null;
  selectedFiles?: FileList;
  fileInfos: any[] = [];
  dropdownOpen = false;
  dropdownValue = "Choose your brand";
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private userService: UserServices, private toastr: ToastrService, private cloudinaryService: CloudinaryService) {
    this.userForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      company: ['', [Validators.required]],
      phoneNo: ['', [Validators.required]],
      websiteUrl: ['', [Validators.required]],
      gender: 'Male',
      profileImg: ''
    });
  }  

  ngOnInit(): void {}

  updateButtonValue(value: any): void {
    this.dropdownValue = value;
    this.userForm.patchValue({ religion: value });
    console.log(this.userForm.value)
    this.dropdownOpen = false;
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

  async onSubmit() {
    if(this.uploadImg == null) {
      this.toastr.error('Please select an image to upload');
      return;
    }else {
      await this.imgUpload();
    
      console.log(this.userForm.value)
  
      // if(this.userForm.value.profileImg === '') {
      //   this.toastr.error('Please select an image to upload');
      //   return;
      // }else {
      //   this.userService.submitForm(this.userForm.value).subscribe({
      //     next: (response) => {
      //       // this.uploadFiles();
      //       this.toastr.success(response.message);
      //       this.userForm.reset();
      //     },
      //     error: (error) => {
      //       console.error('Error submitting form:', error);
      //     }
      //   });
      // }  
    }
  }

  imgUpload(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.uploadImg) {
        const formData = new FormData();
        formData.append('image', this.uploadImg);
  
        this.cloudinaryService.uploadImage(this.uploadImg).subscribe({
          next: (response: any) => {
            if (response.secure_url) {
              this.userForm.patchValue({ profileImg: response.secure_url });
              console.log(response.secure_url, this.userForm.value);
              resolve();  // Resolve the promise when the image is successfully uploaded
            } else {
              this.toastr.error('Failed to get image path from response.');
              reject('Failed to get image path from response.');
            }
          },
          error: (error) => {
            console.error('Error storing file:', error);
            reject(error);  // Reject the promise if there's an error
          }
        });
      } else {
        this.toastr.error('Please select an image to upload');
        reject('No image selected');
      }
    });
  }

  async onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (file.size <= 2 * 1024 * 1024) {
        this.uploadImg = file;
        this.showImg = window.URL.createObjectURL(file);
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
