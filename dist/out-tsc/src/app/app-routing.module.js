import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MemberComponent } from './member/member.component';
import { AboutComponent } from './about/about.component';
import { AttendanceComponent } from './attendance/attendance.component';
var routes = [
    { path: 'member', component: MemberComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'attendance', component: AttendanceComponent },
    { path: 'about', component: AboutComponent },
    { path: '', component: HomeComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map