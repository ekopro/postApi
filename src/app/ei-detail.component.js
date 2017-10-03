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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var ei_1 = require("./ei");
var ei_service_1 = require("./ei.service");
require("rxjs/add/operator/switchMap");
var EIDetailComponent = (function () {
    function EIDetailComponent(eiService, route, location) {
        this.eiService = eiService;
        this.route = route;
        this.location = location;
    }
    EIDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.eiService.getEI(params.get('Ref')); })
            .subscribe(function (ei) { return _this.ei = ei; });
    };
    EIDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    EIDetailComponent.prototype.del = function () {
        var _this = this;
        this.eiService.del(this.ei.Ref)
            .then(function () { return _this.goBack(); });
    };
    return EIDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", ei_1.EI)
], EIDetailComponent.prototype, "ei", void 0);
EIDetailComponent = __decorate([
    core_1.Component({
        selector: 'ei-detail',
        templateUrl: './ei-detail.component.html',
    }),
    __metadata("design:paramtypes", [ei_service_1.EIService,
        router_1.ActivatedRoute,
        common_1.Location])
], EIDetailComponent);
exports.EIDetailComponent = EIDetailComponent;
//# sourceMappingURL=ei-detail.component.js.map