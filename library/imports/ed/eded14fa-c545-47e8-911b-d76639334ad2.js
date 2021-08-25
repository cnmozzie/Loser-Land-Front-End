"use strict";
cc._RF.push(module, 'eded1T6xUVH6JEb12Y5M0rS', 'Player');
// Script/Player.ts

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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Player.prototype.moveWest = function () {
        this.node.x = this.node.x > -15 * 64 ? this.node.x - 64 : this.node.x;
    };
    Player.prototype.moveEast = function () {
        this.node.x = this.node.x < 15 * 64 ? this.node.x + 64 : this.node.x;
    };
    Player.prototype.moveNorth = function () {
        this.node.y = this.node.y < 15 * 64 ? this.node.y + 64 : this.node.y;
    };
    Player.prototype.moveSouth = function () {
        this.node.y = this.node.y > -15 * 64 ? this.node.y - 64 : this.node.y;
    };
    Player.prototype.moveNorthWest = function () {
        this.moveNorth();
        this.moveWest();
    };
    Player.prototype.moveSouthEast = function () {
        this.moveSouth();
        this.moveEast();
    };
    Player.prototype.moveNorthEast = function () {
        this.moveNorth();
        this.moveEast();
    };
    Player.prototype.moveSouthWest = function () {
        this.moveSouth();
        this.moveWest();
    };
    Player.prototype.onLoad = function () {
    };
    Player.prototype.start = function () {
    };
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();