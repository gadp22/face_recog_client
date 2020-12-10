import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HomeComponent } from './home/home.component'
import { MemberComponent } from './member/member.component';
import { AboutComponent } from './about/about.component';
import { AttendanceComponent } from './attendance/attendance.component';

const routes: Routes = [
  { path : 'member', component: MemberComponent},
  { path : 'dashboard', component: DashboardComponent},
  { path : 'attendance', component: AttendanceComponent},
  { path : 'about', component: AboutComponent},
  { path : '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
