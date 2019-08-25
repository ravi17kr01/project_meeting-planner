import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
httpHeaders = new HttpHeaders();
authToken: string;
httpOptions: any;
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.authToken = localStorage.getItem('authToken');
   this.httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': this.authToken
    })
  };
  }

  url = 'https://shielded-bayou-65133.herokuapp.com/api/v1/admin';

  getAllUserDetails() {    
    let response =  this.http.get(this.url + '/all', this.httpOptions);
    return response;
  }
  
  addMeetingDetails(meetingDetails) {
    let response = this.http.post(this.url + '/add-meeting', meetingDetails, this.httpOptions);
    return response;
  }

  getMeetingDetailsById(userId) {
    let response = this.http.get(this.url + '/' + userId +'/details', this.httpOptions);
    return response;
  }

  deleteEventItem(item) {
    let response = this.http.post(this.url + '/delete', item, this.httpOptions);
    return response;
  }

  editEventItem(item) {
    let response = this.http.post(this.url + '/edit-events', item, this.httpOptions);
    return response;
  }
}
