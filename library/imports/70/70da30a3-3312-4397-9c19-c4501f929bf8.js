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
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.address = '';
        _this.privateKey = '';
        _this.rogueLandAddress = '0xE9f1e59d52d66a0fF973B85f8f4744350c15E924';
        _this.label = null;
        _this.editbox = null;
        _this.rogueLandJson = null;
        _this.punk = null;
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
            this.setUserInfo();
        }
        catch (err) {
            cc.log(err);
        }
    };
    User.prototype.setUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, rogueLandContract, punkId, punkInfo, remoteUrl, sprite_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.sys.localStorage.removeItem('myPunk');
                        provider = new ethers_umd_min_js_1.ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s2.binance.org:8545/");
                        rogueLandContract = new ethers_umd_min_js_1.ethers.Contract(this.rogueLandAddress, this.rogueLandJson.json.abi, provider);
                        return [4 /*yield*/, rogueLandContract.getAuthorizedId(this.address)];
                    case 1:
                        punkId = _a.sent();
                        if (!(punkId > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, rogueLandContract.getPlayerInfo(this.address)];
                    case 2:
                        punkInfo = _a.sent();
                        this.label.string = "Welcome, " + punkInfo.name;
                        remoteUrl = "https://www.losernft.org" + punkInfo.uri.slice(15);
                        cc.sys.localStorage.setItem('myPunk', JSON.stringify({ id: punkInfo.id.toString(), name: punkInfo.name, uri: remoteUrl }));
                        sprite_1 = this.node.getChildByName('punk_image').getComponent(cc.Sprite);
                        cc.assetManager.loadRemote(remoteUrl, { ext: '.png', cacheEnabled: true }, function (err, pic) {
                            if (err) {
                                cc.log('LoadNetImg load error,error:' + err);
                                return;
                            }
                            sprite_1.spriteFrame = new cc.SpriteFrame(pic);
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        cc.log("you are a visitor");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
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
        this.setUserInfo();
    };
    User.prototype.start = function () {
    };
    __decorate([
        property(cc.Label)
    ], User.prototype, "label", void 0);
    __decorate([
        property(cc.EditBox)
    ], User.prototype, "editbox", void 0);
    __decorate([
        property(cc.JsonAsset)
    ], User.prototype, "rogueLandJson", void 0);
    __decorate([
        property(cc.Node)
    ], User.prototype, "punk", void 0);
    User = __decorate([
        ccclass
    ], User);
    return User;
}(cc.Component));
exports.default = User;

cc._RF.pop();