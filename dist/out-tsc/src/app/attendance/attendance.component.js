import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FaceRecognitionService } from '../services/face.recognition.service';
import { Router } from '@angular/router';
var AttendanceComponent = /** @class */ (function () {
    function AttendanceComponent(faceRecognition, router) {
        this.faceRecognition = faceRecognition;
        this.router = router;
    }
    AttendanceComponent.prototype.ngOnInit = function () {
    };
    AttendanceComponent = __decorate([
        Component({
            selector: 'app-attendance',
            templateUrl: './attendance.component.html',
            styleUrls: ['./attendance.component.less']
        }),
        __metadata("design:paramtypes", [FaceRecognitionService, Router])
    ], AttendanceComponent);
    return AttendanceComponent;
}());
export { AttendanceComponent };
//# sourceMappingURL=attendance.component.js.map