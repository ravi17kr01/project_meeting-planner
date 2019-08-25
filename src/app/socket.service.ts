import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  authToken: string;
  userId: string;
  private socket = io('https://shielded-bayou-65133.herokuapp.com');
  
  constructor(private cookieService: CookieService) { 
    this.userId = localStorage.getItem('userId')
    this.authToken = localStorage.getItem('authToken');

  }

  getASocketCall(details) {
   // console.log('this is a socket service');
    //console.log('userid',this.userId);
    return Observable.create((observer) => {
     // console.log('this.authToken', details.authToken);
        this.socket.emit("set-user", details.authToken);
        this.socket.on(details.userId, (data) => {
         // console.log('DDD', data);
        })

    }); // end Observable

  } // End getASocketCall

}
