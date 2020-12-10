import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiConsumerService } from '../services/api.consumer.service';
var MemberComponent = /** @class */ (function () {
    function MemberComponent(formBuilder, api) {
        this.formBuilder = formBuilder;
        this.api = api;
        this.submitted = false;
        this.success = false;
    }
    MemberComponent.prototype.ngOnInit = function () {
        this.messageForm = this.formBuilder.group({
            name: ['', Validators.required],
            image: ['', Validators.required]
        });
    };
    MemberComponent.prototype.onSubmit = function () {
        this.submitted = true;
        if (this.messageForm.invalid) {
            return;
        }
        var member = {};
        member['name'] = this.messageForm.controls.name.value;
        member['image'] = this.messageForm.controls.image.value;
        this.api.registerMember(member);
        this.success = true;
    };
    MemberComponent = __decorate([
        Component({
            selector: 'app-member',
            templateUrl: './member.component.html',
            styleUrls: ['./member.component.less']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ApiConsumerService])
    ], MemberComponent);
    return MemberComponent;
}());
export { MemberComponent };
//# sourceMappingURL=member.component.js.map