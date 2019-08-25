import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminComponent } from './admin.component';
import { UserCalenderDetailsComponent } from './user-calender-details/user-calender-details.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children : [
      {path: 'user-details', component: UserDetailsComponent},
      {path: 'eventdetails/:id', component: UserCalenderDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
