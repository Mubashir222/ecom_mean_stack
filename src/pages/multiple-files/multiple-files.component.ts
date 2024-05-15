import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../app/services/user.services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from 'src/components/loader/loader.component';


@Component({
  selector: 'app-multiple-files',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, LoaderComponent],
  templateUrl: './multiple-files.component.html',
  styleUrls: ['./multiple-files.component.css']
})

export class MultipleFilesComponent implements OnInit {
  selectedFiles?: FileList;
  message: string[] = [];
  fileInfos: any[] = [];
  faTrash = faTrash;
  faDownload = faDownload;
  isLoading = false;

  constructor(private uploadService: UserServices, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getFileInfos();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  selectFiles(event: any): void {
    this.message = [];
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

  fileReady(index: number): boolean {
    return this.fileInfos && index >= 0 && index < this.fileInfos.length;
  }
  

  upload(file: File): void {
    if (file) {
      this.isLoading = true;
      this.uploadService.uploadFiles(file).subscribe({
        next: (response) => {
          const msg = file.name + ": Successfuly Upload!";
          this.toastr.success(msg);
          this.selectedFiles = undefined;
          this.selectedFiles = undefined;
          setTimeout(() => {
            this.getFileInfos();
          }, 5000);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          const msg = file.name + ": Failed!";
          this.toastr.error(msg);
        }
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
    }
  }

  getFileInfos(): void {
    this.uploadService.getFiles().subscribe({
      next: (response) => {
        this.fileInfos = response.files;
      },
      error: (error) => { 
        console.error('Error fetching file info:', error);
      }
    });
  }
  
  deleteFile(file: any): void {
    this.isLoading = true;
    this.uploadService.deleteFile(file._id).subscribe({
      next: (response) => {
        const msg = file.file.split("files\\")[1] + ": Successfully Deleted!";
        this.toastr.success(msg);
        this.getFileInfos(); // Refresh file list after successful deletion
      },
      error: (error) => {
        console.error('Error deleting file:', error);
        const msg = file.name + ": Failed to Delete!";
        this.toastr.error(msg);
      }
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  
}
