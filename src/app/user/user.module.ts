import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CookieService } from 'ngx-cookie-service';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoUtilsModule } from '../demo-utls/module';
import { UserserviceService } from './userservice.service';
import { SharedModule } from '../shared/shared.module';
import { UserheaderComponent } from './userheader/userheader.component';
@NgModule({
  imports: [
    CommonModule,
    DemoUtilsModule,
    UserRoutingModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  declarations: [UserComponent, DashboardComponent, UserheaderComponent],
  providers:[UserserviceService, CookieService],
  exports:[DashboardComponent]
})
export class UserModule { }
