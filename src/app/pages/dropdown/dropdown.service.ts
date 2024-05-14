import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class DropdownServices {
  apiUrl = "http://localhost:5000/";

  constructor(private httpClient: HttpClient) { }

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
