import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  subMonths,
  addMonths,
  subDays,
  subWeeks,
  addDays,
  addWeeks,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  subYears,
  addYears
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView
} from 'angular-calendar';
import { AdminserviceService } from '../adminservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as io from 'socket.io-client';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

declare var $: any;
type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}
function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}


@Component({
  selector: 'app-user-calender-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-calender-details.component.html',
  styleUrls: ['./user-calender-details.component.css']
})
export class UserCalenderDetailsComponent implements OnInit{

id: string;
socketURL = io('https://shielded-bayou-65133.herokuapp.com');
isLoading: boolean;

minDate: Date = subYears(new Date(), 1);

maxDate: Date = addMonths(new Date(), 2);

prevBtnDisabled: boolean = false;

nextBtnDisabled: boolean = false;
heading = 'Create Event';


 eventDetails = {
  title: '',
  startDate: startOfDay(new Date()),
  endDate: endOfDay(new Date()),
  recieverUserId: '',
  when:'',
  where:'',
  purpose:'',
  itemId:'',
  senderUserId:'',
  userName:''
}

  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  data: any;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        $('#create').modal('show');
        this.createEvent(event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.deleteItem(event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  actionBtn = 'Submit';
  errorMsg: string;


  constructor(private modal: NgbModal, private cookierService: CookieService, 
    private service: AdminserviceService, 
    private route: ActivatedRoute, private router: Router, private toastr: ToastrService
      ) {
    this.id = route.snapshot.params.id;
    this.dateOrViewChanged();

  }

  ngOnInit() {
    this.isLoading = true;
    this.eventDetails.userName = localStorage.getItem('username');
    this.eventDetails.senderUserId = localStorage.getItem('userId');
        this.socketURL.on(this.eventDetails.senderUserId, (data) => {

          this.saveDetails(data);
        })
    this.fetchDetails();

    this.isLoading = false;
  } // end of ngOnInit

  saveDetails(data) {
    if(data.title) {
      $('#create').modal('hide');
      setTimeout(() => {
        this.fetchDetails(); 
        this.updateModel();
      }, 2000);
    }
  } // end of saveDetails

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  } // end of day clicked
  handleEvent(action: string, event: CalendarEvent): void {
    this.createEvent(event);
  } // end handle Event

 

  createEvent(event?) {
    $('#create').modal('show');

    if(event) {
      this.actionBtn = 'Update';
      this.heading = 'Update Event';
      this.eventDetails.startDate = event.start;
      this.eventDetails.endDate = event.end;
      this.eventDetails.when = event.when;
      this.eventDetails.where = event.where;
      this.eventDetails.purpose = event.purpose;
      this.eventDetails.title = event.title;
      this.eventDetails.itemId = event.itemId;
      this.eventDetails.recieverUserId = this.id;
      this.eventDetails.senderUserId = this.eventDetails.senderUserId;
      this.eventDetails.userName = this.eventDetails.userName;
    }


  } // End Create Event

  deleteItem(event) {
    let  deletedItem = {'itemId': event.itemId}
     this.service.deleteEventItem(deletedItem).subscribe(data => {
       let result: any = data;
       if(result.error) {
        this.toastr.error(result.message,'Error');
       } else {
        this.toastr.success(result.message,'Success');        
         this.events = this.events.filter(iEvent => iEvent !== event);
         this.fetchDetails();
       }
     })  
   } // end delete items


  submitEvent() {

    if(this.actionBtn === 'Submit') {
     this.eventDetails.recieverUserId = this.id;
     this.socketURL.emit("save-meeting",this.eventDetails)

     setTimeout(() => {
      this.toastr.success('','Created Successfully');       
     }, 2000);
     } else {
       this.socketURL.emit("edit-meeting",this.eventDetails)
       setTimeout(() => {
        this.toastr.success('','Updated Successfully');       
       }, 2000);
     }
  } // Submit Event

 

  fetchDetails() {
    this.service.getMeetingDetailsById(this.id).subscribe(data => {
      this.data = data;
      if(this.data.error) {
        this.errorMsg = this.data.message;

        setTimeout(() => {
          $('#errorData').modal('show');
        }, 2000);
      } else {
        this.events = [];
        if(this.data.data) {
          for(let item of this.data.data) {
            item.start = new Date(item.startDate);
            item.end = new Date(item.endDate);
            item['actions'] = this.actions;
            this.events.push(item);
            this.refresh.next();
          }
        } else {
          this.activeDayIsOpen = false;
          this.refresh.next();
        }
      }
    } , error => {
      this.isLoading =  false;
      this.router.navigate(['/login']);
    });
  } // end of fetch details


  updateModel() {
    this.eventDetails = {
      title: '',
      startDate: startOfDay(new Date()),
      endDate: endOfDay(new Date()),
      recieverUserId: '',
      when:'',
      where:'',
      purpose:'',
      itemId:'',
      senderUserId: this.eventDetails.senderUserId,
      userName: this.eventDetails.userName
    }
    this.actionBtn = 'Submit';
    this.heading = 'Create Event';
  } // end of update Model

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 3))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }
  }

