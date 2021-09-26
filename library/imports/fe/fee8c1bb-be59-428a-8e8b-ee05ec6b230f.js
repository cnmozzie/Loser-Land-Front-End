"use strict";
cc._RF.push(module, 'fee8cG7vllCio6L7gXsayMP', 'Withdraw');
// Script/Withdraw.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Withdraw = /** @class */ (function (_super) {
    __extends(Withdraw, _super);
    function Withdraw() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lowb = 0;
        _this.UMG = 0;
        _this.walletLabel = null;
        _this.lowbLabel = null;
        _this.UMGLabel = null;
        _this.lowbButton = null;
        _this.UMGButton = null;
        return _this;
    }
    Withdraw.prototype.withdraw = function (e, msg) {
        if (msg == 'UMG') {
            this.UMGButton.interactable = false;
            this.welcome.withdraw(1, 0);
        }
        else if (msg == 'lowb') {
            this.lowbButton.interactable = false;
            this.welcome.withdraw(0, 0);
        }
    };
    Withdraw.prototype.skip = function (e, msg) {
        cc.log('skip');
        this.node.destroy();
    };
    Withdraw.prototype.setLabel = function (address, lowb, UMG) {
        this.walletLabel.string = address;
        if (UMG <= 300) {
            UMG = 300;
        }
        else {
            this.UMGButton.interactable = true;
        }
        if (lowb > 0) {
            this.lowbButton.interactable = true;
        }
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.lowbLabel.string = "\u53EF\u63D0\u73B0\u6570\u91CF\uFF1A" + lowb;
            this.UMGLabel.string = "\u53EF\u63D0\u73B0\u6570\u91CF\uFF1A" + (UMG - 300);
        }
        else {
            this.lowbLabel.string = "Available: " + lowb;
            this.UMGLabel.string = "Available: " + (UMG - 300);
        }
    };
    Withdraw.prototype.onLoad = function () {
        this.lowbButton.interactable = false;
        this.UMGButton.interactable = false;
    };
    Withdraw.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], Withdraw.prototype, "walletLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Withdraw.prototype, "lowbLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Withdraw.prototype, "UMGLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Withdraw.prototype, "lowbButton", void 0);
    __decorate([
        property(cc.Button)
    ], Withdraw.prototype, "UMGButton", void 0);
    Withdraw = __decorate([
        ccclass
    ], Withdraw);
    return Withdraw;
}(cc.Component));
exports.default = Withdraw;

cc._RF.pop();