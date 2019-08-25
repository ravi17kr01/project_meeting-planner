import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  httpOptions: any;
  authToken: string;

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('authToken');
   }

  url = 'https://shielded-bayou-65133.herokuapp.com/api/v1';

  login(user) {
    let response = this.http.post(this.url + '/login', user);
    return response;
    } // end of login

    signup(userDetails) {
      let response = this.http.post(this.url + '/signup', userDetails);
      return response;
    } // end of signup

    forgotPassword(email) {
      let response = this.http.post(this.url + '/forgot-password', email);
      return response;
    } // end of forgot password

    getPhoneCodes() {
      let response = this.http.get('http://country.io/phone.json');
      return response;
    } // end of Phone Code

    logout(authToken: string) {
      //console.log(authToken);


     let userObj = {
       userId: localStorage.getItem('userId')
     }
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': authToken
        })
      }
      let response = this.http.post(this.url + '/logout',userObj, this.httpOptions);
      return response;
    } // end of logout

    verifyCode(codeDetails) {
      let response = this.http.post(this.url + '/verifycode', codeDetails);
      return response;
    }

}