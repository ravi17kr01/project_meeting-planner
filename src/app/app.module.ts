import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { AppServiceService } from './app-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoUtilsModule } from './demo-utls/module';
import { MomentModule } from 'angular2-moment';
import * as moment from "moment";
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  CalendarDateFormatter,
  CalendarModule,
  CalendarMomentDateFormatter,
  DateAdapter,
  MOMENT
} from 'angular-calendar';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { VerifyCodeComponent } from './verify-code/verify-code.component';


export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerifyCodeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
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
    DlDateTimePickerDateModule,
    AppRoutingModule,
    NgbModalModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    UserModule,
    DemoUtilsModule,
    MomentModule
  ],
  providers: [AppServiceService, CookieService, {
    provide: MOMENT,
    useValue: moment
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
