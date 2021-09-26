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
        _this.label = null;
        return _this;
    }
    GoldDialog.prototype.setLabel = function (info) {
        var lang = cc.sys.localStorage.getItem('lang');
        var text;
        if (lang === 'zh') {
            text = "\u4E00\u4E2A\u88C5\u6709" + info.amount + "\u91D1\u5E01\u5B9D\u7BB1\uFF0C\n";
            if (info.time <= 0) {
                text = text + (info.punkNumber + "\u53EA\u670B\u514B\u6B63\u5728\u6253\u5F00\u5B83");
            }
            else if (info.punkNumber > 0) {
                text = text + (info.time + "\u56DE\u5408\u540E" + info.punkNumber + "\u53EA\u670B\u514B\u4F1A\u6253\u5F00\u5B83");
            }
            else {
                text = text + "\u76EE\u524D\u6CA1\u6709\u670B\u514B\u60F3\u53BB\u6253\u5F00\u5B83";
            }
        }
        else {
            text = "A chest with " + info.amount + " gold, \n";
            if (info.time <= 0 && info.punkNumber > 0) {
                text = text + (info.punkNumber + " punks are looting it now...");
            }
            else if (info.punkNumber > 0) {
                text = text + (info.punkNumber + " punk will loot it " + info.time + " rounds later");
            }
            else {
                text = text + "no punk want to loot it for now";
            }
        }
        this.label.string = text;
    };
    GoldDialog.prototype.close = function () {
        cc.log('cancle');
        this.node.destroy();
    };
    GoldDialog.prototype.onLoad = function () {
    };
    GoldDialog.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], GoldDialog.prototype, "label", void 0);
    GoldDialog = __decorate([
        ccclass
    ], GoldDialog);
    return GoldDialog;
}(cc.Component));
exports.default = GoldDialog;

cc._RF.pop();