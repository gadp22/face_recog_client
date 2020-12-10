import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { FaceRecognitionService } from './services/face.recognition.service';
import { ApiConsumerService } from './services/api.consumer.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(faceRecognition, api) {
        this.faceRecognition = faceRecognition;
        this.api = api;
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting all registered members ...');
                        return [4 /*yield*/, this.getMembers()];
                    case 1:
                        _a.sent();
                        console.log('loading models ...');
                        return [4 /*yield*/, this.faceRecognition.loadModels()];
                    case 2:
                        _a.sent();
                        console.log('all models have been successfully loaded ...');
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.getMembers = function () {
        var id = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            id[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.registeredMembers = [];
                        return [4 /*yield*/, this.api.getMembers()];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.subscribe(function (dat) {
                                var data = dat['data'];
                                for (var i = 0, len = data.length; i < len; i++) {
                                    _this.registeredMembers.push(data[i]);
                                }
                                _this.faceRecognition.setRegisteredMembers(_this.registeredMembers);
                                console.log('done populating all registered members ...');
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.less']
        }),
        __metadata("design:paramtypes", [FaceRecognitionService,
            ApiConsumerService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map