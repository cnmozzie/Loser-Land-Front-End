"use strict";
cc._RF.push(module, 'df309IFCu1DfJNDtZfjusA8', 'DieDialog');
// Script/DieDialog.ts

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
var DieDialog = /** @class */ (function (_super) {
    __extends(DieDialog, _super);
    function DieDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        return _this;
    }
    DieDialog.prototype.setText = function (name) {
        this.label.string = name + this.label.string;
    };
    DieDialog.prototype.close = function () {
        cc.log('cancle');
        cc.director.loadScene("game");
    };
    DieDialog.prototype.onLoad = function () {
    };
    DieDialog.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], DieDialog.prototype, "label", void 0);
    DieDialog = __decorate([
        ccclass
    ], DieDialog);
    return DieDialog;
}(cc.Component));
exports.default = DieDialog;

cc._RF.pop();