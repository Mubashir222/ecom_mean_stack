import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.services';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {bootstrapTrash, bootstrapDownload} from "@ng-icons/bootstrap-icons"

@Component({
  selector: 'app-multiple-files',
  standalone: true,
  imports: [CommonModule, NgIconComponent, LoaderComponent],
  templateUrl: './multiple-files.component.html',
  styleUrls: ['./multiple-files.component.css'],
  viewProviders: [provideIcons({bootstrapTrash, bootstrapDownload})]
})

export class MultipleFilesComponent implements OnInit {
  selectedFiles?: FileList;
  message: string[] = [];
  fileInfos: any[] = [];
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
    }, 1000);
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

  downloadFiles(id: any, file: any): void {
    const fileType = file.split(".")[1];
    const filename = file.split("files\\")[1];
    this.uploadService.downloadFiles(id).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: fileType });
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(downloadUrl);
        this.toastr.success("Downloading file...");
      },
      error: (error) => {
        console.error('Error downloading file:', error);
        this.toastr.error("Failed to download file!");
      }
    });
  }
  
  
  // downloadFiles(file: any): void {
  //   console.log(file)
  //   this.uploadService.downloadFiles(file).subscribe({
  //     next: (response) => {
  //       this.toastr.success("Downloading file...");
  //     },
  //     error: (error) => {
  //       console.error('Error downloading file:', error);
  //       this.toastr.error("Failed to download file!");
  //     }
  //   });
  // }

}
