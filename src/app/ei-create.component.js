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
var Observable_1 = require("rxjs/Observable");
var Subject_1 = require("rxjs/Subject");
var common_1 = require("@angular/common");
var catalogue_service_1 = require("./catalogue.service");
require("rxjs/add/operator/map");
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
var EICreateFormComponent = (function () {
    function EICreateFormComponent(catalogueService, location) {
        this.catalogueService = catalogueService;
        this.location = location;
        this.searchCitySenderTerms = new Subject_1.Subject();
        this.searchAddressTerms = new Subject_1.Subject();
        this.searchCityRecipientTerms = new Subject_1.Subject();
        this.searchAddressRecipientTerms = new Subject_1.Subject();
        this.api = {};
        this.model = {
            PayerType: "",
            PaymentMethod: "",
            DateTime: "",
            CargoType: "",
            VolumeGeneral: "",
            Weight: "",
            ServiceType: "",
            SeatsAmount: "",
            Description: "",
            Cost: "",
            CitySender: "",
            Sender: "",
            SenderAddress: "",
            ContactSender: "",
            SendersPhone: "",
            CityRecipient: "",
            Recipient: "",
            RecipientAddress: "",
            ContactRecipient: "",
            RecipientsPhone: "",
        };
        this.payers = this.getPayerType();
        this.payments = this.getPaymentMethod();
        this.cargos = this.getCargoType();
        this.services = this.getServiceType();
        this.senders = this.getSender();
        this.recipients = this.getRecipient();
        this.submitted = false;
    }
    EICreateFormComponent.prototype.search = function (term) {
        this.searchCitySenderTerms.next(term);
    };
    EICreateFormComponent.prototype.searchCityRecipient = function (term) {
        this.searchCityRecipientTerms.next(term);
    };
    EICreateFormComponent.prototype.searchAddress = function (term) {
        this.searchAddressTerms.next(term);
    };
    EICreateFormComponent.prototype.searchAddressRecipient = function (term) {
        this.searchAddressRecipientTerms.next(term);
    };
    EICreateFormComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    EICreateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cities = this.searchCitySenderTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.catalogueService.getCitySenderService(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            return Observable_1.Observable.of([]);
        });
        this.addresses = this.searchAddressTerms.
            debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.catalogueService.createAddress(term, _this.citySender)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            return Observable_1.Observable.of([]);
        });
        this.citiesRecipient = this.searchCityRecipientTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.catalogueService.getCityRecipientService(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            return Observable_1.Observable.of([]);
        });
        this.addressesRecipient = this.searchAddressRecipientTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time the term changes
            ? _this.catalogueService.createAddressRecipient(term, _this.cityRecipient)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: add real error handling
            return Observable_1.Observable.of([]);
        });
    };
    EICreateFormComponent.prototype.writeApiKey = function (key) {
        event.preventDefault();
        this.catalogueService.writeApiKey(key);
    };
    EICreateFormComponent.prototype.getPayerType = function () {
        return this.catalogueService.getPayerType()
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.getPaymentMethod = function () {
        return this.catalogueService.getPaymentMethod()
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.getCargoType = function () {
        return this.catalogueService.getCargoType()
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.getServiceType = function () {
        return this.catalogueService.getServiceType()
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.getSender = function () {
        return this.catalogueService.getSender()
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.getContragent = function (value) {
        console.log(value.substring(3));
        return this.catalogueService.getContragent(value.substring(3))
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.writeCity = function (city, SenderOrRecipient) {
        console.log(city);
        if (SenderOrRecipient === "sender") {
            return this.model.CitySender = city[2], this.citySender = city;
        }
        else if (SenderOrRecipient === "recipient") {
            return this.model.CityRecipient = city[2], this.cityRecipient = city;
        }
    };
    EICreateFormComponent.prototype.writeAddressSender = function (address, SenderOrRecipient) {
        console.log(address);
        if (SenderOrRecipient === "sender") {
            return this.model.SenderAddress = address[1], this.address = address;
        }
        else if (SenderOrRecipient === "recipient") {
            return this.model.RecipientAddress = address[1], this.recipientAddress = address;
        }
    };
    EICreateFormComponent.prototype.getRecipient = function () {
        return this.catalogueService.getRecipient()
            .then(function (data) {
            return data;
        });
    };
    EICreateFormComponent.prototype.onChangeRecipient = function (value) {
        console.log(value);
        console.log(value.Description);
        console.log(value.Phones);
        this.model.RecipientsPhone = value.Phones;
        this.model.ContactRecipient = value.Description;
    };
    EICreateFormComponent.prototype.onChangeSender = function (value) {
        console.log(value);
        console.log(value.Description);
        console.log(value.Phones);
        this.model.SendersPhone = value.Phones;
        this.model.ContactSender = value.Description;
    };
    EICreateFormComponent.prototype.goBack = function () {
        this.location.back();
    };
    EICreateFormComponent.prototype.isEmptyObject = function (emptyObject) {
        return JSON.stringify(emptyObject) === '{}';
    };
    EICreateFormComponent.prototype.createJSON = function (model) {
        var _this = this;
        if (model.RecipientAddress || model.StreetNumRecipient || model.StreetNumRecipient) {
            var createJSON1 = [
                this.catalogueService.createAddressContragentService(model.Recipient, model.RecipientAddress, model.StreetNumRecipient),
                this.catalogueService.createAddressContragentService(model.Sender, model.SenderAddress, model.StreetNum)
            ];
            Promise.all(createJSON1)
                .then(function (data) {
                console.log('DATA = PROMISE<ADDRESS>', data);
                var Recipient = data[0];
                var Sender = data[1];
                console.log('DATA2[]', Sender, Recipient, 'DATA2[]');
                _this.newEN.SenderAddress = Sender[0].Ref;
                _this.newEN.RecipientAddress = Recipient[0].Ref;
                console.log('this.newEN.SenderAddress', _this.newEN.SenderAddress);
                console.log('this.newEN.RecipientAddress', _this.newEN.RecipientAddress);
            }).then(function (data) {
                _this.catalogueService.createEN(model);
                console.log(model);
            });
        }
        else {
            console.log("свойства не заполнены");
        }
    };
    EICreateFormComponent.prototype.onSubmit = function () {
        event.preventDefault();
        this.submitted = true;
        this.newEN = this.model;
        this.createJSON(this.newEN);
        // this.goBack();
    };
    return EICreateFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], EICreateFormComponent.prototype, "myApi", void 0);
EICreateFormComponent = __decorate([
    core_1.Component({
        selector: 'ei-create',
        templateUrl: './refactor_create-form.html',
        styleUrls: ['./ei-create-search.component.css']
    }),
    __metadata("design:paramtypes", [catalogue_service_1.CatalogueService,
        common_1.Location])
], EICreateFormComponent);
exports.EICreateFormComponent = EICreateFormComponent;
//# sourceMappingURL=ei-create.component.js.map