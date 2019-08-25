import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { UserserviceService } from '../userservice.service';
import { Subject } from 'rxjs';

import { colors } from '../../demo-utls/colors';
import * as io from 'socket.io-client';

import {
  startOfDay,
  endOfDay
} from 'date-fns';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { AppServiceService } from '../../app-service.service';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  socketURL = io('https://shielded-bayou-65133.herokuapp.com');

  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  data: any;
  userId: string;
  isLoading: boolean;
  errorMsg: string;
  authToken: string;
  modalString: string;
  logoutData: any;

  eventDetails = {
    title: '',
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
    recieverUserId: '',
    when:'',
    where:'',
    purpose:'',
    itemId:'',
    senderUserId: '',
    userName: ''
  }

  constructor(private service: UserserviceService, private appService: AppServiceService,
     private router: Router, private toastr: ToastrService) {
  

   }

  ngOnInit() {
    this.isLoading = true;
    this.userId = localStorage.getItem('userId');
    this.authToken = localStorage.getItem('authToken');
    this.socketURL.on(this.userId, (data) => {

      this.saveDetails(data);
    })

    this.fetchDetails();
    this.isLoading = false;

  }

  saveDetails(data) {
    if(data.title) {
      this.eventDetails.title =data.title;
      this.eventDetails.userName = data.userName;
      this.eventDetails.startDate = data.start;
      this.eventDetails.endDate =data.end;

      if(data.isNew === true) {
        this.modalString = this.eventDetails.title + ' is created by ' + this.eventDetails.userName;
      } else {
        this.modalString = this.eventDetails.title + ' is updated by ' + this.eventDetails.userName;
      }

      setTimeout(() => {
        $('#exampleModalCenter').modal('show');        
        }, 3000);

      setTimeout(() => {
        this.fetchDetails();
      }, 2000);
    }
  }

  fetchDetails() {
    this.service.getMeetingDetailsById(this.userId).subscribe(data => {
      this.data = data;
      if(this.data.error) {
        
        if(this.data.message === 'Invalid Or Expired AuthorizationKey') {
        } else {
          this.toastr.info('', 'No Events');

        }
      } else {
        this.events = [];
        if(this.data.data) {
          for(let item of this.data.data) {
            item.start = new Date(item.startDate);
            item.end = new Date(item.endDate);
            item['color'] = colors.blue;
            this.events.push(item);
            this.refresh.next();
          }
        } else {
          this.refresh.next();
        }
      }
    }, error => {
      this.isLoading =  false;
      this.router.navigate(['/login']);
    });
  }


  handleEvent(event): void {
    this.eventDetails.when = event.event.when;
    this.eventDetails.title = event.event.title;
    this.eventDetails.where = event.event.where;
    this.eventDetails.purpose = event.event.purpose;
    this.eventDetails.userName = event.event.eventCreatedBy;
    this.eventDetails.startDate = event.event.start;
    this.eventDetails.endDate = event.event.end;
    $('#eventData').modal('show');
  }


}
