import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool

import { AdminRoutingModule } from './admin-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserCalenderDetailsComponent } from './user-calender-details/user-calender-details.component';
import { AdminComponent } from './admin.component';
import { AdminserviceService } from './adminservice.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from '../demo-utls/module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { MomentModule } from 'angular2-moment';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FlatpickrModule } from 'angularx-flatpickr';
import * as moment from "moment";
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT
} from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';
import { AdminheaderComponent } from './adminheader/adminheader.component';



export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModalModule,
    DemoUtilsModule,
    SharedModule,
    BrowserAnimationsModule,
    MomentModule,
    ReactiveFormsModule,
    DlDateTimePickerDateModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    AngularFontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory
    },
    {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CalendarMomentDateFormatter
      }
    }),
  ],
  declarations: [ UserDetailsComponent, UserCalenderDetailsComponent, AdminComponent, AdminheaderComponent],
  providers:[AdminserviceService, CookieService, {
    provide: MOMENT,
    useValue: moment
  }],
  exports:[UserCalenderDetailsComponent]
})
export class AdminModule { }
