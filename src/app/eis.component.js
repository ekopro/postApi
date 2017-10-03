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
var ei_service_1 = require("./ei.service");
var EISComponent = (function () {
    function EISComponent(router, eiService) {
        this.router = router;
        this.eiService = eiService;
        this.title = 'Post API';
    }
    EISComponent.prototype.getEIs = function () {
        var _this = this;
        this.eiService.getEIs().then(function (eis) { return _this.eis = eis; });
    };
    EISComponent.prototype.ngOnInit = function () {
        this.getEIs();
    };
    EISComponent.prototype.onSelect = function (ei) {
        this.selectedEI = ei;
    };
    EISComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedEI.Ref]);
    };
    return EISComponent;
}());
EISComponent = __decorate([
    core_1.Component({
        selector: 'my-eis',
        template: "\n    <ol class=\"eis\">\n      <li *ngFor=\"let ei of eis\"\n      [class.selected]=\"ei === selectedEI\"\n      (click)=\"onSelect(ei)\">\n      <span>\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u042D\u041D: </span><p>{{ei.Ref}}</p>\n      <p></p>\n      </li>\n    </ol>\n    <div *ngIf=\"selectedEI\">\n    <button (click)=\"gotoDetail()\">\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u0438 \u0415\u041D</button>\n    <button>\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0415\u041D</button>\n    </div>\n  ",
        styles: ["\n    li { border: 2px solid black}\n    li:hover { background: grey; color: white}\n    "]
    }),
    __metadata("design:paramtypes", [router_1.Router,
        ei_service_1.EIService])
], EISComponent);
exports.EISComponent = EISComponent;
//# sourceMappingURL=eis.component.js.map