"use strict";
cc._RF.push(module, '15f5ahOvRJHla2Dy/K66YUJ', 'Grass');
// Script/Grass.ts

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
var Grass = /** @class */ (function (_super) {
    __extends(Grass, _super);
    function Grass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grass.prototype.update = function (dt) {
        if (this.camera.x - this.node.x > 10 * 64) {
            this.node.x = this.node.x + 19 * 64;
        }
        else if (this.camera.x - this.node.x < -10 * 64) {
            this.node.x = this.node.x - 19 * 64;
        }
        else if (this.camera.y - this.node.y > 7 * 64) {
            this.node.y = this.node.y + 13 * 64;
        }
        else if (this.camera.y - this.node.y < -7 * 64) {
            this.node.y = this.node.y - 13 * 64;
        }
    };
    Grass.prototype.onLoad = function () {
        this.node.zIndex = 1;
    };
    Grass.prototype.start = function () {
    };
    Grass = __decorate([
        ccclass
    ], Grass);
    return Grass;
}(cc.Component));
exports.default = Grass;

cc._RF.pop();