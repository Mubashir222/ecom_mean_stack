import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class DevExpressService {
  apiUrl = "https://dummyjson.com/";

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + 'products').pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

}
