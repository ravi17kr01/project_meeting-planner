import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from '../socket.service';
declare var $: any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpData: any;
  loginData: any;
  authToken: string;
  errorMsg: string;
  constructor(private service: AppServiceService, private router: Router,
    private cookie: CookieService, private socket: SocketService) { }

  model = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    isAdmin: false
  }

  userDetails = {
    email: '',
    password: ''
  }



  submitted = false;
  ngOnInit() {

  }

  getPhoneCodes() {
    this.service.getPhoneCodes().subscribe(data => {
    })
  }

  onSubmit() {
    this.submitted = true;
    this.service.signup(this.model).subscribe(data => {
      this.signUpData = data;
      if(this.signUpData.error) {
      
      }
      if (this.signUpData.status === 200) {
        this.userDetails.email = this.signUpData.data.email;
        this.userDetails.password = this.model.password;
        this.service.login(this.userDetails).subscribe(data => {
          this.loginData = data
          if (this.loginData.error) {
            this.errorMsg = this.loginData.message;
            setTimeout(() => {
              $('#errorData').modal('show');
            }, 2000);
          } else {
            localStorage.setItem('authToken', this.loginData.data.authToken);
            localStorage.setItem('userId', this.loginData.data.userDetails.userId);
            localStorage.setItem('username', this.loginData.data.userDetails.userName);
            this.authToken = localStorage.getItem('authToken');

            let details = {
              authToken: this.loginData.data.authToken,
              userId: this.loginData.data.userDetails.userId
            }

            setTimeout(() => {
              this.socket.getASocketCall(details).subscribe(data => {
              })
            }, 2000);
            if (this.loginData.data.userDetails.isAdmin) {
              this.router.navigateByUrl('/admin');
            } else {
              this.router.navigateByUrl('/user');
            }

          }
        })
      } else {

      }
    })
  }

  selectUser(isAdmin: boolean) {
    this.model.isAdmin = isAdmin;
  }
}
