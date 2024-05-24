import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
    private cloudName: string = environment.cloudinary.cloudName;
    private uploadPreset: string = "";
    constructor(private httpClient: HttpClient) {
      console.log(this.cloudName)
    }

    uploadImage(file: File) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
  
      return this.httpClient.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData);
    }

}
