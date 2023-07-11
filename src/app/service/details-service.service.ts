import { Injectable } from '@angular/core';
import { Detail } from '../interface/detail';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsServiceService {
  detail: Detail[] = []; // Array to store details

  postDetails!: Observable<any>; // Observable to store the POST request response

  constructor(private http: HttpClient) { }

  // Function to add details
  addDetails(detail: any) {
    // Sending a POST request to the server with the provided detail data
    this.postDetails = this.http.post('http://localhost:8080/details', detail, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
