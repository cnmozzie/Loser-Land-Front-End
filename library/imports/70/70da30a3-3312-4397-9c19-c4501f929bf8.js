"use strict";
cc._RF.push(module, '70da3CjMxJDl5wZxFAfkpv4', 'User');
// Script/User.ts

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
var ethers_umd_min_js_1 = require("ethers/dist/ethers.umd.min.js");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.address = '';
        _this.privateKey = '';
        _this.editbox = null;
        return _this;
    }
    User.prototype.startGame = function (e, msg) {
        cc.log(msg);
        cc.director.loadScene("game");
    };
    User.prototype.setWallet = function (wallet) {
        var walletData = { address: wallet.address, privateKey: wallet.privateKey };
        cc.sys.localStorage.setItem('wallet', JSON.stringify(walletData));
        this.address = walletData.address;
        this.privateKey = walletData.privateKey;
    };
    User.prototype.showAddress = function () {
        this.editbox.string = this.address;
    };
    User.prototype.showPrivateKey = function () {
        this.editbox.string = this.privateKey;
    };
    User.prototype.importPrivateKey = function () {
        try {
            var wallet = new ethers_umd_min_js_1.ethers.Wallet(this.editbox.string);
            this.setWallet(wallet);
        }
        catch (err) {
            cc.log(err);
        }
    };
    User.prototype.onLoad = function () {
        var walletData = JSON.parse(cc.sys.localStorage.getItem('wallet'));
        if (!walletData) {
            var wallet = new ethers_umd_min_js_1.ethers.Wallet.createRandom();
            this.setWallet(wallet);
        }
        else {
            this.address = walletData.address;
            this.privateKey = walletData.privateKey;
        }
        this.showAddress();
    };
    User.prototype.start = function () {
    };
    __decorate([
        property(cc.EditBox)
    ], User.prototype, "editbox", void 0);
    User = __decorate([
        ccclass
    ], User);
    return User;
}(cc.Component));
exports.default = User;

cc._RF.pop();