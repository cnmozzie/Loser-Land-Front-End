"use strict";
cc._RF.push(module, 'a554aeFeppKWKHJU1s2Ju/R', 'Register');
// Script/Register.ts

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
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nameEditbox = null;
        return _this;
    }
    Register.prototype.register = function (e, msg) {
        this.welcome.setUserName(this.nameEditbox.string);
        this.node.destroy();
    };
    Register.prototype.skip = function (e, msg) {
        cc.log('skip');
        this.node.destroy();
    };
    Register.prototype.setInfo = function (name) {
        this.nameEditbox.string = name;
    };
    Register.prototype.set_zh = function () {
        cc.sys.localStorage.setItem('lang', 'zh');
        cc.director.loadScene("welcome");
    };
    Register.prototype.set_en = function () {
        cc.sys.localStorage.setItem('lang', 'en');
        cc.director.loadScene("welcome");
    };
    Register.prototype.onLoad = function () {
    };
    Register.prototype.start = function () {
    };
    __decorate([
        property(cc.EditBox)
    ], Register.prototype, "nameEditbox", void 0);
    Register = __decorate([
        ccclass
    ], Register);
    return Register;
}(cc.Component));
exports.default = Register;

cc._RF.pop();