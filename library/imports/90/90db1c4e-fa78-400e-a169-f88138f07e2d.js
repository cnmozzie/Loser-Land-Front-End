"use strict";
cc._RF.push(module, '90db1xO+nhADqFp+IE48H4t', 'GoldDialog');
// Script/GoldDialog.ts

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
var GoldDialog = /** @class */ (function (_super) {
    __extends(GoldDialog, _super);
    function GoldDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.kind = 0;
        _this.label = null;
        _this.kindLabel = null;
        _this.buildButton = null;
        _this.buyButton = null;
        return _this;
    }
    GoldDialog.prototype.kindName = function (n) {
        var lang = cc.sys.localStorage.getItem('lang');
        if (n == 0) {
            this.buildButton.interactable = false;
            return lang === 'zh' ? '空地' : 'Open Space';
        }
        else if (n == 1) {
            this.buildButton.interactable = true;
            return lang === 'zh' ? '房屋' : 'House';
        }
        else {
            this.buildButton.interactable = true;
            return lang === 'zh' ? n - 1 + "\u7EA7\u77FF\u573A" : "Level " + (n - 1) + " Mine";
        }
    };
    GoldDialog.prototype.setLabel = function (info) {
        var lang = cc.sys.localStorage.getItem('lang');
        var kind = info.land.builtTime > info.block ? info.land.oldBuilding : info.land.newBuilding;
        var time = Math.ceil((info.land.builtTime - info.block) / 500);
        var text;
        var x = info.pos.x;
        var y = info.pos.y;
        if (lang === 'zh') {
            text = "\u5750\u6807\uFF1A(" + x + ", " + y + ")\n\u5730\u4E3B\uFF1A" + info.land.owner.slice(0, 6);
            if (time > 0) {
                text += "\n\u6B63\u5728\u5EFA\u9020\uFF1A" + this.kindName(info.land.newBuilding) + "\uFF08\u8FD8\u9700" + time + "\u56DE\u5408\uFF09";
            }
        }
        else {
            text = "Coordinate\uFF1A(" + x + ", " + y + ")\nOwner\uFF1A" + info.land.owner.slice(0, 6);
            if (time > 0) {
                text += "\nBuilding\uFF1A" + this.kindName(info.land.newBuilding) + " (in " + time + " rounds)";
            }
        }
        this.label.string = text;
        this.kind = kind;
        this.kindLabel.string = this.kindName(this.kind);
        if (info.land.owner == '0x0000000000000000000000000000000000000000') {
            cc.log('no owner');
            if ((Math.pow(x, 2) > 100 || Math.pow(y, 2) > 100) && Math.pow(x, 2) < 625 && Math.pow(y, 2) < 625) {
                this.buyButton.interactable = true;
            }
        }
        else if (info.player.toLowerCase() == info.land.owner.toLowerCase()) {
            this.buildButton.node.zIndex = 2;
        }
    };
    GoldDialog.prototype.close = function () {
        cc.log('cancle');
        this.node.destroy();
    };
    GoldDialog.prototype.buy = function () {
        cc.log('buy');
        this.buyButton.interactable = false;
        this.game.buyLand();
    };
    GoldDialog.prototype.build = function () {
        cc.log('build');
        this.buildButton.interactable = false;
        this.game.build(this.kind % 9 - 1);
    };
    GoldDialog.prototype.inc_n = function () {
        if (this.buildButton.node.zIndex == 2) {
            this.kind++;
            this.kindLabel.string = this.kindName(this.kind % 9);
        }
    };
    GoldDialog.prototype.dec_n = function () {
        if (this.buildButton.node.zIndex == 2) {
            this.kind += 8;
            this.kindLabel.string = this.kindName(this.kind % 9);
        }
    };
    GoldDialog.prototype.onLoad = function () {
        this.buyButton.interactable = false;
    };
    GoldDialog.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], GoldDialog.prototype, "label", void 0);
    __decorate([
        property(cc.Label)
    ], GoldDialog.prototype, "kindLabel", void 0);
    __decorate([
        property(cc.Button)
    ], GoldDialog.prototype, "buildButton", void 0);
    __decorate([
        property(cc.Button)
    ], GoldDialog.prototype, "buyButton", void 0);
    GoldDialog = __decorate([
        ccclass
    ], GoldDialog);
    return GoldDialog;
}(cc.Component));
exports.default = GoldDialog;

cc._RF.pop();