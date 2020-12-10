import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FaceRecognitionService } from '../services/face.recognition.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(faceRecognition, router) {
        this.faceRecognition = faceRecognition;
        this.router = router;
        this.signupFormModalName = new FormControl('', Validators.required);
        this.signupFormModalEmail = new FormControl('', Validators.email);
        this.signupFormModalPassword = new FormControl('', Validators.required);
        this.registeredMembers = [];
    }
    DashboardComponent.prototype.test = function () {
        this.router.navigateByUrl('/member');
    };
    DashboardComponent.prototype.ngOnInit = function () {
        this.registeredMembers = this.faceRecognition.getRegisteredMembers();
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.less']
        }),
        __metadata("design:paramtypes", [FaceRecognitionService, Router])
    ], DashboardComponent);
    return DashboardComponent;
}());
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map