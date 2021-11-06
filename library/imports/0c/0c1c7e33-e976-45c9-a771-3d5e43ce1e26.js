"use strict";
cc._RF.push(module, '0c1c74z6XZFyadxPV5Dzh4m', 'Rewards');
// Script/Rewards.ts

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
var Rewards = /** @class */ (function (_super) {
    __extends(Rewards, _super);
    function Rewards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentSeason = 1;
        _this.rewardLabel = null;
        _this.claimButton = null;
        _this.rewardButton = null;
        return _this;
    }
    Rewards.prototype.claimAP = function (e, msg) {
        cc.sys.localStorage.setItem('gift-package', 1);
        this.welcome.okt += 100;
        this.welcome.setBalanceLabel();
        this.claimButton.interactable = false;
        var xhr = new XMLHttpRequest();
        var url = "https://losernft.org/register?address=" + this.welcome.address;
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                console.log(response);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    };
    Rewards.prototype.claimLowb = function (e, msg) {
        this.welcome.claimRewards();
        this.rewardButton.interactable = false;
    };
    Rewards.prototype.setLabel = function (lowb, umg) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.rewardLabel.string = lowb + " lowb \n" + umg + " UMG";
        }
        else {
            this.rewardLabel.string = lowb + " lowb \n" + umg + " UMG";
        }
        if (lowb > 0) {
            this.rewardButton.interactable = true;
        }
    };
    Rewards.prototype.cancle = function (e, msg) {
        //cc.log('skip');
        this.node.destroy();
    };
    Rewards.prototype.onLoad = function () {
        this.rewardButton.interactable = false;
        var gift = cc.sys.localStorage.getItem('gift-package');
        if (gift == this.currentSeason) {
            this.claimButton.interactable = false;
        }
    };
    Rewards.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], Rewards.prototype, "rewardLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Rewards.prototype, "claimButton", void 0);
    __decorate([
        property(cc.Button)
    ], Rewards.prototype, "rewardButton", void 0);
    Rewards = __decorate([
        ccclass
    ], Rewards);
    return Rewards;
}(cc.Component));
exports.default = Rewards;

cc._RF.pop();