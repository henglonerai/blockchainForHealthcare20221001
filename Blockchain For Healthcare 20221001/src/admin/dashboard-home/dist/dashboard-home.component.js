"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DashboardHomeComponent = /** @class */ (function () {
    function DashboardHomeComponent(blockchainService) {
        this.blockchainService = blockchainService;
        this.Titles = ['In Patients', 'Active Doctors'];
        this.Images = ['procedures', 'user-md',];
        this.Count = 0;
        this.Background = ['orange', 'blue',];
    }
    DashboardHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountBalance = this.blockchainService.getBalance();
        console.log(this.accountBalance);
        var getBalance = setInterval(function () {
            _this.accountBalance = _this.blockchainService.getBalance();
            if (_this.accountBalance != null) {
                _this.accountBalance /= 1000000000000000000;
                console.log("Balance", _this.accountBalance);
                clearInterval(getBalance);
            }
        }, 1000);
    };
    DashboardHomeComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard-home',
            templateUrl: './dashboard-home.component.html',
            styleUrls: ['./dashboard-home.component.sass']
        })
    ], DashboardHomeComponent);
    return DashboardHomeComponent;
}());
exports.DashboardHomeComponent = DashboardHomeComponent;

//# sourceMappingURL=dashboard-home.component.js.map
