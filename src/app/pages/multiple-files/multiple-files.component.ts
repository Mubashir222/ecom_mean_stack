import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { faTrash, faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-multiple-files',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './multiple-files.component.html',
  styleUrls: ['./multiple-files.component.css']
})

export class MultipleFilesComponent implements OnInit {
  selectedFiles?: FileList;
  message: string[] = [];
  fileInfos: any[] = [];
  faTrash = faTrash;
  faDownload = faDownload;

  constructor(private uploadService: UserServices, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFileInfos();
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

  upload(file: File): void {
    if (file) {
      this.uploadService.uploadFiles(file).subscribe({
        next: (response) => {
          const msg = file.name + ": Successfuly Upload!";
          this.toastr.success(msg);
          this.selectedFiles = undefined;
          this.getFileInfos(); // Refresh file list after successful upload
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          const msg = file.name + ": Failed!";
          this.toastr.error(msg);
        }
    });
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
  }
  
}
