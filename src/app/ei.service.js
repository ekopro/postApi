"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var date = /\//gi;
var displayDate = new Date().toLocaleDateString().replace(date, ".");
var body = {
    "modelName": "InternetDocument",
    "calledMethod": "getDocumentList",
    "methodProperties": {
        "DateTimeFrom": "21.06.2016",
        "DateTimeTo": displayDate,
        "Page": "1",
        "GetFullList": "0"
    },
    "apiKey": "a38fe9c65b1f7c3e14062a1628a89740"
};
var EIService = (function () {
    function EIService(http) {
        this.http = http;
        this.EIUrl = 'https://api.novaposhta.ua/v2.0/json/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    EIService.prototype.getEIs = function () {
        return this.http
            .post(this.EIUrl, body, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    }; // stub
    EIService.prototype.getEI = function (Ref) {
        return this.getEIs()
            .then(function (eis) { return eis.find(function (ei) { return ei.Ref === Ref; }); })
            .catch(this.handleError);
    };
    EIService.prototype.del = function (Ref) {
        var bodyDelete = {
            "apiKey": "a38fe9c65b1f7c3e14062a1628a89740",
            "modelName": "InternetDocument",
            "calledMethod": "delete",
            "methodProperties": {
                "DocumentRefs": ""
            }
        };
        bodyDelete["methodProperties"]["DocumentRefs"] = Ref;
        console.log(bodyDelete);
        return this.http.post(this.EIUrl, JSON.stringify(bodyDelete), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    EIService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return EIService;
}());
EIService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], EIService);
exports.EIService = EIService;
//# sourceMappingURL=ei.service.js.map