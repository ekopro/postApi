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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var listPayerType = {
    modelName: "Common",
    calledMethod: "getTypesOfPayers",
    methodProperties: {},
    apiKey: ""
};
var listPaymentMethod = {
    modelName: "Common",
    calledMethod: "getPaymentForms",
    methodProperties: {},
    apiKey: ""
};
var listCargoType = {
    modelName: "Common",
    calledMethod: "getCargoTypes",
    methodProperties: {},
    apiKey: ""
};
var listServiceType = {
    modelName: "Common",
    calledMethod: "getServiceTypes",
    methodProperties: {},
    apiKey: ""
};
var listCity = {
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: {
        CityName: "",
        Limit: "10"
    },
    apiKey: ""
};
var listSender = {
    modelName: "Counterparty",
    calledMethod: "getCounterparties",
    methodProperties: {
        CounterpartyProperty: "Sender",
        Page: "1"
    },
    apiKey: ""
};
var listRecipient = {
    modelName: "Counterparty",
    calledMethod: "getCounterparties",
    methodProperties: {
        CounterpartyProperty: "Recipient",
        Page: "1"
    },
    apiKey: ""
};
var listAddress = {
    modelName: "Address",
    calledMethod: "getStreet",
    methodProperties: {
        FindByString: "",
        CityRef: "",
        Limit: 10
    },
    apiKey: ""
};
var listContragent = {
    modelName: "Counterparty",
    calledMethod: "getCounterpartyContactPersons",
    methodProperties: {
        Ref: "",
        Page: "1"
    },
    apiKey: ""
};
var createAddressContragentBody = {
    modelName: "Address",
    calledMethod: "save",
    methodProperties: {
        CounterpartyRef: "",
        StreetRef: "",
        BuildingNumber: "",
        Flat: "",
        Note: ""
    },
    apiKey: ""
};
var bodyEN = {
    modelName: "InternetDocument",
    calledMethod: "save",
    methodProperties: {},
    apiKey: ""
};
var CatalogueService = (function () {
    function CatalogueService(http) {
        this.http = http;
        this.EIUrl = 'https://api.novaposhta.ua/v2.0/json/';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.apiKey = null;
    }
    CatalogueService.prototype.writeApiKey = function (key) {
        this.apiKey = key;
        console.log(this.apiKey);
    };
    CatalogueService.prototype.writeKeyApiToObj = function (Obj) {
        Obj['apiKey'] = this.apiKey;
    };
    CatalogueService.prototype.createPOST = function (URL, JSONObject, headerObject, observeOrPromise) {
        this.writeKeyApiToObj(JSONObject);
        if (observeOrPromise === 'observe') {
            return this.http
                .post(URL, JSON.stringify(JSONObject), { headers: headerObject })
                .map(function (response) { return response.json().data; });
        }
        else {
            return this.http
                .post(URL, JSON.stringify(JSONObject), { headers: headerObject })
                .toPromise()
                .then(function (response) { return response.json().data; });
        }
    };
    //Обсервері не работаю надо изменить то промис, на map и еще доп посмотреть
    // на сайте руководстве
    CatalogueService.prototype.getPayerType = function () {
        return this.createPOST(this.EIUrl, listPayerType, this.headers);
    }; // stub
    CatalogueService.prototype.getPaymentMethod = function () {
        return this.createPOST(this.EIUrl, listPaymentMethod, this.headers);
    }; //
    CatalogueService.prototype.getCargoType = function () {
        return this.createPOST(this.EIUrl, listCargoType, this.headers);
    };
    CatalogueService.prototype.getServiceType = function () {
        return this.createPOST(this.EIUrl, listServiceType, this.headers);
    };
    CatalogueService.prototype.getSender = function () {
        return this.createPOST(this.EIUrl, listSender, this.headers);
    };
    CatalogueService.prototype.getContragent = function (refSender) {
        console.log("Service", refSender);
        listContragent["methodProperties"]["Ref"] = refSender;
        return this.createPOST(this.EIUrl, listContragent, this.headers);
    }; //
    CatalogueService.prototype.getCitySenderService = function (city) {
        listCity["methodProperties"]["CityName"] = city;
        return this.createPOST(this.EIUrl, listCity, this.headers, 'observe')
            .map(function (data) { return data['0'].Addresses; });
    };
    CatalogueService.prototype.getCityRecipientService = function (city) {
        listCity["methodProperties"]["CityName"] = city;
        return this.createPOST(this.EIUrl, listCity, this.headers, 'observe')
            .map(function (data) { return data['0'].Addresses; });
    };
    CatalogueService.prototype.createAddress = function (address, city) {
        console.log('listAddressSEN', listAddress);
        listAddress["methodProperties"]["CityRef"] = city[2];
        listAddress["methodProperties"]["FindByString"] = address;
        return this.createPOST(this.EIUrl, listAddress, this.headers, 'observe');
    };
    CatalogueService.prototype.createAddressRecipient = function (address, city) {
        console.log('listAddressREC', listAddress);
        listAddress["methodProperties"]["CityRef"] = city[2];
        listAddress["methodProperties"]["FindByString"] = address;
        return this.createPOST(this.EIUrl, listAddress, this.headers, 'observe');
    };
    CatalogueService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server Error');
    };
    CatalogueService.prototype.getRecipient = function () {
        return this.createPOST(this.EIUrl, listRecipient, this.headers);
    };
    CatalogueService.prototype.createAddressContragentService = function (CounterpartyRef, StreetRef, BuildingNumber) {
        createAddressContragentBody["methodProperties"]["CounterpartyRef"] = CounterpartyRef;
        createAddressContragentBody["methodProperties"]["StreetRef"] = StreetRef;
        createAddressContragentBody["methodProperties"]["BuildingNumber"] = BuildingNumber;
        return this.createPOST(this.EIUrl, createAddressContragentBody, this.headers);
    };
    CatalogueService.prototype.createEN = function (body) {
        bodyEN["methodProperties"] = body;
        console.log("MODEL", bodyEN, "MODEL");
        return this.createPOST(this.EIUrl, bodyEN, this.headers);
    }; //
    return CatalogueService;
}()); // close CatalogueService
CatalogueService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CatalogueService);
exports.CatalogueService = CatalogueService;
//# sourceMappingURL=catalogue.service.js.map