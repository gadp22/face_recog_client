import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as faceapi from 'face-api.js';
import { ApiConsumerService } from '../services/api.consumer.service';
import { AppComponent } from '../app.component';
import { FaceRecognitionService } from '../services/face.recognition.service';
import Swal from 'sweetalert2';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(api, faceRecognition) {
        this.api = api;
        this.faceRecognition = faceRecognition;
        var inputSize = 640;
        var scoreThreshold = 0.5;
        this.identifiedPersons = [];
        this.feedback = [];
        this.registeredMembers = [];
        this.faceOptions = new faceapi.TinyFaceDetectorOptions({ inputSize: inputSize, scoreThreshold: scoreThreshold });
        this.captureInterval = this.faceRecognition.getCaptureInterval();
        clearInterval(this.captureInterval);
    }
    HomeComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.registeredMembers.length == 0)) return [3 /*break*/, 2];
                        console.log('populating registered members ...');
                        _a = this;
                        return [4 /*yield*/, this.faceRecognition.getRegisteredMembers()];
                    case 1:
                        _a.registeredMembers = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.detectedName = 'ummm, wait a second, let me think ...';
                        this.recognition = null;
                        this.track = false;
                        this.trackStatus = 'Let\'s Play the Game!';
                        this.fps = 200;
                        this.captureInterval = this.faceRecognition.getCaptureInterval();
                        clearInterval(this.captureInterval);
                        console.log('initialising camera ...');
                        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                                _this.video.nativeElement.srcObject = stream;
                                _this.video.nativeElement.play();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.ngAfterViewInit = function () {
    };
    HomeComponent.prototype.buttonYes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var yes;
            return __generator(this, function (_a) {
                yes = this.api.rightAnswer();
                yes.subscribe(function (res) {
                    console.log(res);
                });
                Swal.fire({
                    type: 'success',
                    title: 'Thanks, your feedback means a lot to me!',
                    text: 'Just as I said, I am awesome!',
                });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.buttonNo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var no;
            return __generator(this, function (_a) {
                no = this.api.wrongAnswer();
                no.subscribe(function (res) {
                    console.log(res);
                });
                Swal.fire({
                    type: 'success',
                    title: 'Thanks, your feedback means a lot to me!',
                    text: 'I will learn harder from now on!',
                });
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.toggleFPS = function (event) {
        var _this = this;
        this.fps = event.target.id;
        console.log(this.fps);
        clearInterval(this.captureInterval);
        this.captureInterval = setInterval(function () { _this.capture(); }, this.fps);
        this.faceRecognition.setCaptureIntercal(this.captureInterval);
    };
    HomeComponent.prototype.drawCanvas = function () {
        var canvasElement = this.canvas.nativeElement;
        var videoElement = this.video.nativeElement;
        var ratio = window.innerWidth / window.outerWidth * 0.75;
        canvasElement.setAttribute('width', videoElement.videoWidth * ratio);
        canvasElement.setAttribute('height', videoElement.videoHeight * ratio);
        var canvasContext = canvasElement.getContext("2d");
        canvasContext.drawImage(videoElement, 0, 0, videoElement.videoWidth * ratio, videoElement.videoHeight * ratio);
    };
    HomeComponent.prototype.enableTracking = function () {
        var _this = this;
        this.track = (this.track) ? false : true;
        if (this.track) {
            this.captureInterval = setInterval(function () { _this.capture(); }, this.fps);
            this.faceRecognition.setCaptureIntercal(this.captureInterval);
            this.trackStatus = 'Stop Guessing Me Please!';
        }
        else {
            clearInterval(this.captureInterval);
            this.faceRecognition.setCaptureIntercal(this.captureInterval);
            this.trackStatus = 'Let\'s Play the Game!';
        }
    };
    HomeComponent.prototype.drawFaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, _loop_1, this_1, i, len;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('detecting faces ...');
                        return [4 /*yield*/, faceapi.detectAllFaces(this.canvas.nativeElement, this.faceOptions).withFaceLandmarks().withFaceDescriptors()];
                    case 1:
                        result = _a.sent();
                        _loop_1 = function (i, len) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log('recognising face ...');
                                        return [4 /*yield*/, faceapi.draw.drawFaceLandmarks(this_1.canvas.nativeElement, result.map(function (res) { return res.landmarks; }))];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, this_1.api.recognize(result[i].descriptor)];
                                    case 2:
                                        this_1.recognition = _a.sent();
                                        if (this_1.track) {
                                            this_1.recognition.subscribe(function (dat) {
                                                if (dat.data.name == 'unknown') {
                                                    _this.detectedName = 'ummm, wait a second, let me think ...';
                                                }
                                                else {
                                                    _this.detectedName = dat.data.name + ', right?!';
                                                }
                                                var drawOptions = {
                                                    label: dat.data.name,
                                                    lineWidth: 2
                                                };
                                                var drawBox = new faceapi.draw.DrawBox(result[i].detection.box, drawOptions);
                                                drawBox.draw(_this.canvas.nativeElement);
                                            });
                                        }
                                        else {
                                            this_1.recognition.subscribe(function (dat) {
                                                AppComponent;
                                                var image = _this.getImage(dat.data.id);
                                                var identifiedPerson = {};
                                                identifiedPerson['name'] = dat.data.name;
                                                identifiedPerson['distance'] = dat.data.distance;
                                                identifiedPerson['image'] = image;
                                                _this.identifiedPersons.push(identifiedPerson);
                                            });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0, len = result.length;
                        _a.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i, len)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.getImage = function (id) {
        for (var i = 0, len = this.registeredMembers.length; i < len; i++) {
            if (this.registeredMembers[i]._id == id) {
                return this.registeredMembers[i]['image'];
            }
        }
    };
    HomeComponent.prototype.capture = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.identifiedPersons = [];
                        return [4 /*yield*/, this.drawCanvas()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.drawFaces()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        ViewChild("video"),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "video", void 0);
    __decorate([
        ViewChild("canvas"),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "canvas", void 0);
    __decorate([
        ViewChild("img"),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "img", void 0);
    __decorate([
        ViewChild("name"),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "name", void 0);
    __decorate([
        ViewChild("distance"),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "distance", void 0);
    __decorate([
        ViewChild("identified"),
        __metadata("design:type", ElementRef)
    ], HomeComponent.prototype, "identified", void 0);
    HomeComponent = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.less']
        }),
        __metadata("design:paramtypes", [ApiConsumerService,
            FaceRecognitionService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map