"use strict";
cc._RF.push(module, '38d7ep3OZdAM4UIu37Yq8qj', 'PunkInfo');
// Script/PunkInfo.ts

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
var PunkInfo = /** @class */ (function (_super) {
    __extends(PunkInfo, _super);
    function PunkInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        _this.gold = 0;
        _this.userName = 'vistor';
        _this.label = null;
        return _this;
    }
    PunkInfo.prototype.lastPunk = function (e, msg) {
        cc.log('lastPunk');
    };
    PunkInfo.prototype.nextPunk = function (e, msg) {
        cc.log('nextPunk');
    };
    PunkInfo.prototype.setLabel = function () {
        var lang = cc.sys.localStorage.getItem('lang');
        if (lang === 'zh') {
            this.label.string = "ID: " + (this.id - 1) + " \n\u6635\u79F0: " + this.userName + " \n\u91D1\u5E01: " + this.gold;
        }
        else {
            this.label.string = "ID: " + (this.id - 1) + " \nName: " + this.userName + " \nGold: " + this.gold;
        }
    };
    PunkInfo.prototype.setId = function (id) {
        this.id = id;
        this.setLabel();
    };
    PunkInfo.prototype.setInfo = function (info) {
        if (info.name == "") {
            this.userName = info.address.slice(0, 6);
        }
        else {
            this.userName = info.name;
        }
        this.gold = info.gold;
        this.setLabel();
    };
    PunkInfo.prototype.cancle = function (e, msg) {
        cc.log('quit');
        this.node.destroy();
    };
    PunkInfo.prototype.onLoad = function () {
    };
    PunkInfo.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], PunkInfo.prototype, "label", void 0);
    PunkInfo = __decorate([
        ccclass
    ], PunkInfo);
    return PunkInfo;
}(cc.Component));
exports.default = PunkInfo;

cc._RF.pop();