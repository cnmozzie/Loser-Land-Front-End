"use strict";
cc._RF.push(module, 'e1b90/rohdEk4SdmmEZANaD', 'Game');
// Script/Game.ts

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ethers_umd_min_js_1 = require("ethers/dist/ethers.umd.min.js");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.button = null;
        _this.text = 'hello';
        _this.grassPrefab = null;
        _this.chestPrefab = null;
        // Player 节点，用于获取主角的位置
        _this.player = null;
        // Camera 节点，用于获取摄像头的位置
        _this.camera = null;
        return _this;
    }
    Game.prototype.spawnNewGrass = function (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newGrass = cc.instantiate(this.grassPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newGrass);
        // 设置草地的位置
        newGrass.setPosition(cc.v2(x, y));
        // 在草地脚本组件上保存 Camera 对象的引用
        newGrass.getComponent('Grass').camera = this.camera;
    };
    Game.prototype.spawnNewChest = function (x, y) {
        // 使用给定的模板在场景中生成一个新节点
        var newChest = cc.instantiate(this.chestPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newChest);
        newChest.zIndex = 1;
        // 设置宝箱的位置
        newChest.setPosition(cc.v2(x, y));
    };
    Game.prototype.gainScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
                        _a = this;
                        return [4 /*yield*/, provider.getBlockNumber()];
                    case 1:
                        _a.text = _b.sent();
                        this.label.string = this.text;
                        cc.log(this.text);
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.onClick = function (e, msg) {
        cc.log(msg);
        cc.director.loadScene("user");
    };
    Game.prototype.update = function (dt) {
        if (Math.abs(this.player.x) < 9 * 64) {
            this.camera.x = this.player.x;
        }
        if (Math.abs(this.player.y) < 12 * 64) {
            this.camera.y = this.player.y;
        }
    };
    Game.prototype.onLoad = function () {
        this.label.node.zIndex = 1;
        this.button.node.zIndex = 1;
        // 生成草地
        var windowSize = cc.view.getVisibleSize();
        cc.log("width=" + windowSize.width + ",height=" + windowSize.height);
        for (var i = -7; i <= 7; i++) {
            for (var j = -5; j <= 5; j++) {
                this.spawnNewGrass(i * 64, j * 64);
            }
        }
        this.spawnNewChest(64, 64);
    };
    Game.prototype.start = function () {
        // init logic
        this.label.string = this.text;
        this.gainScore();
    };
    __decorate([
        property(cc.Label)
    ], Game.prototype, "label", void 0);
    __decorate([
        property(cc.Button)
    ], Game.prototype, "button", void 0);
    __decorate([
        property
    ], Game.prototype, "text", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "grassPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "chestPrefab", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "camera", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();