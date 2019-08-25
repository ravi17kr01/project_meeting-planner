import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  httpHeaders = new HttpHeaders();
  authToken: string;
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('authToken');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.authToken
      })
    };
    }
   

   url = 'https://shielded-bayou-65133.herokuapp.com/api/v1/admin';


  getMeetingDetailsById(userId) {
    let response = this.http.get(this.url + '/' + userId +'/details', this.httpOptions);
    return response;
  }

}
