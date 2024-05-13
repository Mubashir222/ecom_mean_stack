import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class UserServices {
  apiUrl = "http://localhost:5000/";

  constructor(private httpClient: HttpClient) { }

  uploadImg(data: FormData) {
    return this.httpClient.post<any>(this.apiUrl + 'data/upload-img', data);
  }

  submitForm(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'application/user-apply-form', data);
  }

  getForm() {
    return this.httpClient.get<any>(this.apiUrl + 'application/get-user-detail');
  }

  updateFormImg(data: any) {
    return this.httpClient.put<any>(this.apiUrl + 'application/update-profile-img', data);
  }
  
  uploadFiles(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(this.apiUrl + 'multi-files/upload-multi-files', formData);
  }

  getFiles() {
    return this.httpClient.get<any>(this.apiUrl + 'multi-files/get-files');
  }

  deleteFile(file: any) {
    return this.httpClient.delete<any>(this.apiUrl + `multi-files/delete-file/${file}`);
  }


  addDropdownOption(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'dropdown/add', data);
  }

  getDropdownOptions() {
    return this.httpClient.get<any>(this.apiUrl + 'dropdown/getAll');
  }

  updateDropdownOption(data: any) {
    return this.httpClient.put<any>(this.apiUrl + 'dropdown/update', data);
  }

  deleteDropdownOption(data: any) {
    return this.httpClient.delete<any>(this.apiUrl + `dropdown/delete/${data}`);
  }

  addOptionData(data: any) {
    return this.httpClient.post<any>(this.apiUrl + 'dropdown-option-data/add', data);
  }

  getOptionData() {
    return this.httpClient.get<any>(this.apiUrl + 'dropdown-option-data/getAll');
  }


}
