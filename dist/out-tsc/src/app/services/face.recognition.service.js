import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';
var FaceRecognitionService = /** @class */ (function () {
    function FaceRecognitionService() {
        this.registeredMembers = [];
        this.captureInterval = null;
    }
    FaceRecognitionService.prototype.loadModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, faceapi.nets.tinyFaceDetector.loadFromUri('assets/models')];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, faceapi.nets.faceLandmark68Net.loadFromUri('assets/models')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, faceapi.nets.faceRecognitionNet.loadFromUri('assets/models')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FaceRecognitionService.prototype.getRegisteredMembers = function () {
        return this.registeredMembers;
    };
    FaceRecognitionService.prototype.setRegisteredMembers = function (registeredMembers) {
        this.registeredMembers = registeredMembers;
    };
    FaceRecognitionService.prototype.getCaptureInterval = function () {
        return this.captureInterval;
    };
    FaceRecognitionService.prototype.setCaptureIntercal = function (captureInterval) {
        this.captureInterval = captureInterval;
    };
    FaceRecognitionService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], FaceRecognitionService);
    return FaceRecognitionService;
}());
export { FaceRecognitionService };
//# sourceMappingURL=face.recognition.service.js.map