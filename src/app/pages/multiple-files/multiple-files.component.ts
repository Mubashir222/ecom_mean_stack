import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-multiple-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './multiple-files.component.html',
  styleUrls: ['./multiple-files.component.css']
})

export class MultipleFilesComponent implements OnInit {
  selectedFiles?: FileList;
  message: string[] = [];
  fileInfos: any[] = [];

  constructor(private uploadService: UserServices) { }

  ngOnInit(): void {
    this.getFileInfos();
  }

  selectFiles(event: any): void {
    this.message = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
      this.selectedFiles = undefined;
    }
  }

  upload(file: File): void {
    if (file) {
      this.uploadService.uploadFiles(file).subscribe(
        (response: any) => {
          const msg = file.name + ": Successful!";
          this.message.push(msg);
          this.getFileInfos(); // Refresh file list after successful upload
        },
        (error: any) => {
          console.error('Error uploading file:', error);
          const msg = file.name + ": Failed!";
          this.message.push(msg);
        }
      );
    }
  }

  getFileInfos(): void {
    this.uploadService.getFiles().subscribe(
      (response: any) => { // Changed 'next' to '(response: any) =>'
        this.fileInfos = response.files;
      },
      (error: any) => { // Removed 'error:' and the colon
        console.error('Error fetching file info:', error);
      }
    );
  }
  
}
