import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServices } from '../../services/user.service';

@Component({
  selector: 'app-upload-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-img.component.html',
  styleUrl: './upload-img.component.css'
})
export class UploadImgComponent {
  uploadImg: File | null = null;
  profileImg: "" | null = null;
  showImg: string | null = null;

  constructor(private toastr: ToastrService, private userServices: UserServices) { }

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
      this.userServices.uploadImg(formData).subscribe({
        next: (response) => {
          this.profileImg = response.imagePath;
          this.toastr.success('File uploaded successfully.');
          console.log(this.profileImg);
          if(response.imagePath) {
            this.userServices.updateFormImg({image: response.imagePath}).subscribe({
              next: (response) => {
                this.toastr.success(response.message);
              },
              error: (error) => {
                console.error('Error updating image:', error);
              }
            })
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
