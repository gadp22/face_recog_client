import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var ApiConsumerService = /** @class */ (function () {
    function ApiConsumerService(http) {
        this.http = http;
        //url :string = 'http://10.10.20.117:3000'
        this.url = '';
    }
    ApiConsumerService.prototype.recognize = function (faceDescriptor) {
        var body = {};
        body['faceDescriptor'] = faceDescriptor;
        return this.http.post(this.url + '/recognition', body);
    };
    ApiConsumerService.prototype.getMembers = function () {
        return this.http.get(this.url + '/members', { headers: new HttpHeaders({}) });
    };
    ApiConsumerService.prototype.getMemberById = function (id) {
        return this.http.get(this.url + '/members/' + id, { headers: new HttpHeaders({}) });
    };
    ApiConsumerService.prototype.registerMember = function (member) {
        var body = {};
        body['member'] = member;
        console.log(body);
        //return this.http.post('/members', body)
    };
    ApiConsumerService.prototype.rightAnswer = function () {
        return this.http.get(this.url + '/answeryes', { headers: new HttpHeaders({}) });
    };
    ApiConsumerService.prototype.wrongAnswer = function () {
        return this.http.get(this.url + '/answerno', { headers: new HttpHeaders({}) });
    };
    ApiConsumerService.prototype.getRightAnswer = function () {
        return this.http.get(this.url + '/answeryescount', { headers: new HttpHeaders({}) });
    };
    ApiConsumerService.prototype.getWrongAnswer = function () {
        return this.http.get(this.url + '/answernocount', { headers: new HttpHeaders({}) });
    };
    ApiConsumerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiConsumerService);
    return ApiConsumerService;
}());
export { ApiConsumerService };
//# sourceMappingURL=api.consumer.service.js.map